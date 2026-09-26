# Architecture Overview

## Design Philosophy

**OMP-first**: Leverage OMP's native capabilities (extensions, tools, agents, hub) rather than reinventing orchestration.

**Multi-mode research**: Depth-scalable pipeline from quick 3-phase scoping to ultradeep 8+ phase adversarial review.

**Tight source validation**: Triangulation, credibility scoring, and contradiction detection built-in.

**Session-aware**: Cache results across sessions, integrate with OMP memory and version control.

## Component Model

```
┌─────────────────────────────────────────┐
│  User Command: /research in deep: <topic>  │
└──────────────┬──────────────────────────┘
               │
        ┌──────▼───────┐
        │ ExtensionAPI │ (pi)
        └──────┬───────┘
               │
      ┌────────┴──────────┐
      │                   │
   ┌──▼──┐          ┌──────▼────┐
   │Tool │ (2)      │Command (1)│  
   └─────┘          └──────┬────┘
      │                    │
      │           ┌────────▼──────────┐
      │           │Phase Orchestrator │
      │           └────────┬──────────┘
      │                    │
      ├─────┬──────┬───────┼────┬─────────┐
      │     │      │       │    │         │
   ┌──▼─┐ ┌─▼──┐ ┌─▼─┐  ┌──▼──┐ ┌──▼───┐ ┌─▼────┐
   │web_│ │read│ │agent()  │hub │ │memory │ │cache │
   │search       │(spawn)  │msg │ │sys   │ │FS   │
   └────┘ └─────┘ └────┘  └─────┘ └──────┘ └──────┘
      │
    ┌─▼──────────────────┐
    │ OMP Built-in Tools │
    └───────────────────┘
```

## Phase Execution Model

Each phase is **semi-deterministic** and runs on a **complexity-routed model tier**:

| # | Phase | Runner | Model tier |
|---|-------|--------|------------|
| 1 | **Scope** (orchestrator, <1 min) | session model | `@default` |
| 2 | **Plan** (orchestrator, <1 min) | session model | `@default` |
| 3 | **Retrieve** (research-scout, 5–12 parallel) | delegated | `@smol` (fast/cheap) |
| 4 | **Triangulate** (tool) | orchestrator | `@default` |
| 5 | **Outline** (orchestrator, <1 min) | session model | `@default` |
| 6 | **Synthesize** (research-synthesizer, 2–5 min) | delegated | `@slow` |
| 7 | **Critique** (research-critic, deep/ultradeep only) | delegated | `@slow`, thinking high |
| 8 | **Refine** (research-synthesizer, 1–2 min) | delegated | `@slow` |

Each delegated agent is an agent definition (`agents/*.md`) whose frontmatter pins the model via a
role alias; the concrete model is configured once in `modelRoles` (`~/.omp/agent/config.yml`):

1. **Scope** — define question boundaries; output structured scope document
2. **Plan** — search categories, keywords, concrete `searxng_search` queries
3. **Retrieve** — fan-out to `research-scout` agents (parallel); `searxng_search` (fallback `web_search`) + parse + credibility score; returns sources with excerpts
4. **Triangulate** — cross-validate major claims vs. sources; loop-back to Retrieve if gaps found
5. **Outline** — structure findings by claim hierarchy
6. **Synthesize** — comprehensive findings (600–2k words) + executive summary (200–400 words); verifies load-bearing URLs with `read`
7. **Critique** — `research-critic` red-teams the draft; severity-ranked findings + suggested gap-closing queries; loop-back on critical gaps
8. **Refine** — address critique findings, polish language, verify citations

Quick mode skips delegation for Synthesize (short narrative stays on the orchestrator) and omits Critique/Refine.

Cost note: Retrieve is >70% of all model calls in a run; pinning it to `@smol` is the primary cost lever.

## Tool Ecosystem

### OMP Built-in Tools (Used)

| Tool | Phase(s) | Purpose |
|------|----------|---------|
| `searxng_search` | Retrieve | Local SearXNG JSON API (primary retrieval, localhost:8888) |
| `web_search` | Retrieve (fallback) | Multi-provider aggregation when SearXNG unreachable |
| `read` | Retrieve, Synthesize | Full-text extraction from load-bearing URLs |
| `agent()` | Retrieve, Critique | Spawn research-scout / -synthesizer / -critic agents |
| `hub` | Orchestration | Multi-agent coordination messages |
| `eval` | Synthesis | JSON/data processing (optional) |

### Extension-Provided Tools

| Tool | Purpose | Parameters |
|------|---------|------------|
| `assess_source_credibility` | Trustworthiness scoring | url, title, content_snippet |
| `triangulate_findings` | Claim validation | claim, sources[] |

## State Management

### Per-Research Session

```typescript
interface ResearchSession {
  topic: string;
  mode: "quick" | "standard" | "deep" | "ultradeep";
  startedAt: ISO8601;
  currentPhase: string;
  sources: SourceMetadata[];
  findings: string;
  executive_summary: string;
  status: "in_progress" | "completed" | "failed";
  metadata: {
    credibilityStats: { high: n, medium: n, low: n };
    phaseTimings: Record<phase, ms>;
  };
}
```

### Disk Cache

```
.omp/research-cache-YYYY-MM-DD.json
{
  "timestamp": ISO8601,
  "cache": [
    {
      "topic": "string",
      "mode": "standard",
      "findings": "string",
      "sources": [...]
    }
  ]
}
```

### OMP Session Integration

- Cache file → committable to git
- Session memory (if available) → cross-session reuse
- Hub messaging → coordination with other agents

## Error Handling

### Phase-Level Retry

```
Try Phase N
  ├─ Success → proceed to N+1
  ├─ Soft failure (low quality) → retry with refined params
  ├─ Hard failure (timeout) → log + skip to next phase (if acceptable)
  └─ Critical failure → abort, return partial findings
```

### Source Quality Handling

```
Search returns 2 sources (threshold: 3)
  → Triangulation flags gap
  → Loop-back to Retrieve
  → Retry with refined query
  → If still <3 → proceed with warning
```

### Contradiction Resolution

```
Source A: "Go is faster"
Source B: "Rust is faster"
  → Manual review required (Critique phase)
  → Flag in executive summary
  → Cite both with credibility scores
```

## Performance Characteristics

### Timing by Mode

| Mode | Phases | Parallelism | Duration |
|------|--------|-------------|----------|
| quick | 3 | 2 parallel | 2–5 min |
| standard | 6 | 3–4 parallel | 5–10 min |
| deep | 8 | 4–6 parallel | 10–20 min |
| ultradeep | 8+ | 6–12 parallel | 20–45 min |

### Token Efficiency

- **Per-search**: ~500 tokens (prompt + web results parsing)
- **Per-phase orchestration**: ~1k tokens (planning + synthesis)
- **Full standard research**: ~8–10k tokens
- **UltraDeep with critique loop**: ~15–25k tokens (but thorough)

## Integration Points

### 1. Session Lifecycle

```typescript
pi.on("session_start", ...)  // Load cached findings
pi.on("session_stop", ...)   // Save cache to .omp/
pi.on("turn_end", ...)       // Optional: track research time
```

### 2. Hub Messaging (Multi-Agent Coordination)

For research spanning multiple documents or teams:

```typescript
hub.send({
  to: "ResearchTeamCoordinator",
  message: `Completed research on ${topic}, sources: ${count}`
});
```

### 3. Memory System (If Available)

```typescript
// Store findings in OMP memory for cross-project reuse
ctx.memory?.store("research", {
  topic,
  summary: executive_summary,
  key_claims: [...],
  sources: [...],
});
```

### 4. Version Control

Cache files are git-committable for:
- Review history of research evolution
- CI/CD integration (re-running old research)
- Team collaboration

## Extension Points

### Custom Search Strategies

Override `SEARCH_CATEGORIES` per domain:

```typescript
const FINTECH_SEARCHES = [
  "regulatory filings {topic}",
  "{topic} technical stack",
  "customer reviews {topic}",
];
```

### Domain-Specific Personas

Add to `CRITIQUE_PERSONAS`:

```typescript
healthcare: "MD/epidemiologist perspective",
legal: "Attorney reviewing risks",
```

### Custom Credibility Rules

Extend `assess_source_credibility` tool with domain-specific URL patterns.

### Fact-Checking Integration (Future)

Hook into external APIs:
- Google Fact Check Explorer
- ClaimBuster
- Full Fact
- FactCheck.org

---

**Design Date**: August 2025  
**OMP Compatibility**: 1.0+  
**Last Updated**: August 2025

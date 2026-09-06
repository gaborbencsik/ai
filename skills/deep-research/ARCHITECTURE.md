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

Each phase is **semi-deterministic**:

1. **Scope** (1 agent, <1 min)
   - Define question boundaries
   - Output: structured scope document

2. **Plan** (1 agent, <1 min)
   - Create search categories & keywords
   - Output: search strategy matrix

3. **Retrieve** (5–12 parallel tasks, 2–5 min)
   - Fan-out: `agent()` spawn for each search category
   - Each agent: `web_search` + parse + credibility score
   - Output: sources with excerpts + credibility

4. **Triangulate** (Tool: triangulate_findings)
   - Cross-validate major claims vs. sources
   - Loop-back to Retrieve if gaps found

5. **Outline** (1 agent, <1 min)
   - Structure findings by claim hierarchy
   - Output: narrative outline

6. **Synthesize** (1 agent, 2–5 min)
   - Write comprehensive findings (600–2k words)
   - Executive summary (200–400 words)

7. **Critique** (3 personas, Deep/UltraDeep only, 3–10 min)
   - Spawn 3 agents with different personas
   - Identify gaps, weak sources, assumptions
   - Loop-back if ≥2 critiques find gaps

8. **Refine** (1 agent, 1–2 min)
   - Address critique findings
   - Polish language, verify citations

## Tool Ecosystem

### OMP Built-in Tools (Used)

| Tool | Phase(s) | Purpose |
|------|----------|---------|
| `web_search` | Retrieve | Multi-provider search aggregation |
| `read` | Retrieve | Full-text extraction from URLs |
| `agent()` | All parallel | Spawn domain-specific research agents |
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

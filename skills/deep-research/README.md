# Deep Research Extension for OMP (oh-my-pi)

Enterprise-grade research engine adapted from Claude deep research for the OMP harness ecosystem. Provides multi-phase orchestrated research with rigorous source validation, concurrent search parallelization, and citation-backed reports.

## Features

✅ **Multi-mode research**: Quick (3 phases), Standard (6), Deep (8), UltraDeep (8+)  
✅ **Concurrent orchestration**: 5–12 parallel searches + multi-agent spawn  
✅ **Source triangulation**: 3+ source validation per claim  
✅ **Credibility scoring**: Automatic domain-based trust assessment  
✅ **Session persistence**: Cache results across sessions  
✅ **Critique loops**: Multi-persona red-teaming (Deep/UltraDeep)  
✅ **Executive summaries**: 200–400 word distilled findings  

## Installation

### For OMP User Extensions

```bash
# Clone into user extensions directory
git clone <repo> ~/.omp/agent/extensions/deep-research

# or symlink if developing
ln -s /path/to/deep-research ~/.omp/agent/extensions/
```

### For Project-Local Extensions

```bash
# Place in project's .omp/extensions/
git clone <repo> .omp/extensions/deep-research
```

### As Plugin Package (npm)

```bash
# Create package.json with omp manifest
{
  "name": "@myorg/omp-deep-research",
  "main": "index.ts",
  "omp": {
    "extensions": ["./index.ts"],
    "skills": ["./SKILL.md"]
  }
}

npm install @myorg/omp-deep-research
# Extension auto-discovers via plugin loader
```

## Usage

### Interactive Command

```
/research in standard: <topic>
/research in deep: <topic>
/research ultradeep: <topic>
/research <topic>  # defaults to standard mode
```

Examples:

```
/research in quick: latest AI safety research
/research in deep: PostgreSQL vs. Supabase for SaaS backend
/research ultradeep: supply chain resilience lessons from COVID-19
```

### Mode Selection

| Mode | When to Use |
|------|-------------|
| `quick` | Rapid exploration, need answer in <5 min |
| `standard` | Most questions (default), balanced rigor |
| `deep` | Complex decisions, critical infrastructure |
| `ultradeep` | Competitive analysis, regulatory compliance |

## Pipeline & Phases

```
┌─ Scope (boundaries, assumptions)
├─ Plan (search strategy, expert sources)
├─ Retrieve (5–12 parallel searches + agents)
├─ Triangulate (3+ sources per claim)
├─ Outline Refinement (structure findings)
├─ Synthesize (narrative + executive summary)
├─ Critique (multi-persona red team, loop-back if needed)  [Deep/UltraDeep]
└─ Refine (close gaps, polish)
```

## Quality Gates

- **10+ sources minimum**, 3+ per major claim
- **Executive Summary**: 200–400 words, factual only
- **Findings**: 600–2,000 words, ≥80% prose (not bullets)
- **Full Bibliography**: domain, credibility, URL
- **Automated Validation**:
  - Source credibility assessment (high/medium/low)
  - Claim triangulation across 3+ sources
  - Hallucination detection (future: DOI/fact-checker integration)

## Tools Provided

### `/research <command>`

Entry point for orchestrated research.

**Parameters**:
- `mode`: `quick` | `standard` | `deep` | `ultradeep` (default: `standard`)
- `topic`: research question (required)

**Output**: Markdown report injected into conversation + session cache

### `assess_source_credibility` (Tool)

Score a source's trustworthiness.

**Input**:
- `url` (required): source URL
- `title`: source title
- `content_snippet`: excerpt from source

**Output**: credibility level (high/medium/low) + domain analysis

**Heuristics**:
- **.edu/.gov domains**: high
- **Scholar/arXiv/DOI/peer-review venues**: high
- **News outlets (NPR, Reuters, BBC)**: high
- **Reddit/Medium/Quora**: medium
- **Affiliate/blog spam**: low

### `triangulate_findings` (Tool)

Cross-validate a claim across multiple sources.

**Input**:
- `claim`: statement to verify
- `sources`: array of `{title, excerpt, url}`

**Output**: support ratio + agreement assessment

## Configuration

### Settings (`.omp/config.yml` or `~/.omp/agent/config.yml`)

```yaml
# Enable/disable deep research
extensions:
  - deep-research  # auto-discovered from ~/.omp/agent/extensions/deep-research

# (optional) Disable specific sources
disabledExtensions:
  # - extension-module:deep-research
```

### Environment Variables

- `DEEP_RESEARCH_CACHE_DIR`: override cache location (default: `.omp/`)
- `DEEP_RESEARCH_MAX_SOURCES`: max sources per search (default: 12)
- `DEEP_RESEARCH_TIMEOUT_SECONDS`: abort timeout (default: 300)

## Architecture

```
deep-research-extension/
├── index.ts                 # Extension factory + command/tool registration
├── SKILL.md                 # Skill guidance (discoverable by model)
├── README.md                # This file
└── package.json             # (optional) npm plugin metadata
```

## Workflow: Standard Mode Example

```
User: /research in standard: Rust vs Go for backend systems

Extension dispatch
  ↓
Phase 1: Scope
  • Define: performance, ecosystem, learning curve, production readiness
  • In: backend systems, cloud services
  • Out: embedded systems, real-time constraints
  ↓
Phase 2: Plan
  • Search categories: performance benchmarks, ecosystem maturity, 
    production deployments, expert perspectives
  • Domain experts: systems engineers, HN discussions, GitHub projects
  ↓
Phase 3: Retrieve (parallel agent spawn)
  Search 1: "Rust vs Go performance benchmark 2025"
  Search 2: "Go ecosystem production deployments"
  Search 3: "Rust async runtime comparison tokio vs actix"
  Search 4: "Cloud-native Go (Docker, Kubernetes)"
  Search 5: "Rust web frameworks axum actix production"
  Search 6: "Go vs Rust learning curve hiring market"
  [Agent spawns for: async patterns, deployment, ecosystem analysis]
  ↓
Phase 4: Triangulate
  Claim: "Go faster startup than Rust"
  → 3+ sources confirm? medium credibility
  ↓
Phase 5: Outline
  • Performance: Go ~100ms startup vs Rust varies (debug/release)
  • Ecosystem: Go batteries-included, Rust fragmented
  • etc.
  ↓
Phase 6: Synthesize
  Executive Summary: [200–400 words]
  Findings: [~1,000 words prose]
  
Report injected to conversation
```

## Integration with OMP Tools

### web_search
Automatically used in Retrieve phase for concurrent searches.

### agent() / task subagents
Domain-specific research agents spawned for:
- Performance analysis
- Ecosystem/community research
- Implementation deep-dives

### Hub messaging
Multi-agent coordination for large research spans.

### Session cache
Results persisted to `.omp/research-cache-YYYY-MM-DD.json` for resumption.

## Output Format

### Markdown Report

```markdown
# Research Report: <Topic>

## Executive Summary
[200–400 words, factual distilled findings]

## Findings
[600–2,000 words narrative, organized by major claim]

### Finding 1: [Claim]
[Evidence from 3+ sources]

### Finding 2: [Claim]
[Evidence]

## Sources (N)
- [Title](URL) (domain.com, credibility)
- [Title](URL) (domain.com, credibility)
```

### Session Cache (`.omp/research-cache-YYYY-MM-DD.json`)

```json
{
  "timestamp": "2025-08-25T14:32:00Z",
  "cache": [
    {
      "topic": "Rust vs Go for backend",
      "mode": "standard",
      "findings": "...",
      "executive_summary": "...",
      "sources": [...]
    }
  ]
}
```

## Debugging

### View logs
```bash
tail -f ~/.omp/logs/omp.$(date +%F).*.log
```

### Disable temporarily
```yaml
# ~/.omp/agent/config.yml
disabledExtensions:
  - extension-module:deep-research
```

### Manual cache inspection
```bash
cat .omp/research-cache-$(date +%F).json | jq .cache[0].findings
```

## Limitations & Future Work

- **Hallucination detection**: Currently rely on triangulation; future: DOI/fact-checker APIs
- **Multi-language**: English-optimized (extensible to other languages)
- **PDF/paywalled content**: Limited to public web
- **Real-time data**: 24h freshness window by design (uses latest web_search)
- **Long reports**: Auto-continuation via recursive agent (for ultradeep 20K+ words)

## Comparison: OMP Extension vs Claude Deep Research Skill

| Feature | Claude Skill | OMP Extension |
|---------|--------------|---------------|
| Entry point | Prose instruction | `/research` command |
| Tools | web_search, read | web_search, read + `assess_source_credibility`, `triangulate_findings` |
| Multi-agent | Manual (user describes) | Automatic via `agent()` spawn |
| Session persistence | File-based markdown | Cache + OMP session integration |
| UX | Model-guided prose | Command + opt-in reporting |
| Failure recovery | Manual | Built-in loop-back + retry |

## Contributing

Improvements welcome:
- Additional credibility heuristics
- New search strategies
- Domain-specific personas
- Integration with fact-checking APIs

## License

MIT — modify as needed.

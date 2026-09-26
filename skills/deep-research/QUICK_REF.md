# Quick Reference Card

## Installation (One-Liner)

```bash
git clone https://github.com/your-org/omp-deep-research.git ~/.omp/agent/extensions/deep-research
```

## Usage

```
/research in standard: <topic>           # Standard mode (default)
/research in quick: <topic>              # Fast exploration (2-5 min)
/research in deep: <topic>               # Thorough analysis (10-20 min)
/research in ultradeep: <topic>          # Maximum rigor (20-45 min)
/research <topic>                        # Defaults to standard
```

## Modes at a Glance

| Mode | Phases | Duration | Use Case |
|------|--------|----------|----------|
| quick | 3 | 2–5 min | Initial exploration |
| **standard** | **6** | **5–10 min** | **Most questions** |
| deep | 8 | 10–20 min | Complex topics, critical decisions |
| ultradeep | 8+ | 20–45 min | Comprehensive reports, adversarial review |

## Pipeline (All Modes)

```
Scope ─→ Plan ─→ Retrieve ─→ Triangulate ─→ 
Outline ─→ Synthesize ─→ Critique* ─→ Refine*
         (*Deep/UltraDeep only)
```

## What You Get

✅ **10+ sources**, credibility scored (high/medium/low)  
✅ **Executive summary** (200–400 words)  
✅ **Findings** (600–2000 words, 80%+ prose)  
✅ **Bibliography** with URLs and credibility  
✅ **Session cache** (`.omp/research-cache-YYYY-MM-DD.json`)  

## Output Example

```markdown
# Research Report: Quantum Computing 2025

## Executive Summary
[200-400 word distilled summary]

## Findings
[Narrative findings organized by major claim]

## Sources (12)
- [Title](url) (domain.com, high credibility)
- [Title](url) (domain.com, medium credibility)
```

## Tools Provided

| Tool | Purpose |
|------|---------|
| `/research` | Main command entry point |
| `assess_source_credibility` | Score trustworthiness (url, title, snippet) |
| `triangulate_findings` | Validate claims across 3+ sources |

## Configuration (Optional)

```yaml
# ~/.omp/agent/config.yml
extensions:
  - ~/.omp/agent/extensions/deep-research  # or auto-discovered

deepResearch:
  cachePath: ~/.research-cache
  enableCritique: true
  minSourcesPerClaim: 3
```

Or environment:

```bash
export DEEP_RESEARCH_TIMEOUT_SECONDS=600
export DEEP_RESEARCH_CACHE_DIR="~/.research-cache"
```

## Troubleshooting (Common Issues)

| Issue | Solution |
|-------|----------|
| SearXNG unreachable | Start the SearXNG container (`tools/docker-compose.yml`); the skill falls back to `web_search` |
| searxng_search returns HTTP 403 | Add `formats: [html, json]` to the SearXNG settings.yml `search:` section |
| Agent "research-scout" missing | Ensure agents are symlinked into `~/.omp/agent/agents/` and restart OMP |
| Research hangs after 10+ min | Increase timeout: `export DEEP_RESEARCH_TIMEOUT_SECONDS=600` |
| No cache file created | Check `.omp/` directory permissions |
| Extension won't load | Check logs: `tail -f ~/.omp/logs/omp.$(date +%F).*.log` |

## File Structure

```
~/.omp/agent/extensions/deep-research/
├── index.ts         ← Extension code (tools + commands + events)
├── SKILL.md         ← Skill documentation (auto-discovered)
├── package.json     ← Manifest
└── tsconfig.json    ← TypeScript config

.omp/research-cache-2025-08-25.json     ← Session cache (auto-created)
```

## Docs Map

| File | Read When |
|------|-----------|
| **README.md** | First, for quickstart |
| **INSTALL.md** | For setup help or troubleshooting |
| **ARCHITECTURE.md** | To understand how it works |
| **ADVANCED.md** | To customize for your domain |
| **OVERVIEW.md** | For big-picture context |

## Key Metrics

| Metric | Value |
|--------|-------|
| **Sources per standard research** | 10+ |
| **Avg tokens (standard)** | ~8–10k |
| **Execution time (standard)** | 5–10 min |
| **Cached sessions** | Unlimited (git-committable) |
| **Parallelism** | 3–12 agents depending on mode |

## Integration Points

- **`searxng_search`** – Primary retrieval via local SearXNG (localhost:8888)
- **`web_search`** – Fallback when SearXNG is unreachable
- **`agent()`** – Spawn research agents
- **`hub`** – Multi-agent messaging
- **`read`** – Fetch URLs for deep analysis
- **Session cache** – `.omp/research-cache-*.json` (committable to git)

## Customization Starters

```typescript
// Add custom personas
const FINTECH_PERSONAS = [
  "Regulatory Officer: SEC implications",
  "Risk Manager: stress-test assumptions",
];

// Add custom search strategy
const FINTECH_SEARCHES = [
  "regulatory filings {topic}",
  "{topic} compliance 2025",
];

// Integrate with git
pi.exec("git", ["add", cacheFile, "-m", `research: ${topic}`]);
```

See **ADVANCED.md** for 10+ patterns.

## Performance Tips

1. **Start with quick** (2–5 min) to scope, then deep if needed
2. **Reuse cached results** – check `.omp/research-cache-*.json` first
3. **Batch research** – cluster related topics in one session
4. **Use memory system** – store key findings for cross-project reuse

## What's Next?

1. Install: `git clone ... ~/.omp/agent/extensions/deep-research`
2. Restart OMP
3. Test: `/research in quick: test`
4. Read: INSTALL.md or README.md
5. Customize: See ADVANCED.md patterns

---

**Version**: 1.0 | **OMP**: 1.0+ | **License**: MIT  
**Last Updated**: August 2025

Questions? See INSTALL.md → Troubleshooting section.

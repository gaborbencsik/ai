---
name: deep-research
description: "Enterprise deep research with multi-phase orchestration, complexity-routed models per phase, and citation-backed reports. Use for /research, research <topic>, deep dive into, investigate — one-off research questions answered as a report. NOT for wiki/vault filing (that is autoresearch)."
---

# Deep Research Skill

Multi-phase research engine with **complexity-routed models**: high-volume mechanical phases (web retrieval, source scoring) run on cheap fast models, quality-carrying phases (synthesis, critique) run on strong reasoning models.

## Quick Start

```
/research in quick: current state of quantum computing
/research in standard: compare PostgreSQL vs Supabase for production
/research in deep: supply chain resilience post-COVID
```

## Model Routing (the core mechanic)

Each phase is either run by the **orchestrator** (session model) or delegated to a dedicated agent whose frontmatter pins the model tier:

| Agent | Model role | Used for | Why |
|-------|-----------|----------|-----|
| orchestrator (`self`) | `@default` | Scope, Plan, Triangulate, Outline | Low volume, needs pipeline overview |
| `research-scout` | `@smol` (fast/cheap) | Retrieve — the highest-volume phase (5-12+ parallel searches) | Mechanical search + excerpting; a strong model here is wasted money |
| `research-synthesizer` | `@slow` (strong) | Synthesize, Refine | Narrative quality lives or dies here |
| `research-critic` | `@slow`, thinking high | Critique (deep/ultradeep) | Adversarial analysis needs real reasoning |

Cost rule of thumb: >70% of calls in a research run are Retrieve. Keeping that on `@smol` is the single biggest cost lever; never weaken Synthesize to save money.

The roles resolve through `modelRoles` in `~/.omp/agent/config.yml` (e.g. `smol: ollama-cloud/glm-5.3-flash`, `slow: cheaperinference/gpt-5.6-sol`). Changing the model behind a role never requires editing this skill.

## Modes & Phases

The mode IS the depth control — it decides which phases run and how deep retrieval goes:

| Mode | Phases | Retrieve | Sources target | Synthesize tier |
|------|--------|----------|----------------|-----------------|
| **quick** | 3 | 3-6 searches | 3+ credible | `self` (default tier) |
| **standard** | 6 | 5-8 parallel | 10+, 3+ per claim | `research-synthesizer` |
| **deep** | 8 | 8-12 parallel | 15+, verified URLs | `research-synthesizer` |
| **ultradeep** | 8+ | 12+ parallel | 20+, peer-reviewed pref. | `research-synthesizer` |

quick mode: synthesize stays on the orchestrator — a short narrative does not justify a `@slow` spawn.

## Pipeline

```
Scope (self) → Plan (self) → Retrieve (research-scout, parallel) → Triangulate (self) →
Outline (self) → Synthesize (research-synthesizer) → [Critique (research-critic) → Refine (research-synthesizer)] → Package
```

### Phase Breakdown

#### 1. Scope (orchestrator)
Define research boundaries, assumptions, key questions. Clarify what's in/out of scope.

#### 2. Plan (orchestrator)
Create search strategy and sub-question decomposition. Decompose into concrete `searxng_search` queries (site:, -term, "exact phrase" filters).

#### 3. Retrieve (research-scout)
Delegate query bundles to `research-scout` agents running in parallel. Each returns title/URL/excerpt/credibility. First-finish adaptive quality: quick stops at 3 credible sources.

#### 4. Triangulate (orchestrator)
Cross-validate findings using the `triangulate_findings` tool. Require 3+ sources per major claim (4+ in ultradeep). Loop back to Retrieve with refined queries on gaps.

#### 5. Outline (orchestrator)
Structure findings: major claims → supporting evidence → gaps.

#### 6. Synthesize (research-synthesizer)
Write comprehensive narrative findings (600-2,000+ words, 80%+ prose) + executive summary (200-400 words). The synthesizer verifies the 3-6 most load-bearing URLs with `read` before restating claims.

#### 7. Critique (research-critic, deep/ultradeep only)
Adversarial red-team: attacks single-source claims, low-credibility domains, missing counter-evidence. Spot-checks load-bearing claims with `searxng_search`. Returns verdict + severity-ranked findings + suggested gap-closing queries. Critical findings loop back to Retrieve.

#### 8. Refine (research-synthesizer, deep/ultradeep only)
Address critique findings, close gaps, polish prose.

## Tools

### Skill-provided tools (registered by the extension)
- `searxng_search` — **primary retrieval**, local SearXNG at `http://localhost:8888` (aggregates engines, JSON API). Override the base URL per call if the instance lives elsewhere. Requires `formats: [html, json]` in the SearXNG settings.yml.
- `assess_source_credibility` — trustworthiness score by domain/content
- `triangulate_findings` — cross-validation of claims across sources

### Built-in fallback
- `web_search` — only when SearXNG is unreachable
- `read` — full-page verification for load-bearing URLs

## Quality Standards

- **10+ sources minimum** (standard and above), 3+ per major claim
- **Executive summary**: 200-400 words, self-contained
- **Findings**: 600-2,000+ words, 80%+ prose (not bullet lists)
- **Full bibliography**: URLs, no placeholders, `title (domain)` format
- Every non-trivial claim attributed inline; contradictions preserved, not silently resolved

## Citation Format

```
- [OpenAI: GPT-5 Architecture](https://openai.com/research/gpt-5) (openai.com, high credibility)
- [Nature: Quantum Computing Review](https://doi.org/10.1038/s41586-025-xyz) (DOI verified)
- [GitHub: awesome-quantum](https://github.com/user/awesome-quantum) (community consensus)
```

## Output Artifacts

- Markdown report (primary source of truth)
- Session cache (`.omp/research-cache-YYYY-MM-DD.json`)
- Structured sources (for continuation agents)

## Failure Recovery

- **SearXNG unreachable**: the `searxng_search` tool returns an unreachable error → fall back to `web_search` and note it in the report.
- **Missing agent**: if `research-scout`/`research-synthesizer`/`research-critic` are not in the agent list, run the phase on the default task agent and note the fallback.
- **Low source quality**: retry with refined queries (scout's `gaps` output).
- **Contradictory findings**: keep both positions with credibility scores; critic phase decides.
- **Incomplete coverage**: loop back to Retrieve.

## Model Routing FAQ

**How do I change which models are used?** Edit `modelRoles` in `~/.omp/agent/config.yml` — `smol` = retrieval tier, `slow` = synthesis/critique tier. No skill changes needed.

**How do I override a single agent?** `task.agentModelOverrides` in settings, e.g. `{"research-scout": "provider/model-id"}`.

**Where are the agents defined?** `agents/*.md` next to this file (installed via symlink into `~/.omp/agent/agents/`). Each pins its model in frontmatter; edit there to change one phase.

---

## Language

<critical>
The default output language is **English**. You MUST write the report, executive
summary, findings, and all agent outputs in English even when the question or
conversation is in another language. Write in another language ONLY if the user
explicitly requests it in the invocation (e.g. `/research in standard, magyarul:
<topic>`). A question asked in Hungarian is NOT such a request. Quote sources
verbatim in their original language; your prose around them stays English.
</critical>

---

**Version**: 2.1 | **Compatibility**: OMP (oh-my-pi) | **Requires**: `@smol`/`@slow` model roles configured, SearXNG running

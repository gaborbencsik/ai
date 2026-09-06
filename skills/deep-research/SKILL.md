---
name: deep-research
description: Enterprise deep research with multi-phase orchestration, source validation, and citation-backed reports
---

# Deep Research Skill

Multi-phase research engine for complex topics with configurable depth, concurrent search parallelization, and rigorous source validation.

## Quick Start

```
/research in standard: current state of quantum computing
/research in deep: compare PostgreSQL vs Supabase for production
/research ultradeep: supply chain resilience post-COVID
```

## Modes & Phases

| Mode | Phases | Duration | Best For |
|------|--------|----------|----------|
| **quick** | 3 | 2–5 min | Initial exploration, rapid scoping |
| **standard** | 6 | 5–10 min | Most research questions, balanced depth |
| **deep** | 8 | 10–20 min | Complex topics, critical decisions, validations |
| **ultradeep** | 8+ | 20–45 min | Comprehensive reports, maximum rigor, adversarial review |

## Pipeline

```
Scope → Plan → Retrieve (parallel 5–12 searches + agents) → Triangulate → 
Outline Refinement → Synthesize → Critique (multi-persona + loop-back) → Refine → Package
```

### Phase Breakdown

#### 1. Scope
Define research boundaries, assumptions, key questions. Clarify what's in/out of scope.

#### 2. Plan
Create search strategy and sub-question decomposition. Identify domain experts and academic sources.

#### 3. Retrieve
Parallel web searches using `web_search` tool + focused sub-agents for domain expertise. First-finish adaptive quality.

#### 4. Triangulate
Cross-validate findings using `triangulate_findings` tool. Require 3+ sources per major claim.

#### 5. Outline Refinement
Structure findings with major claims, supporting evidence, and gaps. Prepare prose outline.

#### 6. Synthesize
Write comprehensive narrative findings (600–2,000 words, 80%+ prose). Executive summary 200–400 words.

#### 7. Critique (Deep/UltraDeep only)
Multi-persona red-teaming:
- **Skeptical Practitioner**: challenges assumptions, spotlights weak sources
- **Adversarial Reviewer**: looks for counter-evidence, breaks arguments
- **Implementation Engineer**: focuses on real-world risks and applicability

Loop-back to Phase 3 for delta-queries if critical gaps found.

#### 8. Refine
Address critique findings. Close gaps. Polish prose.

## Quality Standards

- **10+ sources minimum**, 3+ per major claim
- **Executive summary**: 200–400 words
- **Findings**: 600–2,000 words, 80%+ prose (not bullet lists)
- **Full bibliography**: URLs, no placeholders, `title (domain)` format
- **Automated validation**:
  - Source credibility scoring (high/medium/low)
  - DOI/URL verification
  - Hallucination detection
  - Citation loop validation

## Tools & Integration

### Built-in Tools
- `web_search` — Multi-provider aggregation (Brave, Serper, Exa, Jina)
- `agent()` — Spawn focused research sub-agents for domain expertise
- `read` — Fetch full content from URLs for deep analysis

### Skill-Provided Tools
- `assess_source_credibility` — Score trustworthiness by domain, content, and context
- `triangulate_findings` — Cross-validate claims across 3+ sources

## Search Strategy (Standard/Deep/UltraDeep)

**Search Categories**:
1. General topic overview (2–3 searches)
2. Recent trends/news (1–2 searches)
3. Academic/research (1–2 searches)
4. Criticism/alternatives (1–2 searches)
5. Implementation/case studies (1–2 searches)
6. Expert perspectives (1–2 searches)

**Adaptive Quality**:
- **Quick**: Stop at first 3 credible sources
- **Standard**: Continue until 10+ sources, 3+ per claim
- **Deep**: Target 15+ sources, validation on 3+ per claim
- **UltraDeep**: 20+ sources, 4+ per major claim, peer-reviewed when available

## Citation Format

```
- [OpenAI: GPT-5 Architecture](https://openai.com/research/gpt-5) (openai.com, high credibility)
- [Nature: Quantum Computing Review](https://doi.org/10.1038/s41586-025-xyz) (DOI verified)
- [GitHub: awesome-quantum](https://github.com/user/awesome-quantum) (community consensus)
```

## Output Artifacts

Reports are saved with:
- Markdown (primary source of truth)
- Session cache (`.omp/research-cache-YYYY-MM-DD.json`)
- Structured sources (for continuation agents)

## Failure Recovery

- **Low source quality**: auto-retry with refined queries
- **Contradictory findings**: trigger manual triangulation review
- **Incomplete coverage**: loop back to Retrieve phase
- **Exceeded token budget**: auto-continue via recursive agent with context preservation

## Advanced: Continuation & Context Preservation

Research results are cached in `.omp/` and retrievable in follow-up sessions. Use:

```
/research continue: <topic>
```

to resume from the critique phase with accumulated findings.

## Integration with OMP

This extension works best with:
- **Task agents** for domain-specific sub-research
- **Web search** for current information
- **Memory tools** for accumulating research across sessions
- **Hub messaging** for multi-agent coordination on large reports

---

**Version**: 1.0 | **Compatibility**: OMP (oh-my-pi)  
**Author**: Deep Research Initiative | **License**: MIT

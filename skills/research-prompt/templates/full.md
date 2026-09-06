```
/research in <DEPTH>:

# <TITLE>

## 🎯 Research Goal
<2–4 lines: what the research investigates and against what alternative.>

> ⚠️ Scope discipline — <landscape / implementation / mixed>.
> <For landscape:> Deliver paradigms, trade-offs, and industry evidence.
> Do NOT produce implementation plans, engineering designs, code, schemas,
> API contracts, effort estimates, sprint plans, timelines, or vendor
> "pick X" verdicts. Roadmaps, if any, stay directional
> (explore → pilot → scale) — no timelines, no staffing, no tasks.
> Audience: decision-makers evaluating a paradigm.

## 📌 Context (project baseline)
Source files consulted: `<FILE_1>`, `<FILE_2>`, `<FILE_3>`.

- **Problem today:** <verbatim-grounded statement>.
- **Goal:** <verbatim-grounded statement>.
- **Current recommendation:** <baseline architecture summary>.
- **Constraints / limits to honor:** <numbers, verbatim>.
- **Guiding principles:** <3–6 short phrases from source docs>.

The task of this research: <one paragraph linking baseline to paradigm shift under study>.

## 🔬 Primary Research Question
> <One sentence. Answerable at the paradigm level. Timeframe 2025–2026.>

## 🧭 Sub-Questions (MUST cover all)

### A. Architectural paradigms
1. Definitional boundaries: <spectrum of paradigm variants>.
2. Reference architectures: <NAMED VENDORS with their specific products>.
3. Orchestration frameworks: <NAMED FRAMEWORKS>. Which fits which use case
   conceptually — not integrated.
4. Protocol layer: <NAMED PROTOCOLS>.

### B. Domain data / content / state model
5. <Question about structured vs. emergent representation>.
6. <Question about composition unit>.
7. <Question about consistency / brand / identity>.
8. Determinism vs. generative output: <compliance/legal cases requiring
   reproducibility; conceptual mechanisms>.

### C. External surface / interfaces / adaptation
9. Per-surface transformation: <SURFACE-SPECIFIC CONSTRAINTS>.
10. Measurable quality difference vs. rule-based baseline.
11. Localization / i18n.
12. Preview / editor UX under non-deterministic output.

### D. Workflow & adoption
13. Human-in-the-loop patterns: approval gate / suggestion / autonomous.
14. Multi-role decomposition evidence.
15. Versioning & audit trail.
16. End-user UX adoption (chat-first / inline / command / takeover).

### E. Guardrails, evaluation, economics
17. Hallucination / safety risks and measurement methodology.
18. Privacy / compliance risks (<REGIMES>), prompt injection.
19. Evaluation frameworks: <NAMED EVAL TOOLS>. What each measures conceptually.
20. Cost & latency vs. baseline (order-of-magnitude, per-unit $ and p95 ms).

### F. Integration
21. <Adjacent platform 1 integration>.
22. <Adjacent platform 2 integration>.
23. Feedback loops (long-term learning vs. per-run optimization).

### G. Industry evidence
24. Named 2024–2026 successful deployments with concrete metrics.
25. Failures, rollbacks, and known limits.
26. Build-vs-buy-vs-hybrid trade-off landscape for 2026 — describe, do not prescribe.

## 🚫 Explicit out-of-scope
- Concrete implementation plans, schemas, API contracts, code, sprint plans,
  effort estimates, staffing.
- Vendor selection verdicts ("pick X"). Vendors described and compared only.
- Marketing-collateral claims without third-party validation.
- <ADDITIONAL DOMAIN-SPECIFIC EXCLUSIONS>.

## 📚 Source Expectations
- **Minimum <FLOOR> sources**, **<3-4>+ independent sources per major claim**.
- Required source types: vendor **engineering** blogs (not marketing), conference
  talks (<NAMED CONFERENCES>), arXiv 2024–2026, official framework/protocol docs,
  analyst reports read critically (Gartner/Forrester/IDC — flag vendor bias),
  engineering-focused post-mortems and community discussions.
- **Credibility scoring is mandatory.** **Triangulation is mandatory** for every
  major claim.

## 🧑‍⚖️ Critique Personas
1. **Skeptical Practitioner** — <domain persona who just launched baseline stack>.
2. **Adversarial <DOMAIN> Reviewer** — compliance / legal / risk lens.
3. **Implementation Engineer** — stress-tests paradigm claims (latency, cost,
   on-call pain), does NOT demand build plans.
4. **CFO Lens** — order-of-magnitude total cost vs. status quo.
5. **<DOMAIN END-USER>** — will they adopt it, or route around it?

## 📄 Deliverable Format
Analytical, strategic, evidence-driven register. No implementation prescriptions.

### 1. Executive Summary (300–400 words)
Key message in three sentences, top-5 findings, directional stance
(<PARADIGM_A> / <PARADIGM_B> / <PARADIGM_C>) with decision criteria and named
uncertainties. Not a build recommendation.

### 2. Findings (1500–2000 words, 80%+ prose)
- §1 Definitional frame and paradigm map
- §2 Reference architectures compared (table + prose) — describe, don't prescribe
- §3 Domain data/content/state model
- §4 Per-surface adaptation (each surface treated separately)
- §5 Workflow & adoption evidence
- §6 Guardrails, evaluation, TCO (order-of-magnitude)
- §7 Successes and failures — equal weight

### 3. Decision Matrix
| Dimension | <BASELINE> | <AUGMENTED> | <NEW PARADIGM> |
|----|----|----|----|
| Determinism, cost, latency, consistency, adoption, compliance,
  time-to-market, lock-in… |

Fill with qualitative, evidence-anchored assessments — not scores masquerading
as certainty.

### 4. Directional Guidance
Relative to the baseline in `<CONTEXT_FILE>`, describe at a paradigm level
where <NEW PARADIGM> components could add value, conditions favoring each
option, and open questions to resolve BEFORE any implementation planning
begins. Broad directional phases only (explore → limited pilot → scale) if
useful. No tasks, effort, timelines.

### 5. Open Questions and Further Research Directions

### 6. Full Bibliography
`[Title](URL) (domain, credibility: high/med/low)` format, DOI-verified where
applicable.

## 🔁 Loop-back Triggers
If Critique reveals any of the following is missing, delta-retrieve:
- Order-of-magnitude cost & p95 latency numbers for <NEW PARADIGM> in this domain.
- ≥2 named-vendor **post-mortems** or scaled-back rollouts.
- Concrete <PROTOCOL> integration example (described, not designed).
- Measurable quality gain from <NEW PARADIGM> decomposition **in this domain**
  (not adjacent domains like general reasoning or code).

**Language:** final report in **English**. Retain technical terminology in
English. Quote sources in their original language where relevant.
```

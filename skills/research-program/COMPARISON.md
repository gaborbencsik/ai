# COMPARISON.md — AI Consultancy & SME AI, 3-Run Program (v1-deep)

All three runs share one uniformity contract: mode=deep, register per prompt (A/B landscape, C mixed), English artifacts, source floor ≥15, credibility labels (highest/high/mediumHigh/medium/low), report skeleton (Executive Summary 300–400 words; Findings 1500–2500 words, ≥80% prose; qualitative matrix; directional guidance; open questions; tagged bibliography).

## Run verdict table

| Run | Slug | Dur (min) | Retrievals (retrieve/direct/ws-fallback) | Sources | Findings words | Exec words | Critic findings (total / critical / major / minor / resolved) | Spec-conformant | Highest-cred sources |
|---|---|---|---|---|---|---|---|---|---|
| A | ai-consultancy | 104 | 24 / 11 / 25 | 42 | 1908 | 332 | 7 / 0 / 3 / 4 / 7 | ✅ | 6 |
| B | ai-sme-vendors | 155 | 22 / 14 / 27 | 45 | 2196 | 348 | 9 / 0 / 4 / 5 / 9 | ✅ | 16 |
| C | hu-sme-ai-2026 | 34.5 | 6 / 3 / 2 | 15 | 1580 | 347 | 4 / 1 / 2 / 1 / 4 | ✅ | 4 |

Credibility distribution: A {highest 6, high 9, mediumHigh 8, medium 17, low 2} · B {16, 15, 7, 7, 0} · C {4, 7, 2, 2, 0}.

## Effort & infrastructure

- **Retrieval infrastructure dominated the cost curve.** Runs A and B executed before the SearXNG CAPTCHA-suspension was fully characterized; they leaned on the web_search fallback (25 and 27 calls) and still completed. Run C launched after the preflight tightening: the subagent was steered to direct fetches from the start, so it burned only 2 web_search calls and 6 retrieval calls — yet still reached the ≥15 source floor. Retrieval discipline, not depth, explains C's 3× faster completion (34.5 min vs 104/155).
- **Search degradation pattern is now documented**: google/bing/duckduckgo/startpage engines intermittently CAPTCHA-suspended; arxiv/wikipedia engines nominal but off-topic; semantic-scholar returned empty result sets. Direct HTTP fetches of primary sources (Eurostat, KSH, vendor pages) are the reliable fallback and cost far fewer tool calls.

## Quality tables

- **Evidence-class discipline.** Run B had the strongest sourcing (45 sources, 16 highest-credibility, zero low) but also the most critic findings (9, all resolved) — vendor pricing pages are community/competitor-sourced in several places and required explicit downgrade labels (Zendesk per-resolution, HubSpot Breeze analysis, Fin pricing). Run A's rate-card sources (S27/S28) are practitioner marketing, downgraded to ranges with a CFO-lens caveat; EU AI Act compliance-cost figures framed as indicative bands, and high-risk-obligation dates corrected to the Digital Omnibus timeline (Dec 2027 / Aug 2028, Art. 50 transparency retained for Aug 2026).
- **Run C's one critical finding**: Hungary-specific adoption percentages initially leaned on secondary aggregations; resolved by grounding in KSH/Eurostat/GKI primary data plus named Hungarian SME success/failure cases and Ft-denominated cost figures.

## Depth deltas

No prior versions exist (all v1); no depth deltas apply. Where the three runs overlap (AI Act compliance as a priced workstream, SME tool adoption, EU/US vendor pricing), their figures are mutually consistent — e.g. compliance service demand and per-seat Copilot/ChatGPT pricing bands appear coherently across A, B, and C with no contradictions.

## Verdict

- **Efficiency frontier**: run C. Same mode, same source floor, ~3× less wall time and an order of magnitude fewer retrievals — retrieval preflight + direct-fetch steering is the winning pattern for any future run set.
- **Evidence quality frontier**: run B (45 sources, best credibility mix, most adversarial critique exercised).
- **Spec conformity**: all three runs pass the full validator (citation identity bidirectional match, word bands, line cap, source floor, non-empty run-meta schema). Every critic finding is resolved; no unresolved critical or major items remain.

## Recommendations for future re-runs

1. Always preflight-restrict engines to the known-working set and instruct direct-fetch-first from run start (saves ~60–70% of retrieval calls, per A/B vs C).
2. Keep the CFO-lens mandatory for any pricing-heavy prompt: it caught 4 of the 7 resolved major findings across A and B.
3. For Hungarian-market topics, budget extra direct-fetch time for KSH/Portfolio/HVG pages — they are the primary evidence and cannot be substituted by aggregator coverage.
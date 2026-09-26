# Research Program Plan — AI Consultancy & SME AI (3-Run Program)

## Goal
Run three existing research prompts (from workspace markdown files) through the
`deep-research` pipeline at uniform `deep` mode, with tracked artifacts, telemetry,
independent validation, and a final cross-run comparison report.

## Baseline table (prior runs)
| Topic | Prior run | Location |
|---|---|---|
| (none) | — | fresh program; all prompts from workspace drafts |

## Uniformity contract
1. **Mode**: `deep` for all runs.
2. **Register**: per prompt (run A: landscape; run B: landscape; run C: mixed).
3. **Report skeleton**: Executive Summary → Findings → qualitative decision matrix → directional guidance → open questions → full bibliography (fixed order, per prompt deliverable).
4. **Word bands**: exec summary 300–400; findings 1800–2500 (A, B) / 1500–2000 (C); prose ≥80%.
5. **Source floor**: ≥15 sources; ≥3 independent per major claim.
6. **Credibility labels**: highest / high / mediumHigh / medium / low.
7. **Line cap**: 160.
8. **Language**: English artifacts.
9. **Independence guard**: no grounding in prior internal runs; each run retrieves fresh evidence only. Forbidden: any prior run's report/sources under this program root.

## Artifact paths
- Program root: `/Users/macbook/Projects/ai-consultancy/research-program/`
- Run dir: `<root>/<slug>-v1-deep/`
- Per run: `report.md`, `sources.json`, `run-meta.json`, cache at `.omp/research-cache-<date>-<slug>-v1-deep.json` (session dir).

## Slugs & prompt files
| Order | Slug | Prompt file | Source workspace file |
|---|---|---|---|
| A | ai-consultancy | prompts/A-ai-consultancy.md | research_prompt_ai_consultancy.md |
| B | ai-sme-vendors | prompts/B-ai-sme-vendors.md | research_prompt_ai_sme_vendors.md |
| C | hu-sme-ai-2026 | prompts/C-hu-sme-ai-2026.md | research_prompt_hu_sme_ai_2026.md |

## Execution order & rationale
A → B → C, sequential, never parallel. A is broadest-but-generic (harness validation with easy global retrieval); B is vendor-heavy (many pricing pages, more retrieval load); C is Hungary-specific (hardest retrieval, local-language sources) — heaviest last.

## Per-run execution checklist
1. Un-block run in todo; record startedAt (UTC).
2. Spawn one task subagent (`DeepRunA/B/C`): brief contains prompt-file path (binding spec), PLAN.md (telemetry schema), exact output paths, independence guard, telemetry duties, validation checks, cache instruction.
3. Steering via `hub` only; no edits to run artifacts while running.
4. On completion: independent re-validation (below); reconcile word counts; fix JSON if needed.
5. Update STATUS.json + PLAN.md run status log. Block next run until done.

## Post-run validation checks (independent re-verification)
1. JSON parses: sources.json, run-meta.json, cache.
2. Citation-set identity: inline `[Sxx]` tokens == bibliography entries == manifest ids (count by regex on `\[S\d+\]`; watch dash-prefixed bibliography lines).
3. Word bands (independent tokenizer, excluding citation tokens); prose share ≥80%.
4. Line count ≤160; section order exact per prompt.
5. Source floor ≥15; 3+ independent citations per major claim (sampled).
6. run-meta fields non-empty; credibilityDist sums to sourceCount.
On failure: fix artifacts, re-validate, note in run-meta (`wordCountNote`, `citationIdentityNote`, `independentValidation`).

| A-ai-consultancy | 2026-09-11 | done | 104 min; SearXNG degraded (6 failed probes, major engines CAPTCHA-suspended) → 25 web_search + 11 direct reads + 2 Eurostat API; loop-backs pre-satisfied | 7 findings (0 crit/3 maj/4 min), all resolved | independent re-check PASS (citation identity exact 42, credSum 42, exec 337w, findings 1924w, prose 95.8%, 158 lines, sections exact, cache parses) | retrieval degradation = speed bottleneck; cache at .omp/research-cache-2026-09-11-ai-consultancy-v1-deep.json | 42-source study; HU adoption 3.0→10.4% vs EU 20% verified from primary data
- SearXNG reachable: ✅ JSON probe at http://localhost:8888 returned results.
- Agents present: ✅ research-scout, research-synthesizer, research-critic in `~/.omp/agent/agents/`.
- Run directories created lazily per run.

## Comparison rubric
Effort (duration, tool calls, bot-blocked domains) · Detail (lines, sources, word counts) · Quality (credibility dist, critic severity, spec conformance) · Depth delta (n/a — no baselines) · Verdict table (star rubric: effort efficiency / breadth / evidence quality / critique-repair / spec conformance).

## Run status log
| Run | Date | State | Effort notes | Critique | Validation | Caveats | Headline |
|---|---|---|---|---|---|---|---|
| A-ai-consultancy | — | pending | | | | | |
| B-ai-sme-vendors | — | pending | | | | | |
| C-hu-sme-ai-2026 | — | pending | | | | | |
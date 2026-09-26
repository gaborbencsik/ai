# Deep Re-Run Plan — <N> Topics at Uniform `<mode>` Depth

## Goal
Re-run <N> research topics at uniform **<mode>** depth so results are directly
comparable across topics (cross-topic) and across depths (vs prior runs, if any).
Baseline directories stay **read-only**; re-runs land under `<program-root>/`.

## Baseline (do not modify)
| Topic | Prior run | Mode | Sources | Report |
|---|---|---|---|---|
| <topic> | <date> | <mode> | <n> | <path or —> |

## Uniformity contract (held constant across all runs)
1. Mode: `<mode>` (<phases> phases; <search-band> parallel searches; ≥<floor>
   sources, 3+ independent per major claim; synthesis tier per deep-research skill).
2. Register: **<landscape|implementation>**.
3. Independence guard: prompts forbid grounding in prior runs' conclusions;
   retrieval must be fresh.
4. Identical report skeleton, in this fixed order:
   header → Executive summary (200–400 words) → Findings (700–1,200 words,
   ≥80% prose) → evidence table → comparison matrix → fit-by-use-case →
   open questions → full bibliography with credibility tags.
5. Length: ≤160 physical lines.
6. Source labels fixed set: `highest / high / medium-high / medium / low`.
7. Bot-blocked / unverifiable pages: labeled reputation-based, never verified.
8. Output language: English.
9. Same session configuration for all runs; no model-role changes between runs.

## Artifacts per run
```
<program-root>/<slug>-v1-<mode>/report.md
<program-root>/<slug>-v1-<mode>/sources.json
<program-root>/<slug>-v1-<mode>/run-meta.json
.omps cache → .omp/research-cache-<RUN-DATE>-<slug>-v1-<mode>.json
```

## Slugs and prompts
| # | Slug | Prompt file | Original mode |
|---|---|---|---|
| A | <slug> | prompts/A-<slug>.md | <mode or new> |

Execution order **A → Z**: simplest/familiar topic first (harness validation),
heaviest last. Sequential, never parallel — parallel runs would contend for
the retrieval backend and make effort telemetry non-comparable.

## Execution checklist (per run)
1. Pre-flight: SearXNG reachable at `http://localhost:8888`? Agents present?
   Note any fallback.
2. Record `startedAt`. Spawn one task subagent with the prompt file as binding
   spec + PLAN.md telemetry schema + output contract paths.
3. Let the run complete; steer only via `hub`.
4. On completion: independently re-validate (never trust self-report); sync
   corrections into run-meta with notes.
5. Update STATUS.json + Run status log below.

## Post-run validation (scripted, same checks every run)
- JSON parse: sources.json, run-meta.json, cache.
- Integrity: inline citations ↔ bibliography ↔ sources.json id sets identical
  (normalize S01==S1; count by `\[S\d+\]` token regex, not line starts).
- Spec: word bands; line count ≤160; section order; ≥15 sources;
  3+ independent citations per major claim (sampled).
- Telemetry completeness: all fields non-empty; credibilityDist sums.

## Comparison rubric (for the final `COMPARISON.md`)
- **Effort**: duration, agents, tool-call counts, fallbacks, retrieval failures.
- **Detail**: lines, sections, table rows, entities, citation density.
- **Quality**: credibility distribution, triangulation, integrity checks,
  critic findings (total/critical/resolved), unverified-claim disclosures.
- **Depth delta** (same topic vs prior mode): Δlines, Δsources, Δeffort,
  evidence-class change — one interpretation paragraph per topic.
- **Verdict table**: star rubric (effort efficiency / breadth / evidence
  quality / critique-repair / spec conformance).

## Run status log
### Run <ID> — `<slug>` — PENDING (blocked on user go)

## Status tracking
Tracked in the session todo list under phases `Preparation → Run A → … → Comparison`.
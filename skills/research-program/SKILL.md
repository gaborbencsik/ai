---
name: research-program
description: >
  Orchestrate a coordinated program of one or more deep-research runs under one
  tracked plan: generates STATUS.json as a state machine, writes and manages
  uniform per-topic research prompts, runs each topic through the deep-research
  pipeline in controlled sequence with effort telemetry (run-meta.json),
  validates every artifact set, and writes a final comparison report (compact
  verdict for a single run). Single-run (N=1) programs are supported for topics
  that need tracking, validation, and telemetry.
  Triggers: /research-program, research program, rerun research, research
  multiple topics, compare research runs, kutatási program, research sorozat.
  For a quick ad-hoc one-off question with no tracking needs use
  deep-research; to draft one prompt use research-prompt.
---

# Research Program Orchestrator

One plan, N topics (N ≥ 1 — a single topic is supported), uniform depth,
comparable artifacts, one comparison report.
This skill wraps repeated invocations of the `deep-research` skill with
versioned prompt files, per-run telemetry, independent validation, and a final
comparison report (cross-run for N ≥ 2, compact verdict for N = 1).

## When to Use

| Situation | Use this skill? |
|---|---|
| User wants SEVERAL related topics researched (fresh or re-run) at a uniform depth under one tracked plan, for later comparison | ✅ yes |
| User asks for a tracked, multi-topic research plan with saved prompts and status tracking | ✅ yes |
| User wants several NEW research topics orchestrated together (no prior runs exist) | ✅ yes |
| User wants ONE topic with full program tracking (state machine, telemetry, validation) — a single-run program | ✅ yes — N=1 program |
| Quick one-off research question, NO tracking needed | ✅ yes — lightweight N=1: plan+prompt+run+validate only, skip baseline/comparison ceremony (deep-research directly is still fine for the truly ad-hoc) |
| Drafting a single prompt (no run) | ❌ `research-prompt` |
| Vault filing of research | ❌ `autoresearch` |

Works for BOTH fresh programs and re-runs. The difference is only inputs:
fresh program = prompts generated from topic statements (baselines table
empty); re-run = prompts reconstructed from prior runs' wording + baseline
table filled read-only. Everything else (state machine, telemetry, validation,
comparison) is identical.

A single-run program (N=1) is fully supported: one topic, one run, the same
`PLAN.md` → `STATUS.json` → run → validation loop, and a compact COMPARISON.md
with a single-run verdict instead of a cross-run comparison. For a quick
one-off question run the LIGHT path: confirm topic + depth only (skip scope
register/baseline questions), then plan → prompt → run → validate; skip
baselines, execution-order rationale, and any comparison work beyond a
single-run verdict. Do not invent extra topics, baselines, or comparison
ceremony for N=1.

Prefer the N=1 container when the user wants tracked, validated,
telemetry-bearing artifacts — e.g. re-running a prior topic at a deeper mode,
or research whose outputs must live in the program directory with run-meta
telemetry.

## Core Concepts

- **Program root**: `<output-root>/` chosen by the user (e.g. `raw/research-program/`
  for a fresh program, `raw/deep-rerun/` for a re-run program). Holds
  `PLAN.md`, `STATUS.json`, `prompts/`, one directory per run, and the final
  `COMPARISON.md`.
- **Slug**: stable Camel-or-lowercase identifier per topic
  (e.g. `ai-advisor-products`). Never changes across versions.
- **Run directory**: `<program-root>/<slug>-v<VERSION>-<mode>/` — the version
  suffix makes any later pass on the same topic non-destructive (`v1` = first
  pass; bump to `v2` when re-running).
- **Run set**: a batch of runs sharing one uniformity contract and executed
  sequentially. Identified by the version suffix.
- **Uniformity contract**: the constants held identical across a run set —
  mode, register, report skeleton, word bands, source floor, credibility
  labels, language. Without it, cross-run comparison is meaningless.
- **Independence guard**: prompts forbid grounding in prior internal runs; each
  re-run must retrieve fresh evidence, or depth deltas are not interpretable.

## Workflow

### 1. Establish the program contract

Confirm with the user (or infer from context) before writing anything:

1. **Topics** — one sentence each; where each prompt comes from
   (prior run's wording, user draft, or this skill generating it).
2. **Depth mode** — one mode for ALL runs (default `deep`; see
   `deep-research` for mode semantics).
3. **Register** — `landscape` (default; no implementation guidance, no vendor
   picks) or `implementation` (adds design guidance).
4. **Output root** — where the program lives.
5. **Baselines** — prior runs of the same topics, if comparison across depths
   is wanted. Record their locations read-only in PLAN.md.
6. **Execution order** — default: simplest/familiar topic first (harness
   validation), heaviest last. Sequential, never parallel: parallel runs
   contend for the retrieval backend and make effort telemetry non-comparable.
   (N=1 program: skip the execution-order rationale; the rest of the contract
   checklist is unchanged and still required.)
7. **Version suffix** — `-v1-<mode>` naming; increments on re-runs.
8. **Language** — English artifacts by default (matches deep-research skill
   contract); conversation language is free.

### 2. Write the plan and the state machine

`PLAN.md` (human-readable contract):
- Goal, baseline table (prior runs: mode/date/sources/report paths — read-only).
- Uniformity contract (the numbered list above, made concrete: report skeleton
  in fixed section order, word bands, source floor, credibility label set,
  line cap, language).
- Per-run artifact paths (report/sources/run-meta/cache) with the versioned
  naming pattern.
- Slugs and prompt-file mapping table.
- Execution order with rationale.
- Per-run execution checklist and post-run validation checks.
- Comparison rubric (what will be measured at the end: effort / detail /
  quality / depth-delta dimensions).
- Run status log (appended after each run completes; see step 6).

`STATUS.json` (machine-readable state machine):
```json
{
  "program": "<name>",
  "plan": "<program-root>/PLAN.md",
  "createdAt": "<date>",
  "status": "prepared|running|complete",
  "mode": "<depth>",
  "versionSuffix": "-v1-deep",
  "runs": [
    {
      "order": 1,
      "slug": "<slug>",
      "promptFile": "<program-root>/prompts/<ID>-<slug>.md",
      "originalRun": {"date": "", "mode": "", "report": ""},
      "output": {"report": "", "sources": "", "meta": "", "cache": ""},
      "state": "pending|running|done",
      "blockedOn": "user go|null|<reason>"
    }
  ],
  "uniformityContract": { "mode": "", "register": "", "independenceGuard": "",
    "sectionOrder": [], "lineCap": 0, "sourceFloor": 0,
    "independentSourcesPerClaim": 0, "credibilityLabels": [],
    "language": "", "execution": "sequential, never parallel" },
  "finalArtifact": "<program-root>/COMPARISON.md",
  "comparisonRubric": ["effort", "detail", "quality", "depth delta", "verdict table"]
}
```

Prompt files live in `<program-root>/prompts/<ID>-<slug>.md` where ID orders
execution (A, B, C…). Format: a fenced block starting with the literal
`/research in <mode>:` invocation (copy-paste runnable), structured as:
Goal → Scope discipline → Context → Primary question → Sub-questions A–G →
Out of scope → Sources → Critique personas → Deliverable → Loop-back triggers.
Reuse the proven skeletons; keep named entities explicit; forward concrete
numbers verbatim. If prior-run wording exists (from session logs or the prior
prompt file), reconstruct prompts from it rather than from memory.

### 3. Pre-flight (once per program)

- Retrieval backend reachable? (SearXNG `http://localhost:8888` JSON probe;
  note expected degradation and the direct-read fallback pattern.)
- Agents present? (`research-scout`, `research-synthesizer`, `research-critic`
  under `~/.omp/agent/agents/`). Record any that will need fallback.
- Create run directories lazily per run, named with the version suffix.

### 4. Execute each run (sequential)

For each run in order:
1. Un-block the run in the todo list; record `startedAt` (UTC).
2. Spawn ONE task subagent (e.g. `DeepRun<Id>`) whose brief contains:
   - the binding spec = the prompt file path, and PLAN.md for the telemetry
     schema;
   - the exact output contract paths;
   - the independence guard (forbidden paths enumerated);
   - telemetry duties: startedAt/finishedAt/duration, agents used, tool-call
     counts (retrieve / directReads / webSearchFallbacks), critic findings
     (total/critical/major/minor/resolved), botBlockedDomains,
     credibilityDist, lineCount, word counts, specConformance;
   - the validation checks (step 5) to self-run before finishing;
   - instruction to write `run-meta.json` honestly and the session cache
     (`.omp/research-cache-<date>-<slug>-v<version>-<mode>.json`).
3. While it runs: only steering through `hub`; do not edit its artifacts.
4. On completion: independently re-validate (step 5) — never trust the
   subagent's self-report alone. Reconcile word counts with your own tokenizer
   and append a `wordCountNote` if they differ. Verify JSON parses; fix
   missing commas/duplicate keys in run-meta if the subagent left them.
5. Update STATUS.json state and the PLAN.md run status log (effort, critique,
   validation, caveats, landscape headline). Mark todo done.
6. Block the next run on this one (or await user go per the program's mode).

### 5. Validation contract (every run, independent re-verification)

1. JSON parses: sources.json, run-meta.json, cache.
2. Citation-set identity: inline `[Sxx]` tokens == bibliography entries ==
   manifest `id` values (normalize zero-padding: `S01` == `S1`; count tokens
   by regex on `\[S\d+\]`, not line starts — dash-prefixed bibliography lines
   are a known false-negative trap).
3. Word bands: exec summary 200–400; findings 700–1,200 (count prose words
   excluding inline citation tokens); prose share ≥80%.
4. Line count ≤ cap (160 default); section order exact per prompt.
5. Source floor ≥15; every major claim 3+ independent citations (sampled).
6. run-meta fields all non-empty; credibilityDist sums to sourceCount.
Fix the artifacts (not the checks) on failure; re-validate; note fixes in
run-meta (`wordCountNote`, `citationIdentityNote`, `independentValidation`).

### 6. Comparison report

After all runs are DONE, write `<program-root>/COMPARISON.md` from the run-metas.

**N=1 programs**: write the compact form — one **Run verdict** table (the same
star rubric rows over effort efficiency / breadth / evidence quality /
critique-repair / spec conformance, applied to the single run), the effort +
quality tables from its run-meta, and numbered conclusions grounded in them.
Skip depth-delta (no second run); if baselines exist, include the delta
section against the prior run even in an N=1 program.

For multi-run programs (N≥2), the tables compare runs:
- **Effort table**: duration, scouts, searches, direct reads, fallbacks,
  critic findings, bot-blocked domains. Key question: did effort track topic
  size or retrieval health?
- **Detail table**: lines, sources, word counts, tables, section order.
- **Quality table**: credibility distribution, integrity checks, critic
  severity, unverified-claim discipline, spec conformance.
- **Depth delta** (if baselines exist): per topic, prior mode vs deep —
  Δsources, Δlines, Δeffort, evidence-class change; one interpretation
  paragraph for the most informative delta.
- **Verdict table**: star rubric over effort efficiency / breadth / evidence
  quality / critique-repair / spec conformance — same shape as any prior
  qualitative comparison, so successive comparisons stay comparable.
- **Conclusions**: numbered, each grounded in the tables (e.g. which mode is
  the efficiency frontier; whether critique was load-bearing; retrieval
  infrastructure vs mode depth as the cost driver).
- Update STATUS.json to `complete`; record every artifact path.

## Effort Telemetry Schema (`run-meta.json`)

```json
{
  "slug": "", "mode": "", "startedAt": "", "finishedAt": "", "durationMinutes": 0,
  "orchestratorModel": "",
  "scoutAgents": [],
  "synthesizerAgent": "",
  "agentFallbacks": "",
  "criticFindings": {"total": 0, "critical": 0, "major": 0, "minor": 0, "resolved": 0},
  "toolCalls": {"retrieve": 0, "directReads": 0, "webSearchFallbacks": 0, "note": ""},
  "sourceCount": 0,
  "credibilityDist": {"highest": 0, "high": 0, "mediumHigh": 0, "medium": 0, "low": 0},
  "botBlockedDomains": [],
  "lineCount": 0, "execSummaryWords": 0, "findingsWords": 0,
  "wordCountNote": "", "citationIdentityNote": "", "independentValidation": "",
  "specConformance": true
}
```
Honesty rules: count failed probes separately from successful reads; record
agent-role fallbacks explicitly; never let specConformance=true stand on the
subagent's self-report alone.

## Known Failure Patterns (from the validated run)

- **SearXNG engine throttling mid-run**: expect it; steer the run toward
  direct first-party reads; count fallbacks honestly. A "clean failure" (0
  results) that forces a live-API pivot can beat fallback limbo on both time
  and evidence class.
- **Subagent self-report drift**: word counts computed with a different
  tokenizer; validator regex missing dash-prefixed bibliography entries.
  Always re-run the validation independently; sync corrections into
  run-meta with explanatory notes.
- **JSON boundary edits**: appending fields to run-meta.json can drop a
  comma or duplicate a key — re-run the parse after every edit.
- **Citation id non-contiguity**: critique may drop sources; ids can have
  gaps. Non-contiguity is acceptable; set equality is the check.
- **Retrieval-backend sandbox limits**: a scout sandbox may not reach the
  local backend; record the fallback in toolCalls note rather than
  pretending the search happened.

## Language

<critical>
The default output language is English. Reports, prompts, manifests, and
comparison artifacts MUST be English even when the conversation is in another
language. Write in another language ONLY if the user explicitly requests it
(e.g. "magyarul"). A Hungarian conversation is NOT such a request. Summaries
to the user in conversation language are fine; artifacts stay English.
</critical>

## Anti-patterns

- Parallel runs in one program (contaminates effort telemetry).
- Grounding a re-run in prior internal reports (breaks depth-delta logic).
- Skipping independent validation of subagent artifacts.
- Version-suffixed runs that overwrite prior runs instead of coexisting.
- Writing COMPARISON.md from memory instead of from run-meta.json files.
- Letting the subagent's specConformance stand without independent recheck.

---

**Version**: 1.2 | **Compatibility**: OMP (oh-my-pi) | **Requires**: `deep-research` skill (pipeline), SearXNG or fallback retrieval, task subagents via `task`/`hub`
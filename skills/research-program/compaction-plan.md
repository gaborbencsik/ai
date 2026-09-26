# Plan: Context Compaction & Prompt Cache for Research-Program Subagents

**Date**: 2026-09-11 · **Status**: proposal — apply to future runs (C) / apply mid-run if B crosses risk threshold

## Problem (measured, run A + B session `DeepRunA`)

- Context (input tokens/turn): 18k → 558k over 4h10m; max observed **614,790** input tokens in a single call.
- `cacheRead: 0` and `cacheWrite: 0` in **all** 340 usage records — the ollama-cloud endpoint is **not using prompt caching at all**; every one of ~440 calls replays the full history.
- Consequences: rising per-turn latency (63s → worse), high billed input tokens, and eventual overflow risk; overflow triggers emergency compaction mid-run at the worst possible time (lost tool results are unrecoverable mid-write).
- No compaction event occurred in run A (session grew monotonically; no `compaction` entries in the JSONL).

## Options

### Option 1 — Native automatic compaction (recommended, zero code)
omp already ships this. Default `methodOrder = ["remote", "snapcompact", "handoff", "shake", "soft"]`; threshold defaults are fine. What to change:

- In project or user config (`config.yml`):
  ```yaml
  compaction:
    enabled: true            # already default
    midTurnEnabled: true     # default true — keep
    keepRecentTokens: 40000  # raise from 20000: research runs need more working recency
    thresholdPercent: 0.7    # compact at 70% of the model context window (earlier than default)
    autoContinue: true       # default — keeps the run going after compaction
  ```
- `shake` (local, no model call) is already in the default method order and replaces eligible tool results with `artifact://` refs — free savings for our search-heavy pattern. Ensure `compaction.supersedeReads` and `compaction.dropUseless` stay `true` (defaults).
- Subagent sessions inherit settings from the spawning session — verify once with a probe run.

### Option 2 — Prompt cache on the provider (biggest latency/cost win)
The cloud endpoint supports the usage fields (they are reported as zeros) but nothing is cached. Two mitigations:

- Check the Ollama cloud model config for a cache-enabled variant/route (some ollama-cloud deployments support prompt caching per-model or per-api-key). If the provider exposes a cache toggle, turn it on; expected 60–90% input-token saving at 500k+ contexts.
- If ollama-cloud cannot cache: route subagent runs to a provider with native prompt caching (e.g. Anthropic/OpenAI direct keys) for the *same* model family where possible, or accept uncached runs and rely on Option 1's earlier compaction to cap per-call input size.

### Option 3 — Manual checkpoint compaction from the orchestrator (works with current agent)
Steering message pattern (already proven possible via hub):

- At fixed input-token checkpoints (e.g. every 300k) send:
  "Checkpoint: write a working-notes summary of gathered sources+facts to `research-program/<slug>-v1-deep/notes.md` (structured, ≤200 lines), then run /compact with instructions: 'preserve notes path, current phase, remaining loop-back triggers'."
- Effect: forces an LLM summary (handoff-style) while notes live on disk — subagent loses tool-result bulk but keeps decisions.
- No config change needed; works mid-run today via `hub send`.

### Option 4 — Experimental notes-backed context windows
`compaction.experimentalContextManagement: true` (then session restart): model gets `context_notes` + `new_context` rollover instead of LLM summarization; raw history stays retrievable via `history://current/full`. Best for research runs (notes are the natural artifact), but experimental; test on a cheap probe run first.

## Recommendation for this program
1. **Now (no restart, mid-B safe)**: Option 3 checkpoint steering — arm it for run C and only if B crosses ~450k input tokens before its writing phase.
2. **For run C (needs config + restart before C starts)**: Option 1 (`thresholdPercent: 0.7`, `keepRecentTokens: 40000`) + keep defaults for shake/dropUseless. This is boring and deterministic.
3. **Provider investigation (parallel, no risk)**: verify whether ollama-cloud exposes prompt caching for `glm-5.3-flash`; if yes enable, if no note it in run-meta `toolCalls.note` so the comparison table shows cache status per run.
4. Defer Option 4 unless C still overflows with Option 1 enabled.

## What to modify (exact)
- File: `~/.omp/config.yml` (user) or `.omp/config.yml` (project — prefer project so it travels with the program):
  ```yaml
  compaction:
    thresholdPercent: 0.7
    keepRecentTokens: 40000
  ```
- Restart omp session (or at minimum ensure subagent spawns after the config change; subagents read config at spawn).
- Re-measure on run C: expect max single-call input ≤ ~60% of context window, no overflow errors, and `session_compact` events present in the subagent JSONL.

## Success criteria (measurable)
- Run C single-call input peak stays below the compaction threshold (no `stopReason === "length"` events).
- ≥1 compaction entry per long run; no mid-write overflow recovery.
- Per-call input tokens at compaction boundary < 70% of window; post-compact calls return to ~80–120k input tokens.
- Duration: no regression from compaction overhead (target ≤ +10% wall time).

## Addendum (2026-09-11, pre-run C): model switch for caching
User decision: run C executes on **ollama-cloud/deepseek-v4.1-flash** instead of glm-5.3-flash.

- Live probe (identical 300-sentence prefix, 2 calls each): glm-5.3-flash **does not cache**
  (cached=0 after 3 identical calls) — root cause of cacheRead:0 in runs A/B; not configurable.
- deepseek-v4.1-flash caches natively: call2 cached=1704/1833 (~93%), call1 cached=0 (expected warm-up).
- Config applied in `~/.omp/agent/config.yml`: top-level `model:` + `modelRoles.smol` switched to
  `ollama-cloud/deepseek-v4.1-flash`. Compaction config unchanged (thresholdPercent 0.7, keepRecentTokens 40000).
- Comparison caveat: run C is "switched arm" — model + caching + compaction all differ from A/B.
  Duration/effort deltas in COMPARISON.md must attribute this to the model+cache change, not mode effects.
- Expected effect on run C: from the 2nd LLM call, ~93% of input tokens served from cache
  (billed at $0.003/M vs $0.15/M); per-turn latency should drop with cache; compaction caps worst-case input.

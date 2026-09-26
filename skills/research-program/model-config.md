# Model Config — Research-Program Roles

**Date**: 2026-09-12 · Based on measured run A/B/C telemetry + `~/.omp/agent/models.yml` pricing.

## Principle

Cost ≠ latency here: ollama-cloud models bill $0 but consume quota on every
full-history replay. Without prompt caching, a 4h run with 614k-token turns
re-burns the entire context per call (~440 calls in run A) — so the primary
lever is **model choice per role** + smaller replayed context, not rate.

## Role → model map

| Role | Model (`provider/model`) | Why | Fallback |
|---|---|---|---|
| Orchestrator (main session) | `cheaperinference/deepseek-v4-flash` | Cheapest per-output token ($0.155/M out), 1M ctx, tool-reliable, good long-context synthesis. Runs are synthesis-dominated → output price matters. | `ollama-cloud/deepseek-v4-flash` (quota, free-tier) |
| Research scout (retrieval loops) | `cheaperinference/glm-5.3-flash` | Cheapest input ($0.074/M) — scout turns are input-heavy (full history replay each search), minimal output. | `ollama-cloud/glm-5.3-flash` |
| Research critic (quality gate) | `cheaperinference/gpt-5.6-terra` | Quality ceiling per user instruction; 1-2 calls per run → negligible cost ($0.80/$4.80 per M, 60% off list). Strongest OpenAI-wire reasoner on cheaperinference. | `cheaperinference/claude-sonnet-5` |
| Trivial/mechanical (sonic-class) | `cheaperinference/glm-5.3-flash` | No reasoning needed. | — |

## Cost model (per deep run, A/B-sized: ~250k in / ~60k out per agent)

- Orchestrator on deepseek-v4-flash: 250k×$0.078 + 60k×$0.155 ≈ **$29**; with 90% cache hits ≈ **$4**.
- Same on glm-5.3-flash: ≈ $31 (output 60% pricier) — wrong direction for synthesis.
- ollama-cloud either: $0 billed but full quota consumption per uncached replay.

## Enabling caching (the actual quota saver)

cheaperinference exposes cacheRead/cacheWrite prices, but the endpoint must
return `usage.prompt_tokens_details.cached_tokens` for omp to credit it. Verify
before committing:

```bash
curl -s https://api.cheaperinference.com/v1/chat/completions \
  -H "Authorization: Bearer $CHEAPERINFERENCE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4-flash","messages":[{"role":"user","content":"repeat this: cache-probe"}],"max_tokens":10}' \
  | jq .usage
```

If `cached_tokens` stays 0: keep glm-5.3-flash for scouts but **halve replay
volume** instead — `compaction.thresholdPercent: 0.7` + `snapcompact.toolResults`
(already in `.omp/config.yml`) is the cost control, cache is only a multiplier.

## Where to set it

- Session model: `/model cheaperinference/deepseek-v4-flash` at run start, or
  `sessions.<name>.model` in `~/.omp/config.yml`.
- Subagents: pass model in the DeepRun task brief (run-meta already records
  `orchestratorModel`; keep uniform per run set for comparable telemetry).
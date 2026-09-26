---
name: research-wiki
description: >
  Distill finished research runs (deep-research / research-program outputs under
  raw/) into a small, maintainable plain-markdown wiki: one topic page per theme,
  one run leaf page per research run (the only place model/provider/telemetry
  lives), one index with a freshness table and maintenance rules. raw/ is never
  modified. Triggers: /research-wiki, wiki update, wiki frissítés, distill to
  wiki, build wiki from research. Not for running research (deep-research,
  research-program) or vault transactions (autoresearch).
---

# Research wiki distiller

Two layers, one direction of flow:

- **`raw/` = evidence layer, append-only.** Run directories (`<slug>-v<N>-<mode>/`)
  hold `report.md` / `REPORT.md`, `sources.json`, `run-meta.json`. Never edit,
  rename, or delete them; a re-run creates a NEW versioned directory.
- **`wiki/` = distillate layer.** Topic pages hold compressed claims plus inline
  citation tokens. Pages NEVER copy source manifests — tokens resolve against the
  run's `sources.json`. No duplication means no drift when a page is refreshed.

Plain markdown only: renders in Obsidian/VSCode/GitHub, searchable by qmd /
semantic code search without build tooling.

## When to use

| Situation | Use? |
|---|---|
| Research runs finished; user wants them distilled into a browsable wiki | ✅ |
| New run landed in `raw/` and must be folded into an existing wiki | ✅ |
| Running new research | ❌ `deep-research` / `research-program` |
| Vault transactions, canonical merges | ❌ `autoresearch` |

## Layout

```
wiki/
  index.md                  # topic map + freshness table + maintenance rules
  <topic-slug>.md           # one per theme; 6-10 pages max; split at >150 lines
  runs/
    <slug>-v<N>-<mode>.md   # EXACTLY one leaf page per raw run directory
    <dossier-slug>.md       # also for inline model dossiers (dir without run-meta)
```

Multiple runs may feed one topic page (same theme, different passes or models);
their per-run metadata lives only in the leaf pages, never on the topic page.

## Topic page schema

```yaml
---
title: <Theme> — <register>
updated: <YYYY-MM-DD>
evidenceAsOf: <YYYY-MM-DD of newest feeding run>
runs:
  - raw/<run-dir-1>        # ordered; k = 1-based index for citation scoping
  - raw/<run-dir-2>
---
```

Sections, fixed order: **TL;DR** (3-5 bullets) → **Findings** (compressed claims,
cited) → **Deltas** (only when 2+ runs feed the page: what newer/other runs
changed) → **Open questions** → **Sources** (per-run references + leaf links).

Citation scoping: `[Rk-Sxx]` where `k` is the 1-based index into frontmatter
`runs:` and `Sxx` is that run's `sources.json` id. Single-run pages may use bare
`[Sxx]`. Runs WITHOUT a machine manifest (inline dossiers) are cited in prose and
linked in Sources — never given token ids.

**Hard rule: no model, provider, duration, or telemetry fields on topic pages or
index.** That data lives in exactly one place: the leaf pages.

## Run leaf page template

```yaml
---
run: <slug>-v<N>-<mode>
raw: raw/<run-dir>
date: <startedAt date / manifest researchedAt>
mode: <run-meta.mode | "manifest only (pre-skill run)">
model: <run-meta.orchestratorModel verbatim | "unknown (absent from run-meta)">
provider: <parsed from "provider/model" string | "unknown">
---
```

Body: one telemetry block — `durationMinutes`, `sourceCount` (counted from
`sources.json`, not from meta), `toolCalls` (retrieve / directReads /
webSearchFallbacks), `criticFindings` (total/critical/major/minor/resolved),
`credibilityDist`, bot-blocked domain highlights, recorded fallbacks.

Source of truth: that run's `run-meta.json` + `sources.json` ONLY. Mechanical
transcription, zero interpretation. Pre-skill runs without `run-meta`: record
`researchedAt` + source count from the manifest; model/provider = unknown.
Inline dossiers (markdown, no manifest): model/provider inferred from the
directory name, labeled as inference.

## index.md contract

1. **Topic map** — one line per topic page: coverage + link.
2. **Freshness table** — page | evidenceAsOf | feeding runs | staleness hint.
3. **Maintenance rules** — the block below, verbatim.

## Build / refresh workflow

**Phase 1 — skeleton (mechanical, orchestrator).** Restore/confirm `raw/` tree;
create `wiki/index.md`, all run leaf pages (from run-metas), and topic page
skeletons with frontmatter + empty sections. Restore misplaced raw trees by
COPY, never move.

**Phase 2 — distillation (parallel subagents, one per topic page).** Brief per
agent: the topic's run report + `sources.json` paths as the ONLY evidence;
output file path; citation scoping rule; English; ≤150 lines; FORBIDDEN: other
runs' data, own opinion, new web retrieval. One agent owns one file — no shared
writes.

**Phase 3 — verification (orchestrator, independent of subagent claims):**
1. Citation-set identity per run: inline `[Rk-Sxx]` tokens (regex on
   `\[R\d+-S\d+\]`, normalize zero-padding `S01`==`S1`) == that run's
   `sources.json` id set. Dash-prefixed bibliography lines are a known regex
   false-negative trap.
2. Exactly one leaf per raw run/dossier directory; every topic-page `runs[]`
   path exists on disk.
3. No model/provider/duration tokens on topic pages or index.
4. Every page reachable from `index.md`; no orphans.
5. Topic pages ≤150 lines; section order exact.
Fix the artifacts, never the checks; re-verify after fixes.

## Maintenance rules (goes into index.md)

- New research run → lands in `raw/` untouched → add its leaf page → update
  exactly one topic page (or create with a new slug) → index freshness row.
- Re-run of a topic → NEW versioned raw dir → topic page gains a Deltas entry;
  prior claims keep their citations.
- `evidenceAsOf` moves only when newer evidence actually changed the page.
- Forbidden: copying source manifests into the wiki, a second navigation layer,
  build tooling or search indexing, orphan pages, model/provider info on topic
  pages.

## Language

<critical>
Wiki artifacts are English by default, matching the raw corpus. Write in
another language ONLY on explicit user request. Conversation language is free.
</critical>

---

**Version**: 1.0 | **Compatibility**: OMP | **Requires**: finished runs under
`raw/` with `sources.json` (and `run-meta.json` where available)
---
name: project-vocabulary
description: Maintain the project glossary in wiki/pages/vocabulary.md. Use when adding, defining, correcting, sourcing, reviewing, or removing project terminology from meetings, screenshots, raw research, or reviewer annotations.
---

# Project vocabulary

Maintain `wiki/pages/vocabulary.md` as the single source of truth for project terminology.

## Result contract

A successful change MUST leave one `### Term` entry block under the matching represented `## A`–`## Z` initial. Each block contains one non-empty definition paragraph and one `**Source:**` line. Terms MUST be unique, non-empty, grouped under the correct initial, and sorted case-insensitively across sections. Every definition MUST be non-empty.

## Read before editing

1. Read the vocabulary rules in `AGENTS.md`.
2. Read the complete vocabulary table.
3. Search `raw/`, `wiki/assets/`, and finalized decision records under `documents/**/decisions/Decided/` before writing a sourced definition.
4. Inspect the committed baseline when deletion or source removal is requested.

Do not create a separate source registry. In particular, do not recreate `VOCABULARY_SOURCES.tsv`.

## Entry model

```markdown
## C

### Campaign

A coordinated marketing initiative containing multiple communications.

**Source:** 2026-09-01 — `raw/meetings/2026-09-01/summary.md`
```

Use one block per term. Do not use Markdown tables. Do not add empty letter sections. A block MAY include one `**See also:** [[concepts/Page]]` line between the definition and source; its target MUST exist.

### Term

- Preserve exact project spelling and capitalization.
- Add one concept per `###` entry.
- Do not add aliases for existing concepts.
- Keep entries in case-insensitive alphabetical order across letter sections.

### See also

- Optional; omit it when no canonical concept page exists.
- Use exactly one wikilink to a page under `wiki/pages/`.
- Place it between the definition and `Source` lines.
- It is navigation, not part of the definition or source.

### Definition

- MUST be non-empty.
- State the term's role, boundaries, and relevant relationships concisely.
- A sourced definition requires project evidence that explicitly defines or explains the term. A mention alone is insufficient.
- A definition entered manually by the user may remain without a source.
- Never fill a definition from general knowledge, inference, or an external source.

### Source

A manually entered definition MAY have an empty `**Source:**` value. Empty means `manual`; leave it empty rather than inserting a marker.

A non-empty source MUST use one of these forms:

```text
YYYY-MM-DD — `repo-relative/path`
YYYY-MM-DD — `repo-relative/file.vtt#HH:MM:SS-HH:MM:SS`
```

- Use the source's stated date, or its capture/receipt date when unavailable.
- Use repository-relative paths only.
- For VTT, cite the exact range containing the supporting discussion.
- A finalized `.decision.md` record under `documents/**/decisions/Decided/` is the source for terminology introduced or renamed by that decision.
- Never attach a source merely because it mentions the term.
- Once the committed baseline contains a non-empty source for a term, never clear it.
- An existing source may be replaced only with another valid source.

## Workflow

### Add a term

1. Confirm no exact or case-insensitive duplicate exists.
2. Determine whether the definition was entered by the user or derived from project evidence.
3. For source-derived definitions, find explicit evidence in `raw/` or `wiki/assets/`.
4. Write the shortest definition that preserves the evidenced meaning.
5. Insert the row at its alphabetical position.
6. Review the resulting entry against the result contract.

If no adequate project source exists and the user did not provide the definition, do not add the term. Report the missing evidence.

### Improve a definition

1. Preserve the term exactly.
2. Compare candidate evidence with the current definition.
3. Change it only when evidence adds material precision, scope, structure, constraints, or relationships.
4. Replace the source only when the replacement is valid and stronger.
5. Never clear a committed non-empty source.
6. Review the resulting entry against the result contract.

### Process annotations

- Apply precise text edits when they preserve the term and supported meaning.
- Treat a request to remove a row as a deletion request.
- During initial, uncommitted curation, explicitly rejected rows may be deleted.
- After the first commit containing the vocabulary, reject deletion requests and report the rule.
- A request to remove part of a definition does not authorize deleting the term.

### Rename, merge, or replace

Do not rename, merge, or replace an existing term unless the user explicitly changes that policy. When the rename is a new project decision, create or use a finalized `.decision.md` record that explicitly states the selected terminology, and replace the prior term's source with that decision record. Do not reuse an older source that does not record the rename. If authorized, perform a clean migration, preserve ordering, and validate.

## Committed-baseline protections

Inspect `HEAD:wiki/pages/vocabulary.md` when available.

After the first vocabulary commit:

- existing terms cannot be deleted;
- existing non-empty sources cannot be cleared;
- newly added manual definitions may still have empty sources.

Before the first commit, explicitly rejected entries may be removed during initial curation.

## Completion checks

Review the changed vocabulary for:

- entry-block shape and the absence of Markdown tables;
- non-empty terms and definitions;
- duplicate terms;
- case-insensitive alphabetical order;
- alphabetical section presence, order, and term membership;
- source syntax, dates, repository containment, and source-file existence;
- terminology changes cite the finalized decision record that explicitly establishes the selected name;
- optional `See also` shape and target existence;
- VTT ranges and transcript evidence where cited;
- committed term deletion;
- clearing committed non-empty sources.

## Completion report

Report:

- terms added, changed, or removed;
- source changes;
- rejected operations and their governing rule;
- completion-check findings.

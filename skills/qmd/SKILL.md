---
name: qmd
description: On-device semantic + keyword search over your local markdown notes, docs, and transcripts via the qmd MCP server. Use when you need to find, recall, or retrieve something from your personal knowledge base (notes, meetings, docs) — anywhere you would otherwise `grep` through `~/notes`, `~/Documents`, or similar collections. Triggers: "search my notes", "find in my notes", "what did I write about", "recall from meeting", "look up in my docs", "search my knowledge base", "find that note about". DO NOT use for: current-repo code search (semble-search), web search (searchx), or reading a known-path file (Read).
---

# qmd

On-device search engine over your indexed markdown/plain-text collections. Combines BM25 keyword search, vector semantic search, and LLM re-ranking — all running locally. Exposed as an MCP server (`qmd mcp`) with the tools `query`, `get`, `multi_get`, and `status`.

## When to use

- **Recall from personal notes / meetings / docs:** "what did I decide about X?", "find that meeting where we discussed Y"
- **Cross-collection semantic lookup:** you know the topic but not the file
- **Retrieving a specific document or line range** once you have the path or docid

**DO NOT use** when:
- You want to search the current code repo → `semble-search`
- You want the web → `searchx`
- You already know the file path → `Read`

## Prerequisites

`qmd` is installed globally in the sandbox and registered as an MCP server (see `sbx-spec.yaml`). Before search works, at least one collection must be indexed:

```bash
qmd collection add ~/notes --name notes
qmd embed
qmd status
```

If `qmd status` reports 0 documents, no collection has been added yet — tell the user rather than guessing at empty results.

## How to invoke

Prefer the MCP tools exposed by the `qmd` server:

- `mcp__qmd__query` — hybrid semantic + reranking, best quality. Default choice.
- `mcp__qmd__get` — retrieve a single document by path or `#docid`; supports `path:line:count` ranges.
- `mcp__qmd__multi_get` — glob or list retrieval.
- `mcp__qmd__status` — sanity check (collections, doc count).

If MCP tools aren't listed for some reason, fall back to shell:

```bash
qmd query "quarterly planning process" --json -n 10
qmd search "authentication" -c notes --json
qmd vsearch "how to deploy" --json
qmd get "meetings/2024-01-15.md" --full
```

## Choosing a mode

| Need | Tool |
|---|---|
| I know the exact keyword | `search` (BM25) |
| I know the concept, not the words | `vsearch` (vector) |
| I want the best result, cost be damned | `query` (hybrid + rerank) — **default** |
| I have the path/docid, just fetch it | `get` / `multi_get` |

## Output handling

Results come back as `path`, `score`, and a snippet. Two paths forward:

1. **Answer directly** with `file:line` citations — clickable in the terminal.
2. **Need the full document** → `get path --full`, or `Read` it if it's inside the current repo.

Do **not** re-run `qmd search` to re-fetch content you already located; use `get` (or `Read`) at the returned path.

## Slash command

`/qmd <query>` runs a hybrid query against all indexed collections and returns top matches. For collection-scoped or mode-specific searches, invoke the CLI directly.

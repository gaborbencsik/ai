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

- `mcp__qmd__query` — **default: keyword (lex).** Call with `searches: [{type: "lex", query: "…"}]` and `rerank: false` for the fast (~0.3s) path. Add `vec`/`hyde` lines or `rerank: true` only when a concept search is needed and the user has accepted the ~1min CPU wait.
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

**Default to keyword (lex).** On a CPU-only machine (no GPU), vector and rerank are slow — always prefer the fast path and escalate only when a keyword search genuinely fails.

| Need | Tool | Speed (this machine) |
|---|---|---|
| Keyword / known term (**default**) | `search` (BM25), or `query` with `rerank: false` and only `lex` searches | ~0.3s |
| Concept, not the words | `vsearch` / `query` with a `vec` line | ~46s (CPU) |
| Best possible ranking | `query` (hybrid + rerank) | ~130s (CPU) |
| I have the path/docid | `get` / `multi_get` | instant |

## Performance & hardware

Run `qmd doctor` to check the device. On a machine **without GPU** (`device probe: running on CPU`):

- **Document embeddings are already built** — that one-time cost is paid. But every *query* using `vec`/`hyde` must embed the query text with a 1.7B model on CPU, so semantic search costs ~45s+ per call; reranked hybrid ~2min.
- **Keyword (lex) needs no model — sub-second.** Make it the default.
- **Never launch a slow (`vec` / `rerank: true`) search silently.** If keyword search is insufficient and semantic is warranted, **ask the user first** and warn about the ~1min wait, then run it.
- GPU (Metal/CUDA/Vulkan) would make vector search sub-second; if available, install it and the default can shift back to hybrid.

## Output handling

Results come back as `path`, `score`, and a snippet. Two paths forward:

1. **Answer directly** with `file:line` citations — clickable in the terminal.
2. **Need the full document** → `get path --full`, or `Read` it if it's inside the current repo.

Do **not** re-run `qmd search` to re-fetch content you already located; use `get` (or `Read`) at the returned path.

## Slash command

`/qmd <query>` runs a hybrid query against all indexed collections and returns top matches. For collection-scoped or mode-specific searches, invoke the CLI directly.

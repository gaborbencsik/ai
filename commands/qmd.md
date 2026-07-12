---
description: Fast local keyword search over indexed markdown notes/docs via qmd (lex-first; semantic on request)
argument-hint: <what to find in your notes>
allowed-tools: mcp__qmd__query, mcp__qmd__status, Bash(qmd:*)
---

Search the user's local qmd-indexed collections for: **$ARGUMENTS**

> **Hardware note:** this machine has **no GPU** — vector/rerank runs on CPU and is slow (~46s for `vec`, ~130s for reranked hybrid), vs **~0.3s for keyword (lex)**. Default to lex. Only escalate to semantic search after asking (see step 3).

Steps:

1. **Lex-first.** Call `mcp__qmd__query` with `searches: [{type: "lex", query: "$ARGUMENTS"}]`, `rerank: false`, `limit: 10`. This is the sub-second path. Fallback if MCP is unavailable: `qmd query 'lex: $ARGUMENTS' --no-rerank --json -n 10`.
2. If the result is empty or errors with "no collections", run `mcp__qmd__status` once to explain why — the user likely hasn't indexed anything yet. Suggest:
   ```
   qmd collection add <dir> --name <name>
   qmd embed
   ```
3. **Escalate to semantic only on demand.** If lex returns weak/no hits AND the query is conceptual (not a known keyword), do **not** silently launch a slow search — **ask the user first**: "Keyword search returned no good matches. Should I run a semantic search? Without a GPU this may take ~1 minute." Only run `vec`/`rerank: true` after they confirm.
4. Summarize the top hits as `path:line — brief snippet` (clickable in the terminal). Include the score only if it helps rank ambiguous results.
5. Do **not** re-search for content you already located. If the user needs the full document, use `mcp__qmd__get` or `qmd get <path> --full`.

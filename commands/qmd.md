---
description: Hybrid local search over indexed markdown notes/docs via qmd (query + rerank)
argument-hint: <what to find in your notes>
allowed-tools: mcp__qmd__query, mcp__qmd__status, Bash(qmd:*)
---

Search the user's local qmd-indexed collections for: **$ARGUMENTS**

Steps:

1. Call `mcp__qmd__query` with the argument text (top 10, JSON). If the MCP tool is unavailable, fall back to `qmd query "$ARGUMENTS" --json -n 10`.
2. If the result is empty or errors out with "no collections", run `mcp__qmd__status` (or `qmd status`) once to explain why — the user likely hasn't indexed anything yet. Suggest:
   ```
   qmd collection add <dir> --name <name>
   qmd embed
   ```
3. Otherwise summarize the top hits as `path:line — brief snippet` (clickable in the terminal). Include the score only if it helps rank ambiguous results.
4. Do **not** re-search for content you already located. If the user needs the full document, use `mcp__qmd__get` or `qmd get <path> --full`.

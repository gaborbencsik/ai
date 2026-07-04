---
name: semble-search
description: Semantic code search via the semble MCP against the current working directory (or any local/remote repo). Use when you need to locate code by intent/behavior, find an implementation, understand how something works, or discover related code — anywhere you would otherwise fan out with Grep/Glob/Read for exploration. Triggers: "find in code", "where is", "where does", "show me where", "how does X work", "which file handles", "locate implementation", "related code", "similar code", "find similar implementation", "search the codebase". DO NOT use for: editing a specific known file (Edit), exact string search in a known file (Grep), reading README/CLAUDE.md (Read), web search (WebSearch/searchx).
---

# semble-search

Semantic, index-based code search via the `semble` MCP server. A single focused query returns the file and exact line — no follow-up Grep needed for the same content.

## When it beats Grep/Glob/Read

- **Behavior-based search:** "where does the price fetch happen?" — you don't know the function name
- **Fan-out exploration:** multiple possible names, multiple files
- **"Related code" discovery:** interface implementations, callers, similar patterns
- **Unknown codebase:** you don't yet know how it's structured

**DO NOT use** when:
- You already know exactly which file to look at → `Read`
- Exact string match in a known scope → `Grep`
- Filename pattern search → `Glob`
- Editing is needed → `Edit`

## How to invoke

Delegate to the `/semble` slash command — it calls the `semble-search` agent against the current working directory. If the user's prompt already contains a good search query, pass it through directly:

```
/semble <the user's search intent, tersely>
```

If the user's prompt isn't focused enough for semantic search, first rephrase it into a code-behavior/name query (e.g. "where do we authenticate" → `"user authentication logic"`), then hand it to `/semble`.

## Cross-repo search

`/semble` resolves the repo from `pwd` at invocation time, so it works in any project this skill is copied into — no editing required. If the user wants to search a **different** repo than the current one (a sibling checkout, a remote GitHub URL, etc.), do **not** use `/semble`; invoke the `semble-search` agent directly with the explicit repo path or `https://` URL.

## Output handling

The agent returns file paths and line numbers. Two options:
1. **Sufficient answer:** summarize back to the user (`file_path:line` format, clickable).
2. **Follow-up needed:** navigate directly with `Read` to the given line — do NOT grep for the same string again.

## Portability

This skill + the `/semble` command are self-contained. To reuse in another project, copy both:

```
.claude/skills/semble-search/SKILL.md
.claude/commands/semble.md
```

No path edits needed — `pwd` handles the repo resolution.

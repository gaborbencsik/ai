---
name: subagent-tab
description: Start the given task as an OMP subagent in a new background Herdr tab. Use when the user invokes /subagent-tab or asks to delegate a task to a new Herdr tab.
---

# Subagent tab

Start the user's given task in exactly one new background Herdr tab through the installed Herdr extension.

## Dependency

This skill requires the Herdr extension tool `herdr_spawn`. Never reproduce its behavior with shell commands. If `herdr_spawn` is unavailable, state that the Herdr extension dependency is not loaded and that OMP must be restarted after installing or enabling it.

## Procedure

1. Treat the text supplied with `/subagent-tab` as the complete delegated task. Preserve its meaning and include all constraints needed by an agent that has no conversation history. If the task depends on relevant context from the current conversation, include that context in the prompt.
2. Choose a short thematic agent name matching `[a-z][a-z0-9_-]{0,31}`.
3. Call `herdr_spawn` exactly once with that `name` and the complete `task`.
4. Report the returned agent name, workspace ID, tab ID, pane ID, working directory, and prompt-delivery state.

## Safety

- The new agent shares the current checkout. Delegate read-only research, review, analysis, or log inspection by default.
- Do not delegate concurrent write-capable work in the same checkout unless the user explicitly accepts that risk or provides an isolated worktree.
- Do not focus the new tab unless the user explicitly asks.
- Do not retry `name_conflict` automatically. Ask for or choose a different meaningful name only in a separate invocation.
- Never retry `prompt_delivery_unknown`; the task may already be running. Report the extension's inspection result.
- Never close, stop, replace, or clean up the spawned agent or its Herdr resources automatically.

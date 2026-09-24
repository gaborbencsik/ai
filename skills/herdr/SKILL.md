---
name: herdr
description: Start and inspect OMP agents in background Herdr tabs. Use only when the user explicitly asks to use Herdr to run a prompt in a new tab, inspect Herdr agents, read an agent result, or focus an agent.
---

# Herdr agent management

Use the globally installed OMP extension tools as the only execution path inside OMP:

- `herdr_spawn`
- `herdr_status`
- `herdr_read`
- `herdr_focus`

Do not reconstruct the underlying `herdr tab create`, `agent start`, or `agent prompt` sequence with shell commands. The extension enforces validation, JSON parsing, mutation ordering, partial-failure reporting, and inspect-before-retry behavior through a shared deterministic implementation.

If these tools are unavailable, explain that the global Herdr extension was installed after the current OMP session started and a new OMP session is required. Do not use bash as a fallback.

## Spawn one background agent

For an explicit request such as “run this prompt in a new Herdr tab”:

1. Choose a short thematic name matching `[a-z][a-z0-9_-]{0,31}`.
2. Call `herdr_spawn` once with:
   - `name`: the thematic name;
   - `task`: the complete prompt, unchanged in meaning.
3. Report the structured result: agent name, workspace ID, tab ID, pane ID, cwd, and prompt delivery state.
4. Do not retry `name_conflict` automatically with guessed suffixes; choose a new meaningful name only in a separate tool call.
5. Never retry `prompt_delivery_unknown`. Report its inspection result because the prompt may already be running.

The extension always starts kind `omp`, preserves the current cwd/workspace, creates a new tab with `--no-focus`, and submits the prompt at most once per call.

Use the same checkout only for read-only research, review, or log analysis. Refuse parallel write-capable delegation until an explicit worktree workflow is implemented.

## Inspect agents

Use `herdr_status` without a target to list agents, or with a unique live name/pane ID to inspect one. Treat `unknown` as unclassified, never as successful completion.

## Read output

Use `herdr_read` with a unique live name/pane ID. Default to `recent-unwrapped` and 120 lines. Use `visible` when the agent is active and recent history is unavailable. Do not invent missing output or add a temporary-file fallback.

## Focus an agent

Use `herdr_focus` only when the user explicitly asks to switch to an agent. It changes the visible Herdr tab.

## Safety

- Never automatically answer or approve a blocked agent UI.
- Never close, stop, replace, or clean up tabs, panes, agents, workspaces, or sessions.
- Do not create worktrees, remote workspaces, extra agents, watchers, plugins, or notification routing.
- Do not restart, upgrade, or directly access the Herdr server/socket.

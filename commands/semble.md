---
description: Semantic code search via the semble-search agent (current repo)
argument-hint: <what to search for>
allowed-tools: Agent, Bash(pwd)
---

Invoke the `semble-search` agent with the following query:

**Repo:** !`pwd`
**Query:** $ARGUMENTS

Use the Agent tool with `subagent_type: "semble-search"`. Pass the repo path (from the `pwd` output above) and the query above in the prompt. Return the agent's results (file paths + line numbers + brief context) concisely to the user.

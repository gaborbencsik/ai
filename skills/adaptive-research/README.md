# Adaptive Research for Pi 1.3

An evidence-led [Agent Skill](https://agentskills.io/) for research tasks. It adapts its depth to `quick`, `standard`, `deep`, or `ultradeep`, tracks claims against evidence, surfaces contradictions, and refuses to pretend that retrieval occurred.

## Install

Pi recursively discovers directories containing `SKILL.md`. Link this canonical directory into the personal skill location:

```bash
mkdir -p ~/.pi/agent/skills
ln -s /absolute/path/to/adaptive-research ~/.pi/agent/skills/adaptive-research
```

Restart Pi or run `/reload`, then invoke:

```text
/skill:adaptive-research in standard: current state of quantum computing
/skill:adaptive-research deep: compare PostgreSQL and Supabase for production
/skill:adaptive-research supply-chain resilience after COVID-19
```

A plain topic defaults to `standard`. Source counts are conditional targets, not guarantees. Without a retrieval tool or supplied evidence, the skill produces an explicitly capability-limited brief rather than a purported completed research report.

The skill adds no retrieval provider, background agent, cache, or validation tool. Install and review an appropriate search or retrieval integration separately when current external evidence is required.

## Validate

```bash
pi --no-session --no-tools --skill ./SKILL.md --print \
  "/skill:adaptive-research in quick: <topic>"
```

This command requires a configured model provider. Loading the skill does not create retrieval capability; available tools and evidence determine whether Pi can complete research or must return a capability-limited brief.

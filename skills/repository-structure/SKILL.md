---
name: repository-structure
description: Defines a repository layout convention that flows raw material into specifications and then into generated application state. Use whenever adding, moving, processing, or generating raw materials, specifications, or application code.
---

# Repository structure

Layout convention for a repository that turns raw material into specifications
and then into generated application state. One direction of flow:
`raw/` → `Apps/<app>/specs/` → `Apps/<app>/generated/`.

- `raw/<user>/`: User-scoped raw material for later processing. Contents are otherwise unstructured; any file type or layout is allowed.
- `Apps/<app>/`: One application per directory; use a separate directory for each application.
  - `specs/`: The authoritative specification for that application.
  - `generated/`: Its latest generated state, produced from the sibling `specs/`.

Directory names are a convention, not a fixed schema; keep the flow one-way and
keep `generated/` derived from its sibling `specs/`.

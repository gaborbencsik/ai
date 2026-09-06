---
name: repository-structure
description: Defines the omnichannel-content repository layout. Use whenever adding, moving, processing, or generating raw materials, specifications, or application code.
---

# Repository structure

- `raw/<user>/`: User-scoped raw material for later processing. Contents are otherwise unstructured; any file type or layout is allowed.
- `Apps/<app>/`: One omnichannel content application; use a separate directory for each application.
  - `specs/`: The authoritative specification for that application.
  - `generated/`: Its latest generated state, produced from the sibling `specs/`.

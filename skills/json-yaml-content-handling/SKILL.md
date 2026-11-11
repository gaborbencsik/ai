---
name: json-yaml-content-handling
description: Use when reading, creating, validating, or modifying JSON or YAML content, especially when choosing between read, edit, write, jq, yq, check-jsonschema, CUE, and Kubernetes overlays.
---

# JSON and YAML content handling

Treat JSON and YAML as structured data. Preserve their schema, value types, local formatting conventions, and unrelated content. Decide first whether the task requires semantic preservation, comment/style preservation, a minimal diff, or byte-exact preservation of unrelated text.

## Choose the smallest safe installed tool

| Need | Tool | Guidance |
|---|---|---|
| Inspect existing JSON or YAML | `read` | Read the relevant file before changing it. |
| Make a small, exact, unambiguous change | `edit` | Prefer for minimal diffs and formatting preservation. |
| Apply a structural or conditional JSON transformation | `jq` | Use for arrays, merges, dynamic paths, and multi-field changes. Preview first. |
| Apply a structural YAML transformation | `yq` | Use for semantic edits, arrays, merges, multiple fields, or multiple documents. Preview first. |
| Modify JSON in place or use one expression across JSON and YAML | `yq` | Make JSON formats explicit with `-p=json -o=json -I=2`. |
| Validate JSON or YAML against JSON Schema | `check-jsonschema` | Use the repository-owned schema and keep schema validation separate from parse checking. |
| Validate JSON or YAML against an existing CUE schema | `cue vet` | Use only when the repository already defines the applicable CUE constraints. |
| Build or validate Kubernetes overlays | `kubectl kustomize` | Use only for Kubernetes resources with an existing `kustomization.yaml`. |
| Create a new file or intentionally replace the complete document | `write` | Do not use for a small change to an existing file. |

PyYAML is installed as a Python library, but it is not a formatting-preserving editor. Do not introduce an ad hoc PyYAML load-modify-dump script when `edit` or `yq` can perform the change safely.

## Workflow

1. Read the input and identify its schema, value types, formatting, and validation mechanism.
2. For YAML, inspect anchors, aliases, merge keys, comments, tags, block scalars, and multi-document separators before choosing a structural editor.
3. Choose the least invasive tool from the table.
4. Preview structural transformations before applying them.
5. Preserve types: do not accidentally turn numbers, booleans, arrays, objects, or `null` into strings.
6. Validate syntax and run the repository-specific schema or policy validator when one exists.
7. Inspect the final diff and confirm that only intended semantic and presentation changes occurred.

## JSON patterns

Use `jq` variables rather than interpolating untrusted values into expressions:

```bash
jq --arg name "$NAME" '.name = $name' file.json
jq --argjson replicas 3 '.replicas = $replicas' file.json
```

Validate syntax and, when useful, the root type:

```bash
jq -e 'true' file.json >/dev/null
jq -e 'type == "object"' file.json >/dev/null
```

`jq` has no in-place mode. Write output to a temporary file, validate it, and only then replace the original. Preserve required permissions and ownership, and do not replace a symlink with a regular file.

Never redirect `jq` output directly back to its input: `jq '...' file.json > file.json` can truncate the file before `jq` reads it.

## YAML patterns

Preview an edit without changing the file:

```bash
yq '.service.port = 8080' file.yaml
```

Apply only after reviewing the preview:

```bash
yq -i '.service.port = 8080' file.yaml
```

Pass strings through `strenv` and typed scalar values through `env`:

```bash
NAME="$NAME" yq '.name = strenv(NAME)' file.yaml
REPLICAS=3 yq '.replicas = env(REPLICAS)' file.yaml
```

Parse-check YAML without treating a valid `false` or `null` root as failure:

```bash
yq -p=yaml '.' file.yaml >/dev/null
```

For explicit JSON input and output through `yq`:

```bash
yq -i -p=json -o=json -I=2 '.service.port = 8080' file.json
```

### YAML preservation boundary

`yq` can retain and manipulate comments, but parsing and emitting YAML is not byte-exact round-tripping. It may change whitespace or presentation. Prefer `edit` when a precise textual replacement is unambiguous and a minimal diff matters.

Anchors, aliases, and `<<:` merge keys require special care. Updating a path whose value comes from an alias or merge can modify the anchor source and therefore affect other nodes. Preview and inspect the full diff; do not assume the change is local to the selected path.

Do not use ordinary text replacement for structure-sensitive YAML changes involving indentation, block scalars, anchors, aliases, tags, or multiple matching keys unless the exact match is proven unique and safe.

## Installed validators and domain tools

Validate JSON or YAML against a repository-owned JSON Schema:

```bash
check-jsonschema --schemafile schema.json file.json
check-jsonschema --schemafile schema.json file.yaml
```

Prefer an existing repository validation command when it wraps `check-jsonschema` with the correct schema, flags, and related integrity checks. Syntax validity alone does not establish schema conformance.

Use CUE only with an applicable schema already owned by the repository:

```bash
cue vet schema.cue file.yaml
cue vet schema.cue file.json
```

For Kubernetes overlays, inspect generated output before applying it:

```bash
kubectl kustomize path/to/overlay
```

`kubectl kustomize` is Kubernetes-specific and generates a semantic result; it is not a general YAML editor and does not promise presentation preservation.

## Avoid

- Do not use `write` when `edit` can produce a precise, minimal change.
- Do not use `jq` or `yq` for a tiny textual change when reserialization would create a noisy diff.
- Do not sort keys, reformat the whole document, expand aliases, or change scalar types unless required.
- Do not treat parseable JSON or YAML as schema-valid.
- Do not treat a linter, schema validator, formatter, and structural editor as interchangeable.
- Do not install or introduce another tool when the installed tools safely cover the task.

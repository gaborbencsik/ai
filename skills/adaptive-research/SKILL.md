---
name: adaptive-research
description: Evidence-led research workflow for quick, standard, deep, or ultradeep investigations. Use for questions that require retrieval, source tracking, contradiction analysis, or an explicit capability-limited brief when retrieval is unavailable.
---

# Adaptive Research

Conduct research without implying access, retrieval, validation, or certainty that did not occur.

## Parse the request

Accept either `in <mode>: <topic>`, `<mode>: <topic>`, or a plain topic. Modes are `quick`, `standard`, `deep`, and `ultradeep`; a plain topic uses `standard`. Reject an empty topic or an explicit unknown/malformed mode and ask for a corrected request.

Treat the modes as effort profiles, not promises:

| Mode | Workflow | Conditional source target |
|---|---|---|
| quick | scope, retrieve, summarize | 3 credible sources |
| standard | scope, plan, retrieve, triangulate, synthesize | 10 sources; 3 per major claim |
| deep | standard plus contradiction search and critique | 15 sources; 3 per major claim |
| ultradeep | deep with broader retrieval and adversarial review | 20 sources; 4 per major claim when practical |

Source counts are targets only when suitable retrieval is available. Never pad a bibliography or claim that a target was met when it was not.

## Establish capabilities first

Before planning the evidence base, inspect the tools and materials actually available in this session.

Classify available evidence channels:

1. **Retrieved evidence**: content actually returned by a web, database, or document retrieval tool during this task.
2. **User-supplied evidence**: files, quotations, URLs with supplied content, or data provided by the user.
3. **Local evidence**: repository or filesystem content actually read during this task.
4. **Background knowledge**: model knowledge not verified during this task.
5. **Unknown**: anything not supported by one of the first three categories and not safe to state merely as general background.

A URL mentioned without fetching its content is not retrieved evidence. Search-result snippets are snippets, not proof of the full source. Do not say that a source was read, checked, current, peer-reviewed, or independently confirmed unless the available evidence establishes that.

If there is no retrieval tool and the user supplied no adequate evidence, do not claim to have completed current or source-validated research. Return the capability-limited brief described below.

## Workflow

### 1. Scope

Restate the question, timeframe, geography/domain, decision context, assumptions, and exclusions. Ask a focused clarification only when the ambiguity would materially change the research.

### 2. Plan

Break the topic into answerable subquestions. For standard and deeper modes, include searches for primary sources, recent developments, implementation evidence, criticism, and alternatives where relevant. Prefer primary and authoritative sources over summaries.

### 3. Retrieve

Use only available retrieval mechanisms. Read enough of each source to support the claim attributed to it. Record the precise URL or local path and a short supporting excerpt or faithful paraphrase. Never invent metadata, excerpts, DOIs, dates, or URLs.

Parallelize independent retrieval only when the runtime genuinely supports it. Do not promise agents, providers, retries, or concurrency that are unavailable.

### 4. Maintain an evidence ledger

Keep a working ledger for material claims:

| Claim | Evidence category | Source/path | Supporting excerpt or observation | Supports / contradicts / contextualizes | Limits |
|---|---|---|---|---|---|

Merge duplicate sources. Record disagreements rather than averaging them away. A claim is triangulated only when multiple genuinely independent sources support it; syndicated copies and sources citing the same original are not independent.

### 5. Analyze and triangulate

For each major claim:

- separate direct evidence from inference;
- assess source authority, recency, methodology, conflicts of interest, and relevance;
- look for counter-evidence and plausible alternative explanations;
- state whether evidence is strong, mixed, weak, or absent;
- lower confidence when source targets or independence requirements are not met.

Do not use lexical overlap as a substitute for validation.

### 6. Critique deep modes

For `deep` and `ultradeep`, review the draft from three perspectives:

- **Skeptical practitioner**: unsupported assumptions, weak or impractical conclusions.
- **Adversarial reviewer**: counterexamples, contradictory evidence, selection bias.
- **Implementation reviewer**: operational constraints, failure modes, applicability.

Retrieve additional evidence only if a real retrieval channel exists. Otherwise preserve the gap explicitly. In `ultradeep`, repeat critique once when it materially changes conclusions.

### 7. Synthesize

Use prose for the main analysis, with tables or bullets only where they improve clarity. Match depth to the mode and evidence actually obtained. Clearly label:

- retrieved findings;
- findings from user-supplied or local evidence;
- unverified background context;
- inferences;
- contradictions and unresolved questions.

Citations must point to the source or path actually used. Provide a bibliography of only those sources. Do not convert background knowledge into a fabricated citation.

## Output

When evidence is adequate, produce:

1. **Scope and method** — mode, boundaries, capabilities used, and material limitations.
2. **Executive summary** — conclusions with calibrated confidence.
3. **Findings** — claim-centered narrative with inline citations.
4. **Contradictions and gaps** — conflicting evidence and unknowns.
5. **Evidence ledger** — compact claim/source mapping.
6. **Sources** — titles or file labels, exact URLs/paths, and evidence category.

## Capability-limited research brief

When retrieval is unavailable or evidence is insufficient, title the response **Capability-limited research brief** and include:

- what evidence was and was not available;
- a provisional answer using clearly labeled background knowledge only when useful;
- no claim of freshness, source validation, triangulation, or completion;
- key unknowns and claims requiring verification;
- a concrete retrieval plan with suggested queries and preferred source types;
- a request for sources/files or for access to an appropriate retrieval tool.

Never manufacture a completed report to satisfy the requested mode.

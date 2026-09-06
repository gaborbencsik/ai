---
name: research-prompt
description: >
  Generate a compact, structured deep-research prompt ready to feed into the
  `deep-research` skill. Grounds the prompt in local project context (executive
  summaries, meeting notes, existing research docs) and enforces scope
  discipline (high-level landscape vs. implementation study). Trigger on
  "write a research prompt", "draft a deep-research prompt", "prepare a
  research brief", "kutatási prompt", or when the user needs a runnable prompt
  rather than the research itself.
  Do NOT trigger to actually run research — hand off to `deep-research`.
---

# Research Prompt Builder

Produces a single, self-contained prompt intended to be pasted into
`/research in <depth>: …` (see the `deep-research` skill). The skill's job is
**only to write the prompt** — never to run searches, never to synthesize a
report.

## When to Use

| Situation | Use this skill? |
|---|---|
| User asks for a research **prompt / brief / question set** | ✅ yes |
| User asks to **run** the research | ❌ hand off to `deep-research` |
| One-shot factual lookup | ❌ use `searchx` directly |
| Framing a high-stakes decision study before executing it | ✅ yes |

## Inputs the Skill MUST Extract

Before drafting, resolve:

1. **Topic** — the actual question, in one sentence.
2. **Existing context** — search the workspace for `EXECUTIVE_SUMMARY*`,
   `README*`, `*_research*`, `*_notes*`, `*.vtt`, `research_questions*`,
   `content_management_*`, or any file the user names. Read those before
   writing. Ground context in these files; never invent baseline facts.
3. **Scope register** — one of:
   - `landscape` (default) — high-level paradigm study, no implementation
     designs, no vendor "pick X" verdicts, no timelines/effort/tasks.
   - `implementation` — concrete engineering guidance is welcome.
   - `mixed` — landscape first, then a directional roadmap sketch (still no
     tasks/effort/dates).
4. **Depth** — `quick` | `standard` | `deep` | `ultradeep`. Default `deep`
   for strategic decisions, `ultradeep` when the user says "comprehensive",
   "exhaustive", or the topic spans ≥5 sub-domains.
5. **Output language** — default English. Only override on explicit user
   request.
6. **Length budget** — default ≤35 lines of prompt body. `--long` relaxes
   to 60. `--full` produces the expanded form (§ Full Form below).

Do NOT ask the user for anything answerable by reading files. Ask only when
scope register or depth is genuinely ambiguous AND materially changes the
prompt.

## Prompt Structure (fixed order)

1. **Header** — `/research in <depth>:` then a one-line H1 title.
2. **Scope discipline** — 2–4 lines. Landscape studies get an explicit
   ⚠️ block: no implementation plans, no code/schemas/API contracts, no
   sprint plans, no effort/timeline, no "pick vendor X". Implementation
   register replaces this with a "deliverables include design guidance"
   line.
3. **Context** — cite the local file(s) read (by name, not by pasted
   content); summarize the baseline in ≤6 lines: current state, goal,
   current recommendation, key constraints, guiding principles.
4. **Primary question** — one sentence, answerable at paradigm level.
5. **Sub-questions** — group **A–G** (or fewer if scope is narrow), each
   group 1–3 lines of dense enumeration, not a checklist. Cover:
   - A. Paradigm map, reference architectures, orchestration frameworks
   - B. Domain-specific data / content / state model implications
   - C. External surface / interfaces / adaptation
   - D. Workflow / human-in-the-loop / adoption
   - E. Guardrails, evaluation, economics (cost + p95 latency)
   - F. Integration with adjacent systems
   - G. Named 2024–2026 successes AND failures/rollbacks
6. **Sources** — required floor (`≥20` for ultradeep, `≥15` deep, `≥10`
   standard, `≥5` quick), 3–4+ independent per major claim, preferred
   source types (vendor **engineering** blogs, conference talks, arXiv,
   official docs/specs, analyst reports read critically). Mandatory
   credibility scoring and triangulation.
7. **Critique personas** — 3–5 named lenses relevant to the domain. Always
   include a Skeptical Practitioner, an Adversarial Reviewer (compliance or
   equivalent risk lens), and a CFO/economics lens.
8. **Deliverable** — Executive Summary word band, Findings word band and
   prose ratio, decision matrix (qualitative), directional guidance,
   open questions, full bibliography with credibility tags.
9. **Loop-back triggers** — 2–4 concrete gaps that, if missing after
   critique, force a delta-retrieval pass.

## Composition Rules

- **Terse and dense.** Every bullet fact-bearing, no filler, no
  reassurance, no meta-narration. Fragments allowed where clearer.
- **Named vendors/frameworks explicit.** Do not write "leading CMS
  vendors"; name them (Contentful, Sanity, Storyblok, Contentstack,
  Sitecore, Adobe, Optimizely, Hygraph) — same for frameworks and
  eval tooling.
- **Numbers stay numbers.** If the baseline document contains concrete
  limits/thresholds (character limits, latency budgets, engagement
  rates), forward them verbatim into the Context block.
- **Language is English by default.** Terminology stays English even
  if the user asked in another language.
- **No emoji outside** the fixed markers permitted below.
- **Permitted markers only:** `🎯` (goal), `⚠️` (scope guard), `📌`
  (context), `🔬` (primary question), `🧭` (sub-questions), `🚫`
  (out-of-scope), `📚` (sources), `🧑‍⚖️` (critique personas),
  `📄` (deliverable), `🔁` (loop-back). Prefer plain headings when
  the target format is unstyled.

## Compact Form (default, ≤35 lines)

Merge sub-questions into a single labeled block (A) …; B) …; C) …).
Collapse Sources, Critique personas, and Deliverable to 3–5 lines each.
Wrap the entire body in a fenced code block starting with
` ```` /research in <depth>: ` so the user can copy-paste as-is.

## Full Form (`--full`)

Expanded prompt with:
- Numbered sub-questions inside each A–G group.
- Explicit "Explicit out-of-scope" block.
- Per-section word bands in the Deliverable.
- Named loop-back triggers with the exact evidence gap.

Use only when the user asks or the topic clearly warrants it (≥6
sub-domains, cross-industry synthesis, adversarial-review requirement).

## Output Contract

The skill's response is **the prompt itself**, nothing else. No preamble
("Here is the prompt…"), no postscript ("Let me know if…"), no
explanation of choices unless the user explicitly asked "why".

Exception: if scope register or depth was genuinely ambiguous and the
skill had to pick, append one line after the code block:
`Assumed: <register>, depth=<depth>. Override with: …`

## Handoff to `deep-research`

The prompt MUST be directly runnable — start with the exact literal
`/research in <depth>:` invocation. The `deep-research` skill enforces
English output, source floors, and triangulation; do not re-litigate
those rules inside the prompt, only reference them.

## Anti-patterns

- Padding the prompt with restating the user's question in five ways.
- Vague sub-questions ("explore the ecosystem") instead of named
  vendors, frameworks, protocols, and metrics.
- Embedding implementation prescriptions inside a landscape-register
  prompt.
- Asking the user for information a `read`/`grep` on the workspace
  would answer.
- Producing anything other than the prompt itself in the final
  response (except the single "Assumed:" line when required).
- Executing the research. This skill only drafts.

## Templates

- [templates/compact.md](templates/compact.md) — the ≤35-line default.
- [templates/full.md](templates/full.md) — expanded form.

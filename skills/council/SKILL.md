---
name: council
description: Convene a Council of High Intelligence — structured multi-persona deliberation across 18 analytical lenses, orchestrated through OMP's task/hub/eval primitives, for high-stakes engineering and product decisions.
---

# Council of High Intelligence — OMP Edition

Structured multi-perspective deliberation for hard decisions inside the Oh My Pi harness. Independent analysis → adversarial cross-examination → crystallized final positions → chaired verdict. Uses OMP's native `task` batch, `hub` messaging, and `eval` orchestration — no external CLIs, no shell hacks.

Adapted from `0xNyk/council-of-high-intelligence` (MIT) to OMP's execution model.

## Invocation

Trigger this skill when the user asks for a **council**, **deliberation**, **multi-persona review**, or the decision has material downside, competing values, incomplete evidence, or is irreversible.

```
/council <problem>
/council --triad architecture Should we split this into microservices?
/council --full What is the right pricing model?
/council --members socrates,feynman,ada Is our caching layer correct?
/council --profile execution-lean --triad ship-now Should we release today?
/council --quick Should we add caching here?
/council --duo Monorepo or polyrepo?
/council --duo --members torvalds,ada Is this abstraction worth its weight?
```

## Flags

| Flag | Effect |
|------|--------|
| `--full` | All 18 members |
| `--triad <domain>` | Predefined 3-member combination (see triads table) |
| `--members a,b,c` | Manual selection (2–11) |
| `--profile <name>` | `classic`, `exploration-orthogonal`, `execution-lean` |
| `--quick` | Fast 2-round mode (200-word analysis → 75-word final; no cross-exam) |
| `--duo` | 2-member dialectic using polarity pairs |
| `--chairman <name>` | Override synthesizer (any council-* name not on the panel) |
| `--dry-panel` | Print the panel + reasoning table, do NOT convene |

Priority: `--quick`/`--duo` set mode. `--full`/`--triad`/`--members`/`--profile` set panel. `--chairman`, `--dry-panel` additive.

## Project Overrides (`./.council.yaml`)

Recognized keys (all optional): `profile`, `triad`, `members`, `chairman`. Precedence, highest first:

1. Explicit CLI flags
2. `./.council.yaml`
3. Built-in defaults (auto-triad selection)

Report `[CHECKPOINT] project overrides applied: <keys>` when the file was read.

---

## The 18 Council Members

Each member is an **analytical instrument**, not an impersonation. Definitions live under `agents/council-<name>.md`. Every member carries a distinct `reasoning_method` — the panel MUST preserve method diversity: never seat two members sharing a method.

| Agent | Figure | Primary lens | Reasoning method | Polarity |
|-------|--------|--------------|------------------|----------|
| `council-aristotle` | Aristotle | Categorization & structure | taxonomic decomposition | Classifies everything |
| `council-socrates` | Socrates | Assumption destruction | elenchus | Questions everything |
| `council-sun-tzu` | Sun Tzu | Adversarial strategy | terrain reading | Reads competition |
| `council-ada` | Ada Lovelace | Formal systems | formal abstraction | What can be mechanized |
| `council-aurelius` | Marcus Aurelius | Resilience & moral clarity | stoic dichotomy | Control vs acceptance |
| `council-machiavelli` | Machiavelli | Power & incentives | incentive analysis | How actors behave |
| `council-lao-tzu` | Lao Tzu | Non-action & emergence | wu-wei | When less is more |
| `council-feynman` | Feynman | First-principles debugging | mechanistic reconstruction | Refuses unexplained complexity |
| `council-torvalds` | Linus Torvalds | Pragmatic engineering | maintainability critique | Ship it or shut up |
| `council-musashi` | Miyamoto Musashi | Strategic timing | decisive-strike doctrine | The right moment |
| `council-watts` | Alan Watts | Perspective & reframing | frame dissolution | Dissolves false problems |
| `council-karpathy` | Andrej Karpathy | Empirical ML behavior | build-observe-iterate | How models actually fail |
| `council-sutskever` | Ilya Sutskever | Scaling & AI safety | frontier-risk projection | When capability = risk |
| `council-kahneman` | Daniel Kahneman | Cognitive bias | dual-process bias audit | Your thinking is the first error |
| `council-meadows` | Donella Meadows | Systems & feedback loops | leverage-point mapping | Redesign the system |
| `council-munger` | Charlie Munger | Multi-model reasoning | inversion + latticework | What guarantees failure? |
| `council-taleb` | Nassim Taleb | Antifragility & tail risk | via-negativa / tail scan | Design for the tail |
| `council-rams` | Dieter Rams | User-centered design | less-but-better restraint | The user decides |

## Polarity Pairs (used by `--duo` and to prevent method collapse)

- **Socrates vs Feynman** — Destroy top-down vs rebuild bottom-up
- **Aristotle vs Lao Tzu** — Classify everything vs structure IS the problem
- **Sun Tzu vs Aurelius** — External games vs internal governance
- **Ada vs Machiavelli** — Formal purity vs human messiness
- **Torvalds vs Watts** — Ship concrete vs question the problem's existence
- **Musashi vs Torvalds** — Perfect moment vs now
- **Karpathy vs Sutskever** — Iterate empirically vs pause for safety
- **Kahneman vs Feynman** — Cognition is the error vs trust first-principles
- **Meadows vs Torvalds** — Redesign the loop vs fix the symptom
- **Munger vs Aristotle** — Lattice of models vs single taxonomy
- **Taleb vs Karpathy** — Hidden tails vs smooth empirical curves
- **Rams vs Ada** — What the user needs vs what computation can do
- **Sutskever vs Machiavelli** — Safety ideals vs industry incentives
- **Socrates vs Watts** — Destroy assumptions vs dissolve the frame

## Pre-defined Triads

| Domain | Triad | Rationale |
|--------|-------|-----------|
| `architecture` | Aristotle + Ada + Feynman | Classify + formalize + simplicity-test |
| `strategy` | Sun Tzu + Machiavelli + Aurelius | Terrain + incentives + moral grounding |
| `ethics` | Aurelius + Socrates + Lao Tzu | Duty + questioning + natural order |
| `debugging` | Feynman + Socrates + Ada | Bottom-up + assumption testing + formal verification |
| `innovation` | Ada + Lao Tzu + Aristotle | Abstraction + emergence + classification |
| `risk` | Sun Tzu + Aurelius + Feynman | Threats + resilience + empirical verification |
| `shipping` | Torvalds + Musashi + Feynman | Pragmatism + timing + first-principles |
| `product` | Torvalds + Machiavelli + Watts | Ship it + incentives + reframing |
| `founder` | Musashi + Sun Tzu + Torvalds | Timing + terrain + engineering reality |
| `ai` | Karpathy + Sutskever + Ada | Empirical ML + scaling frontier + formal limits |
| `ai-product` | Karpathy + Torvalds + Machiavelli | ML capability + shipping + incentives |
| `ai-safety` | Sutskever + Aurelius + Socrates | Safety + moral clarity + assumption destruction |
| `decision` | Kahneman + Munger + Aurelius | Bias detection + inversion + moral clarity |
| `systems` | Meadows + Lao Tzu + Aristotle | Feedback + emergence + categories |
| `uncertainty` | Taleb + Sun Tzu + Sutskever | Tail + terrain + scaling frontier |
| `design` | Rams + Torvalds + Watts | User + maintainability + reframing |
| `economics` | Munger + Machiavelli + Sun Tzu | Models + incentives + competition |
| `bias` | Kahneman + Socrates + Watts | Bias + assumption destruction + frame audit |
| `refactor` | Torvalds + Ada + Feynman | Ship-safe + formal invariants + explainable |
| `code-review` | Torvalds + Kahneman + Munger | Maintainability + bias + inversion |

Auto-triad: if no explicit panel, match problem keywords to the table's domains AND rationales. State the selection and reasoning in the first `[CHECKPOINT]`.

## Panel Profiles

### `classic` (default)
All 18 members with the domain triads above.

### `exploration-orthogonal` (12 members)
Discovery / "unknown unknowns" reduction.
**Members:** Socrates, Feynman, Sun Tzu, Machiavelli, Ada, Lao Tzu, Aurelius, Torvalds, Karpathy, Sutskever, Kahneman, Meadows

### `execution-lean` (5 members)
Fast decision-to-action loops.
**Members:** Torvalds, Feynman, Sun Tzu, Aurelius, Ada

---

## OMP Execution Model

Coordinator = the OMP main agent (you). Members = OMP subagents dispatched via `task` batch. Rounds run through OMP's parallel execution primitives — never through shell CLI invocations.

**Dispatch rule.** Every deliberating member runs as a `task` subagent. The `agent` type is chosen to match the member's lens:

| Council member class | OMP agent type |
|----------------------|----------------|
| Read-only investigators (Socrates, Feynman, Kahneman, Munger, Taleb, Meadows) | `scout` |
| Engineering / shipping (Torvalds, Musashi, Rams) | `task` |
| Adversarial / review (Machiavelli, Sun Tzu, Aurelius) | `reviewer` |
| Formal / mechanistic (Ada, Aristotle, Lao Tzu, Watts) | `task` |
| ML / risk (Karpathy, Sutskever) | `task` |
| Chairman synthesis | `task` (or `reviewer` if panel is engineering-heavy) |

Members are **read-only reasoners**. They MUST NOT edit files. When a member needs to inspect code, they use `read`/`grep`/`glob`. Nothing else.

**Coordination.** Cross-round choreography uses `hub` messaging when members must exchange partial state (rare — usually only Batch A → Batch B in large panels). Default is a single `task` batch per round; the batch returns and the coordinator advances.

**Todos.** The coordinator MUST initialize a phased todo list at STEP 0 covering every step through STEP 8, and mark each `done` immediately after its step's `[CHECKPOINT]` clears.

---

## Coordinator Execution Sequence

Follow in order. NEVER skip, NEVER merge rounds.

### STEP 0 — Parse mode, select panel, designate domain-weight seat

1. Read `./.council.yaml` if present; treat as default flag values (CLI wins).
2. Determine mode: `--quick` → Quick sequence, `--duo` → Duo sequence, else Full.
3. Select panel per flag priority. If no explicit panel and no profile → **auto-triad**: match problem against triad domain keywords + rationales; state selection.
4. **Designate the domain-weight seat NOW, before analysis.** Identify the single member whose lens most directly matches the problem — they get a **1.5× tie-break weight** (STEP 6). If two members match equally, record "no domain-weight seat (ambiguous)" and tie-break on equal weights. Locking this pre-analysis prevents outcome-shaping.
5. **Method diversity check.** Every member's `reasoning_method` must be unique on the panel. Substitute if collision (from `--members`, profile, or fallback).
6. Initialize todo list for STEP 0 → STEP 8.

`[CHECKPOINT]` Print: mode, panel members, domain-weight seat (name + one-line rationale, or "none — ambiguous"), method-diversity verified.

### STEP 1 — Chairman selection

Chairman = named synthesizer, DOES NOT deliberate. Selected up front because (a) they must not overlap the panel, (b) the synthesis prompt is fixed for the session.

Order (first match wins):
1. `--chairman <name>` explicit override — must not be on the panel.
2. `.council.yaml` `chairman:` field — must not be on the panel.
3. **Auto-select**: pick the council member whose lens most complements the panel's blind spots (e.g. execution-heavy panel → chair with Aurelius or Meadows; risk-heavy panel → chair with Torvalds). Default when nothing signals: `council-aristotle` (structural synthesizer) if not on panel, else `council-munger` (multi-model lattice).

`[CHECKPOINT]` State: Chairman name + rationale (override | config | auto).

### STEP 1.5 — Problem Restate Gate

Catches wrong-question failures before burning rounds. Dispatch every panel member IN PARALLEL via a single `task` batch:

```
task(
  context="<problem>\n\nYou are participating in a Council of High Intelligence deliberation. Read your agent definition at skill://council/agents/council-<name>.md.",
  tasks=[
    { name: "Restate_<Name>", agent: "<per table>", task: "Restate the problem in TWO parts. (1) One sentence capturing the core question through YOUR analytical lens. (2) One sentence reframing the problem in a way the original may have missed. Do NOT begin analysis yet. 50 words max." },
    ...
  ]
)
```

`[CHECKPOINT]` Review restatements. If any diverges materially from the stated problem, surface it to the user before continuing — a framing issue may deserve attention now. Include all restatements in the Round 1 prompt so members see each other's framings.

### STEP 2 — Round 1: Independent Analysis (PARALLEL, BLIND-FIRST)

Emit to user:
> **Council convened**: {member names}. Round 1 — independent analysis.

Single `task` batch, all members in parallel. Each member sees the problem and everyone's restatements — nothing else.

Per-member prompt template:
```
# Target
Council-<name>, Round 1 of a structured deliberation. Read your agent definition at
skill://council/agents/council-<name>.md and follow it precisely.

# Change
Problem: {problem}

Peer restatements (from Restate Gate):
{all restatements}

Reason via your designated reasoning_method: {method}. Do NOT imitate other
members' methods — method diversity is the point. Produce your independent
analysis using your Output Format (Standalone). Do NOT try to anticipate what
other members will say.

# Acceptance
- ≤400 words
- Sections match your Output Format (Standalone)
- Every non-trivial claim tagged: empirical | mechanistic | strategic | ethical | heuristic
```

`[CHECKPOINT]` All Round 1 outputs collected, each ≤400 words, format compliant.

### STEP 3 — Round 2: Cross-Examination (ANONYMIZED)

Emit to user:
> **Round 1 complete** ({N} analyses). Round 2 — cross-examination (anonymized).

**Identity masking** (Choi et al., arXiv:2510.07517):
1. Build stable label map: `Member A` → first, `Member B` → second, … in panel order.
2. Rewrite each Round 1 output's header from `{name}` to its label. Strip in-body self-references ("As Socrates …" → "As Member B …").
3. Retain map in coordinator state; do NOT expose to members in Round 2. Restore for Round 3, tie-break, and verdict.

**Execution:**
- Panel size ≤4 → SEQUENTIAL (each sees prior Round 2 outputs, anonymized).
- Panel size ≥5 → PARALLEL `task` batch (each sees all anonymized Round 1).
- Panel size ≥7 → optional Batch A parallel + Batch B sequential seeing Batch A anonymized.

Prompt template:
```
# Target
Council-<name>, Round 2. Read skill://council/agents/council-<name>.md.

# Change
Identity is masked in this round. Round 1 outputs are labeled Member A, B, … —
one is yours (also anonymized). Evaluate by argument quality, NEVER by source.
Do not guess identities. Refer to peers only as "Member X".

Round 1 (anonymized):
{anonymized Round 1 outputs}

{If Batch B: "Batch A Round 2 (same labels):\n{Batch A outputs}"}

Anti-conformity directive. If your Round 1 position was correct, defend it.
Update ONLY when a specific flaw in your earlier reasoning has been named. If
you cannot name the flaw, do not update.

# Acceptance
Respond using Output Format (Council Round 2):
1. Which member's position do you most disagree with, and why? Engage their specific claims. ("Member X")
2. Which member's insight strengthens your position, and how? ("Member Y")
3. Restate your position in light of this exchange; note changes.
4. Label key claims: empirical | mechanistic | strategic | ethical | heuristic

- ≤300 words
- MUST engage ≥2 other members by label
```

`[CHECKPOINT]` All Round 2 outputs collected. Coordinator restores label→name map. Transcript kept in both forms (anonymized shown to members; de-anonymized for STEP 7 synthesis).

### STEP 4 — Post-Round Enforcement Scan

Single pass over Round 2 outputs. Track enforcement dispatches for STEP 8 telemetry — count each dispatch once.

**`[VERIFY] dissent_quota`** — ≥2 members must raise a non-overlapping objection. If <2: send targeted prompt to weakest-dissent members:
> Your Round 2 response agreed with the emerging consensus. State your strongest objection to the majority in 150 words. What are they getting wrong?

**`[VERIFY] novelty_gate`** — Each Round 2 must contain ≥1 new claim, test, risk, or reframing absent from that member's Round 1. If missing:
> Your Round 2 restated Round 1 without engaging challenges. Address Member <X>'s challenge directly. What changes?

**`[VERIFY] agreement_check`** — If >70% agree on core position, prompt the 2 most likely dissenters:
> Assume the current consensus is wrong. What is the strongest alternative and what evidence would flip the decision?

**`[VERIFY] evidence_labels`** — Confirm claims tagged. Note reasoning monoculture (>80% same label type).

**`[VERIFY] anti_recursion`** — Socrates re-asking answered question → hemlock rule (force 50-word position). Any member restating Round 1 → send back. Any pair exchanging >2 messages → cut off.

`[CHECKPOINT]` Enforcement scan complete. Log dispatch counts by tag.

### STEP 5 — Round 3: Final Crystallization (PARALLEL)

Emit to user:
> **Cross-examination complete**. Round 3 — final positions.

Single `task` batch. Prompt each member:
```
# Target
Council-<name>, Round 3 — final crystallization.

# Change
State your position declaratively in ≤100 words. Socrates: you get exactly ONE
question. Make it count, then state your position. No new arguments — only
crystallize your stance.

# Acceptance
On the LAST line, emit your structured stance EXACTLY:

STANCE: <one short option label> | CONFIDENCE: high|med|low | DEALBREAKER: yes|no

- STANCE: terse option label (e.g. "monorepo", "ship now", "do not ship"). Use
  the SAME wording as peers where you agree — matching labels are what make the
  tally countable. If you back no option: STANCE: abstain.
- DEALBREAKER: yes means you consider the opposing option actively harmful, not
  merely sub-optimal — surfaced in the Minority Report even if outvoted.
```

`[CHECKPOINT]` Collect every `STANCE:` line. Normalize synonymous labels to a single canonical option (e.g. "monorepo" / "single repo" → `monorepo`). Any member with missing/unparseable stance → re-prompt for the stance line only. Never infer stance from prose. Log `missing_stance` enforcement dispatches.

### STEP 6 — Tie-Breaking (confidence-weighted tally)

Operates on `STANCE:` lines — a counted tally, not a prose impression.

1. **Confidence-weighted tally** (Roundtable arXiv:2509.16839; ConfMAD arXiv:2509.14034).
   - Base weight: **1.0** for every member; **1.5** for the domain-weight seat locked in STEP 0.
   - Vote weight = base × confidence factor: `high → 1.0`, `med → 0.75`, `low → 0.5`.
   - `abstain` contributes to no option but counts toward `W_total` at full base weight (raises the consensus bar — no free pass).
   - `W_total` = sum of BASE weights (never confidence-discounted; a hesitant panel cannot manufacture consensus by shrinking the denominator).
   - `W_option` = summed VOTE weights backing each option.
2. **Consensus test**: an option consensus iff `W_option ≥ (2/3) × W_total`. Highest such option wins.
   - `DEALBREAKER: yes` from outvoted members → Minority Report, always.
3. **No option clears 2/3 → genuine split.** Do NOT force consensus. Do NOT run another round (the round budget is the forcing function). Present each option with its weighted tally and the strongest argument for each. Verdict Consensus reads "No consensus reached"; the split hands off to the user.
4. **Exact tie between two options below 2/3**: report both as a live split. The 1.5× domain seat has already been applied; no further mechanical breaker exists by design.

**Always record the full tally** (option → weight, which seat carried 1.5×, per-backer confidence factor) in the verdict's Vote Tally field.

### STEP 7 — Synthesize Verdict (CHAIRMAN)

Dispatch a single `task` call to the Chairman (from STEP 1). Chairman is a subagent, sees the full de-anonymized transcript. Prompt:

```
# Target
You are the Chairman of the Council of High Intelligence. You did NOT
deliberate — you synthesize. Read your agent definition at
skill://council/agents/council-<chairman>.md, but wear it as a synthesizer's
hat, not a partisan's.

# Change
Problem: {problem}

Round 1 (named):
{Round 1 outputs, named}

Round 2 (names restored from anonymization map):
{Round 2 outputs}

Round 3 (named):
{Round 3 outputs}

Vote tally:
{option → weight, 1.5× seat, per-backer confidence}

# Acceptance
Produce the Council Verdict using the template below EXACTLY. Do NOT add,
remove, or rename sections. Fill each section faithfully or write
"N/A — <reason>" if genuinely empty.

Weigh arguments by validity, not by repetition or seniority. Surface genuine
disagreement; never invent positions no member held. Lead with what the council
does NOT know (Unresolved Questions).

{Insert "Council Verdict (Full Mode)" template from Output Templates}
```

Surface the Chairman's verdict verbatim — no post-processing, no re-synthesis.

**Fallback**: If Chairman call fails or times out, coordinator produces the verdict directly. Annotate: `Chairman: <name> (FAILED — coordinator fallback)`.

### STEP 8 — Append Session Metadata

After verdict, append a `Session Metadata` block (separator + `schema_version: 1`). Best-effort — fill knowable fields; write `~unknown` otherwise:

- `schema_version: 1`
- `mode`: full | quick | duo | triad
- `panel_size`: int
- `rounds_run`: actual, not target (count truncated rounds)
- `enforcement_calls`: total dispatches in STEP 4/5
- `enforcement_breakdown`: `{dissent_quota, novelty_gate, agreement_check, anti_recursion, missing_stance}`
- `subagents_spawned`: total `task` sub-invocations
- `duration_seconds`: `~unknown` unless timed
- `fallbacks_triggered`: list or `none`
- `chairman`: name + selection reason

Kept below a `---` separator so it grep-friendly and never pollutes the auditable decision artifact.

---

## Quick Mode (`--quick`)

Fast 2-round deliberation. No cross-examination.

### QUICK STEP 0
Panel selection + Chairman selection (STEP 0 + STEP 1 folded). Domain-weight seat still designated up front.

### QUICK STEP 1 — Rapid Analysis (PARALLEL)
Emit: `Quick council convened: {members}. Rapid analysis.`

Single `task` batch. Prompt (per member):
```
Council-<name>, quick mode. Read skill://council/agents/council-<name>.md.

Problem: {problem}

FIRST, in ONE sentence, restate this problem through your lens. THEN produce a
condensed analysis:
- Essential Question (1-2 sentences)
- Core insight (single key point)
- Verdict (direct recommendation)
- Confidence (High/Medium/Low)

≤200 words. Be decisive.
```

### QUICK STEP 2 — Final Positions (PARALLEL, ANONYMIZED)
Anonymize Round 1 peer outputs (same masking as STEP 3 of full mode). Quick mode is more conformity-prone (one cross-look) — masking is NOT optional here.

Prompt:
```
Anonymized Round 1 from other members:
{anonymized outputs}

Identity is masked. Judge by argument quality. Refer to peers as "Member X".

Anti-conformity: if your Round 1 was correct, defend it. Update only when a
specific flaw in your reasoning has been named.

State your final position in ≤75 words. Note any key disagreement (call out
specific Member).

LAST line, EXACTLY:
STANCE: <label> | CONFIDENCE: high|med|low | DEALBREAKER: yes|no
```

### QUICK STEP 3 — Synthesize
Apply STEP 6 tally (1.5× seat holds in quick mode). Dispatch Chairman with the Quick Verdict template. STEP 8 metadata appended.

---

## Duo Mode (`--duo`)

Two-member dialectic for one axis of tension.

### DUO STEP 0 — Select Pair
`--members a,b` → use those two. Otherwise match problem against Duo Polarity Pairs (see main table). State the tension.

### DUO STEP 1 — Opening Positions (PARALLEL, `task` batch of 2)
```
Council-<name>, duo mode. Read skill://council/agents/council-<name>.md.

Problem: {problem}

Restate the problem in ONE sentence through your lens. THEN state your position
using Output Format (Standalone). ≤300 words.
```

### DUO STEP 2 — Direct Response (SEQUENTIAL)
Each sees the other's opening. ≤250 words rebuttal. Must engage a specific claim.

### DUO STEP 3 — Final Statements (PARALLEL)
Each ≤100 words + `STANCE:` line.

### DUO STEP 4 — Chairman Synthesis
Duo verdict template. Chairman is a third council member (auto-selected as complementary lens; e.g. Torvalds-vs-Watts → Ada as formal arbiter).

---

## Output Templates

### Council Verdict (Full Mode)

```markdown
# Council Verdict

**Problem**: {problem}
**Mode**: full
**Panel**: {members}
**Chairman**: {name}
**Domain-weight seat**: {member} (1.5×) — {rationale} | or "none (ambiguous)"

## Unresolved Questions
Lead with what the council does NOT know. Missing evidence, contested assumptions, unknowns that could flip the decision.

## Consensus
{Winning option, or "No consensus reached — {reason}"}

## Recommendation
{One concrete recommendation. If no consensus, describe the split cleanly.}

## Acceptable Compromises
{Options that satisfy dissent without breaking the recommendation. Or "N/A — {reason}"}

## Kill Criteria
Evidence or events that would invalidate the recommendation. Concrete, observable.

## Next Concrete Action
One next step. Owner if identifiable. Timeline if bounded.

## Vote Tally
| Option | Weight | Backers (confidence) |
|--------|--------|----------------------|
| {opt1} | {W1}   | {member (high), …}   |
| {opt2} | {W2}   | {…}                  |
- W_total (base): {value}
- Consensus threshold: {2/3 × W_total}
- Domain-weight seat: {member} carried 1.5× on {option}

## Minority Report
Dissenting positions and any `DEALBREAKER: yes` claims, even from outvoted members.

## Evidence Labels
Distribution: empirical {n} · mechanistic {n} · strategic {n} · ethical {n} · heuristic {n}
Notes on reasoning-type concentration (if any).

---
## Session Metadata
schema_version: 1
mode: full
panel_size: {n}
rounds_run: {n}
enforcement_calls: {n}
enforcement_breakdown: {dissent_quota: n, novelty_gate: n, agreement_check: n, anti_recursion: n, missing_stance: n}
subagents_spawned: {n}
duration_seconds: {n | ~unknown}
fallbacks_triggered: {list | none}
chairman: {name} ({selection reason})
```

### Quick Verdict

```markdown
# Council Verdict (Quick)

**Problem**: {problem}
**Panel**: {members}
**Chairman**: {name}
**Domain-weight seat**: {member} (1.5×) or none

## Verdict
{Winning option or split}

## Rationale
2–3 sentences. What tipped the tally.

## Kill Criteria
Concrete signal that flips it.

## Next Concrete Action
One step.

## Vote Tally
{same shape as full}

## Minority Report
Dealbreaker dissent if any.

---
## Session Metadata
{same block; mode: quick}
```

### Duo Verdict

```markdown
# Duo Verdict

**Problem**: {problem}
**Duo**: {A} vs {B} — {tension}
**Chairman**: {name}

## Tension
One paragraph naming the polarity.

## A's Final Position
{≤100 words}

## B's Final Position
{≤100 words}

## Chairman's Synthesis
Where they converge, where they diverge, which axis matters more here.

## Recommendation
Direct call, or "irreducible tension — user decides {axis}".

## Kill Criteria & Next Action
{as above}

---
## Session Metadata
{block; mode: duo}
```

---

## When NOT to convene a council

- **Factual lookup** → direct answer or primary docs. Use `librarian` agent, not council.
- **Cheap reversible experiment** → run it. Data beats deliberation.
- **Single-file code fix** → just fix it. The `reviewer` agent alone suffices.
- **Manufacturing support for a preferred answer** → don't. The council will find you out.
- **Pure implementation questions with a known-good pattern** → follow the pattern.

Good council questions have: material downside, competing values, incomplete evidence, or irreversibility. Write down decision, constraints, evidence, reversibility, deadline BEFORE adding personas.

## Integration with OMP

- `task` — deliberation dispatch (one batch per round; agent types per member class)
- `hub` — inter-round coordination when Batch A → Batch B or when a member needs a specific peer's read
- `eval` — coordinator's own orchestration (state, label maps, tally math)
- `todo` — phase tracking (STEP 0 → STEP 8)
- `read`/`grep`/`glob` — evidence gathering by members
- `write` — verdict artifact + optional `local://council-<slug>.md` for handoff

---

**Version**: 1.0 (OMP) | **Base**: 0xNyk/council-of-high-intelligence (MIT) | **Compatibility**: OMP (oh-my-pi)

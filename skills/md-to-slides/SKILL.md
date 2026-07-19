---
name: md-to-slides
description: Convert a Markdown file into a self-contained HTML slide deck using Marp (`npx @marp-team/marp-cli --html`). Use when the user wants to turn notes/docs/an outline into presentable slides, or asks to "make slides", "generate a slide deck", "turn this into a presentation", "md to slides", "marp". Includes an overflow-safe path: if the source Markdown is not structured for slides (content would overflow a slide), it first writes a restructured copy to a temp file, renders from that, verifies, then cleans the temp file up. DO NOT use for: PDF/PPTX export unless asked (Marp can, but default is HTML), non-slide HTML rendering, or editing the original doc in place.
---

# md-to-slides

Turn a Markdown file into an HTML slide deck with **Marp** (`@marp-team/marp-cli`). The core command is:

```bash
npx --yes @marp-team/marp-cli --html --no-stdin <input.md> -o <output.html>
```

`--html` allows raw HTML in the Markdown to pass through to the rendered slides (needed for manual layout tweaks like `<br>`, `<div>`, columns). `--no-stdin` is **required in this non-interactive/sandbox context**: without it Marp waits for data on stdin (there is no TTY) and never processes the file argument, so the command hangs and produces no output.

## When to use

- "Make slides from this markdown", "generate a Marp deck", "turn my notes into a presentation"
- You have a `.md` file (or the user pastes Markdown) and want a shareable `.html` deck

**DO NOT use** for:
- Editing the original document's prose (that's a normal edit task)
- Plain (non-slide) HTML rendering of markdown
- PDF/PPTX output unless the user explicitly asks (then swap `-o deck.pdf` / `deck.pptx`)

## How Marp splits slides

Marp separates slides on `---` (horizontal rule) lines. A leading front-matter block enables Marp and sets the theme:

```markdown
---
marp: true
theme: default
paginate: true
---

# Title slide

---

## Second slide
- bullet
- bullet
```

If the input has **no** `marp: true` front matter, Marp still renders but with defaults — prefer to ensure the front matter is present (see restructure path).

## Workflow

1. **Locate the input.** Confirm the source `.md` path. If the user pasted raw Markdown, write it to a working file first.

2. **Assess structure before rendering.** Read the Markdown and check for slide-hostile content (see "Overflow / structure checks" below). Decide:
   - **Well-structured** → render directly from the original (step 3a).
   - **Not slide-safe** → restructure into a temp file, render from that (step 3b).

3a. **Direct render (structure is fine):**
   ```bash
   npx --yes @marp-team/marp-cli --html --no-stdin <input.md> -o <input-basename>.html
   ```

3b. **Restructure path (content would overflow / isn't slide-shaped):**
   - Write a corrected copy to a temp file **next to the output**, e.g. `<input-basename>.slides.tmp.md`.
   - Apply the fixes in "Restructuring rules" (add front matter, split overlong slides on `---`, trim/condense, break long code blocks, etc.). **Never edit the user's original file** — the temp file is the only thing you modify.
   - Render from the temp file:
     ```bash
     npx --yes @marp-team/marp-cli --html --no-stdin <input-basename>.slides.tmp.md -o <input-basename>.html
     ```

4. **Verify the output.** The render must succeed (exit 0, output file exists and is non-empty). If Marp printed overflow warnings, or a slide still looks too dense, iterate on the temp file and re-render.

5. **Clean up.** Only **after** a good render: if a temp file was created, delete it. If the render failed or is still unsatisfactory, **keep** the temp file so the user (or you) can inspect and fix it — report the path instead of deleting.

6. **Report.** Tell the user the output path, how many slides, and — if you restructured — a one-line summary of what you changed and that the temp file was removed.

## Overflow / structure checks

Flag the Markdown as "not slide-safe" and take the restructure path if any of these hold:

- **No `marp: true` front matter** — needs to be added.
- **A single slide has too much content** to fit: more than ~10–12 bullet lines, or a wall of prose (multiple long paragraphs) with no `---` break.
- **Long code blocks** (more than ~20 lines) that would overflow vertically.
- **Very wide content**: long unbroken lines, wide tables (many columns), or big images with no sizing.
- **Deeply nested lists** (3+ levels) that shrink text off the slide.
- **Heading structure implies sections but there are no `---` separators**, so everything renders as one giant slide.

## Restructuring rules (applied only to the temp file)

- Add/normalize front matter: `marp: true`, a `theme`, `paginate: true`.
- Insert `---` slide breaks at natural boundaries (each top-level `##` heading typically starts a new slide).
- Split any overlong slide into multiple slides; keep ~1 idea per slide.
- Condense bullets: shorten wording, cap at ~6–8 bullets per slide, promote sub-bullets to their own slide when needed.
- Break long code blocks across slides or trim to the essential lines (add a comment noting elision).
- Size large images: `![w:600](path)` or CSS, so they don't overflow.
- Preserve the user's meaning and wording as much as possible — restructure layout, don't rewrite content.

## Options cheat-sheet

```bash
# HTML deck (default use case)
npx --yes @marp-team/marp-cli --html --no-stdin deck.md -o deck.html

# PDF / PPTX (only if asked)
npx --yes @marp-team/marp-cli --html --no-stdin deck.md -o deck.pdf
npx --yes @marp-team/marp-cli --html --no-stdin deck.md -o deck.pptx

# Pick a built-in theme
npx --yes @marp-team/marp-cli --html --no-stdin --theme gaia deck.md -o deck.html
```

## Notes

- `--yes` avoids an interactive install prompt on first `npx` run.
- `--no-stdin` is required whenever Marp runs without a TTY (agent/sandbox/CI); otherwise it blocks reading stdin and ignores the file argument.
- PDF/PPTX export needs a Chromium/Chrome that Marp can drive; the sandbox already has a bundled Chromium from the Playwright install (see `sbx-spec.yaml`). Set `CHROME_PATH` if Marp can't find it.
- Keep the **original Markdown untouched**; all fixes go into the temp file, which is deleted on success.

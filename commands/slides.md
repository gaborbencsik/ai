---
description: Convert a Markdown file into an HTML slide deck with Marp (overflow-safe; restructures via a temp file when needed)
argument-hint: <path/to/input.md> [output.html]
allowed-tools: Read, Write, Edit, Bash(npx:*), Bash(ls:*), Bash(rm:*), Bash(test:*)
---

Turn a Markdown file into an HTML slide deck using Marp. Invocation: **$ARGUMENTS** (first arg = input `.md`; optional second arg = output `.html`, default `<input-basename>.html`).

Follow the `md-to-slides` skill. Steps:

1. **Read the input** Markdown. If no path was given, ask for one (or use the file the user just referenced).
2. **Assess structure.** Check for slide-hostile content: missing `marp: true` front matter, slides with too much content to fit (~10+ bullets or walls of prose with no `---`), code blocks >~20 lines, wide tables/long lines, deep nesting.
3. **Render:**
   - If well-structured → render directly:
     ```bash
     npx --yes @marp-team/marp-cli --html --no-stdin <input> -o <output>
     ```
   - If NOT slide-safe → write a restructured copy to `<input-basename>.slides.tmp.md` (add front matter, insert `---` breaks, split/condense overlong slides, break long code, size images). **Never edit the original.** Render from the temp file with `--no-stdin`.
4. **Verify** the render succeeded (exit 0, output exists and is non-empty). Iterate on the temp file if a slide still overflows.
5. **Clean up:** on success, delete the temp file if one was created. On failure, KEEP it and report its path.
6. **Report** the output path, slide count, and (if restructured) a one-line summary of the changes.

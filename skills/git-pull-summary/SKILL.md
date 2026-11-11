---
name: git-pull-summary
description: Pull one or more Git repositories and briefly summarize the newly pulled changeset by theme. Use whenever asked to pull/update a repo and explain what changed, including “git pull and summarize”, “pullold le és foglald össze”, or requests covering a parent repository and nested repositories/submodules.
---

# Git pull and summarize

Update each requested Git repository independently, preserve local work, and summarize only the commits introduced by this pull.

## Workflow

For every requested repository:

1. Resolve the repository path. Treat explicitly requested nested repositories or submodules as separate repositories.
2. Capture before changing anything:
   - `git status --short --branch`
   - `git rev-parse HEAD` as `OLD_HEAD`
   - `git remote -v`
   - current branch and configured upstream
3. Preserve existing local changes. Never reset, clean, discard, overwrite, or commit them. Report them separately from pulled changes.
4. Fetch the configured remote with pruning. If recursive submodule fetching fails, retry the parent fetch with `-c submodule.recurse=false`; do not let an unavailable recorded submodule commit prevent updating the parent repository.
5. Update the checked-out branch:
   - Prefer `git pull --ff-only` when the branch has an upstream.
   - If the repository is on a detached HEAD, do not guess: identify the remote branch containing or succeeding the checkout. Switch only when the intended branch is unambiguous from `origin/HEAD` or the user's request; otherwise report the blocker.
   - Do not merge divergent history or rebase local commits without explicit user instruction.
   - For an explicitly requested nested repository/submodule, update that repository to its own upstream branch. Do not silently force it back to the parent repository's recorded gitlink.
6. Capture `NEW_HEAD` and verify branch/upstream status. If `OLD_HEAD == NEW_HEAD`, report that the repository was already current.
7. Analyze exactly `OLD_HEAD..NEW_HEAD`:
   - commit subjects, bodies, authors, and dates;
   - aggregate diff stat and changed paths;
   - targeted diffs for ambiguous or high-impact changes.
8. Group the result by implementation theme or user-visible capability, not by commit. Combine fixups, generated output, dependency refreshes, and follow-up commits into the theme they support.

## Summary rules

Keep the report short and repository-scoped. For each repository include:

- old and new abbreviated revisions;
- number of pulled commits;
- 2–6 thematic bullets describing what was completed and why it matters;
- important migrations, compatibility changes, removals, generated artifacts, or operational changes;
- final sync state and any preserved local modifications or submodule mismatch.

Do not:

- list every commit unless the user asks;
- infer behavior from commit subjects alone when the diff can confirm it;
- describe pre-existing working-tree changes as pulled work;
- bury a pull failure, conflict, detached checkout, missing upstream, or unavailable submodule commit;
- run tests or builds unless the user also asks to verify behavior.

When multiple repositories are requested, use one heading per repository and end with a one-line cross-repository synthesis.
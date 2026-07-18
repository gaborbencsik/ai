#!/usr/bin/env bash
# Build the local kit dir: download sbx-spec.yaml from the repo and inject the
# ANTHROPIC_API_KEY. The result lands in a gitignored dir and holds a secret —
# never commit it.
#
# Usage: scripts/kit-build-claude.sh
#
# Env overrides (all optional; sensible defaults below):
#   REPO      GitHub owner/repo to fetch the spec from   (default: gaborbencsik/ai)
#   SPEC      spec filename in the repo                   (default: sbx-spec.yaml)
#   KIT_DIR   local output dir for the built spec         (default: .kit)
#
# The key is read silently from the terminal (never echoed, never passed on the
# command line so it can't leak into shell history or the process list).

set -euo pipefail

REPO="${REPO:-gaborbencsik/ai}"
SPEC="${SPEC:-sbx-spec.yaml}"
KIT_DIR="${KIT_DIR:-.kit}"
KIT_SPEC="$KIT_DIR/$SPEC"

mkdir -p "$KIT_DIR"

echo "Downloading: $SPEC ← $REPO…"
# `gh` runs on the host where it is authenticated; the raw Accept header returns
# the file contents rather than the JSON metadata wrapper.
gh api "repos/$REPO/contents/$SPEC" \
	-H "Accept: application/vnd.github.raw" > "$KIT_SPEC"

read -rsp "ANTHROPIC_API_KEY: " API_KEY
echo
if [ -z "$API_KEY" ]; then
	echo "No key provided, aborting." >&2
	exit 1
fi

# Replace the ANTHROPIC_API_KEY line, preserving its original indentation.
# We build the line via match()/substr() rather than awk's sub(), because sub()
# treats `&` in the replacement as "the matched text" and would mangle keys
# containing &, and inserting the raw key wouldn't be quote-safe either. This
# form is safe for /, &, +, = (every character a real Anthropic key contains).
awk -v key="$API_KEY" \
	'/^[[:space:]]*ANTHROPIC_API_KEY:/ { match($0, /^[[:space:]]*/); print substr($0, 1, RLENGTH) "ANTHROPIC_API_KEY: \"" key "\""; next } { print }' \
	"$KIT_SPEC" > "$KIT_SPEC.tmp" && mv "$KIT_SPEC.tmp" "$KIT_SPEC"

echo "Done: key injected → $KIT_SPEC"

#!/usr/bin/env bash
# Build the local kit dir: download sbx-spec.yaml from the repo and inject the
# ANTHROPIC_API_KEY. The result lands in a gitignored dir and holds a secret --
# never commit it.
#
# Usage: scripts/kit-build-claude.sh
#
# Env overrides (all optional; sensible defaults below):
#   REPO        GitHub owner/repo to fetch the spec from   (default: gaborbencsik/ai)
#   SPEC        spec filename in the repo                   (default: sbx-spec.yaml)
#   KIT_DIR     local output dir for the built spec         (default: .kit)
#   LOCAL_SPEC  if set, use this local file as the source   (skips the download;
#               for testing working-tree changes without pushing)
#
# The built spec is always written as KIT_DIR/spec.yaml because `sbx --kit`
# requires that exact filename (spec.yaml or spec.yml) inside the kit dir.
#
# The key is read silently from the terminal (never echoed, never passed on the
# command line so it can't leak into shell history or the process list).

set -euo pipefail

REPO="${REPO:-gaborbencsik/ai}"
SPEC="${SPEC:-sbx-spec.yaml}"
KIT_DIR="${KIT_DIR:-.kit}"
LOCAL_SPEC="${LOCAL_SPEC:-}"
# `sbx --kit` looks for spec.yaml / spec.yml in the kit dir, regardless of what
# the source file is named in the repo, so normalize the output filename here.
KIT_SPEC="$KIT_DIR/spec.yaml"

mkdir -p "$KIT_DIR"

if [ -n "$LOCAL_SPEC" ]; then
	# Local mode: build from a working-tree file so you can test uncommitted
	# changes without pushing to the repo.
	if [ ! -f "$LOCAL_SPEC" ]; then
		echo "LOCAL_SPEC set but file not found: $LOCAL_SPEC" >&2
		exit 1
	fi
	echo "Using local spec: $LOCAL_SPEC"
	cp "$LOCAL_SPEC" "$KIT_SPEC"
else
	echo "Downloading: $SPEC from $REPO ..."
	# `gh` runs on the host where it is authenticated; the raw Accept header returns
	# the file contents rather than the JSON metadata wrapper.
	gh api "repos/$REPO/contents/$SPEC" \
		-H "Accept: application/vnd.github.raw" > "$KIT_SPEC"
fi

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

echo "Done: key injected -> $KIT_SPEC"

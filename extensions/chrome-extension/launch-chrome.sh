#!/usr/bin/env bash
# OMP Annotator — Chrome launcher.
#
# Opens a dedicated Chrome instance with the annotator extension pre-loaded.
# Uses an isolated user-data-dir so it never touches your main Chrome profile
# and never conflicts with a running Chrome. Every launch has the extension.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXT_DIR="${HERE}"
PROFILE_DIR="${OMP_ANNOTATOR_PROFILE:-$HOME/Library/Application Support/omp-annotator-chrome}"
CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if [[ ! -x "${CHROME_BIN}" ]]; then
  echo "Google Chrome not found at ${CHROME_BIN}" >&2
  exit 1
fi

mkdir -p "${PROFILE_DIR}"

echo "Launching Chrome with extension ${EXT_DIR}"
echo "Isolated profile: ${PROFILE_DIR}"

exec "${CHROME_BIN}" \
  --user-data-dir="${PROFILE_DIR}" \
  --load-extension="${EXT_DIR}" \
  --no-first-run \
  --no-default-browser-check \
  "$@"

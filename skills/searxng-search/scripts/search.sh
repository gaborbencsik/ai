#!/usr/bin/env bash
# SearXNG web search -> clean text or JSON.
set -euo pipefail

BASE="${SEARXNG_URL:-http://host.docker.internal:8888}"
BASE="${BASE%/}"

NUM=8
CATEGORY=""
ENGINES=""
LANG=""
TIME_RANGE=""
PAGE=1
JSON=0
CHECK=0

usage() {
  cat <<'EOF'
SearXNG web search -> clean text or JSON.

Usage:
  search.sh [options] "query"
  search.sh --check

Options:
  -n <N>        max results to print (default 8)
  -c <cat>      category (general, news, images, science, it, ...)
  -e <list>     comma-separated engines (e.g. duckduckgo,brave)
  -l <lang>     language code (e.g. en, hu)
  -t <range>    time range: day, week, month, year
  -p <N>        page number (default 1)
  --json        raw JSON output
  --check       health-check the instance and exit
EOF
}

ARGS=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    -n) NUM="$2"; shift 2 ;;
    -c) CATEGORY="$2"; shift 2 ;;
    -e) ENGINES="$2"; shift 2 ;;
    -l) LANG="$2"; shift 2 ;;
    -t) TIME_RANGE="$2"; shift 2 ;;
    -p) PAGE="$2"; shift 2 ;;
    --json) JSON=1; shift ;;
    --check) CHECK=1; shift ;;
    -h|--help) usage; exit 0 ;;
    --) shift; while [[ $# -gt 0 ]]; do ARGS+=("$1"); shift; done ;;
    -*) echo "Unknown option: $1" >&2; usage >&2; exit 2 ;;
    *) ARGS+=("$1"); shift ;;
  esac
done

if [[ "$CHECK" == "1" ]]; then
  echo "endpoint: $BASE"
  code=$(curl -s -m 10 -o /dev/null -w '%{http_code}' "$BASE/" || echo 000)
  echo "root:     HTTP $code"
  body=$(curl -s -m 15 "$BASE/search?q=ping&format=json" || true)
  if echo "$body" | jq -e '.results' >/dev/null 2>&1; then
    echo "json api: OK"
    exit 0
  else
    echo "json api: UNAVAILABLE (enable search.formats: [html, json] in settings.yml)" >&2
    exit 1
  fi
fi

if [[ ${#ARGS[@]} -eq 0 ]]; then
  echo "error: no query given" >&2
  usage >&2
  exit 2
fi
QUERY="${ARGS[*]}"

# Build query params safely via curl --data-urlencode (GET).
params=(--get
  --data-urlencode "q=${QUERY}"
  --data-urlencode "format=json"
  --data-urlencode "pageno=${PAGE}")
[[ -n "$CATEGORY"   ]] && params+=(--data-urlencode "categories=${CATEGORY}")
[[ -n "$ENGINES"    ]] && params+=(--data-urlencode "engines=${ENGINES}")
[[ -n "$LANG"       ]] && params+=(--data-urlencode "language=${LANG}")
[[ -n "$TIME_RANGE" ]] && params+=(--data-urlencode "time_range=${TIME_RANGE}")

resp=$(curl -s -m 30 "${params[@]}" "$BASE/search") || {
  echo "error: request to $BASE failed" >&2; exit 1; }

if ! echo "$resp" | jq -e '.results' >/dev/null 2>&1; then
  echo "error: no JSON results (is json format enabled on the instance?)" >&2
  echo "$resp" | head -c 400 >&2; echo >&2
  exit 1
fi

if [[ "$JSON" == "1" ]]; then
  echo "$resp" | jq --argjson n "$NUM" '{query, number_of_results, results: (.results[:$n])}'
  exit 0
fi

echo "$resp" | jq -r --argjson n "$NUM" '
  "Query: \(.query)   (results: \(.number_of_results // "?"))",
  "",
  (.results[:$n] | to_entries[] |
    "[\(.key + 1)] \(.value.title)\n    \(.value.url)\n    \(
        (.value.content // "") | gsub("\\s+"; " ") | .[0:280]
     )\n    engines: \((.value.engines // []) | join(", "))\n")
'

# Optional: show suggestions if present.
sugg=$(echo "$resp" | jq -r '(.suggestions // []) | join(", ")')
[[ -n "$sugg" ]] && echo "Suggestions: $sugg"
exit 0

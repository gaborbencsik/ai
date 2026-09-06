#!/usr/bin/env bash
# Fetch a URL and print its readable text (best-effort HTML -> text).
set -euo pipefail

URL="${1:-}"
if [[ -z "$URL" ]]; then
  echo "usage: fetch.sh <url> [max_chars]" >&2
  exit 2
fi
MAX="${2:-6000}"

html=$(curl -sL -m 30 \
  -A "Mozilla/5.0 (compatible; pi-searxng-skill/1.0)" \
  "$URL") || { echo "error: fetch failed for $URL" >&2; exit 1; }

# Strip scripts/styles/tags, collapse whitespace, decode a few entities.
export MAXCHARS="$MAX"
echo "$html" | node -e '
let s = "";
process.stdin.on("data", d => s += d);
process.stdin.on("end", () => {
  s = s.replace(/<script[\s\S]*?<\/script>/gi, " ")
       .replace(/<style[\s\S]*?<\/style>/gi, " ")
       .replace(/<!--[\s\S]*?-->/g, " ")
       .replace(/<\/(p|div|h[1-6]|li|br|tr|section|article)>/gi, "\n")
       .replace(/<[^>]+>/g, " ")
       .replace(/&nbsp;/g, " ")
       .replace(/&amp;/g, "&")
       .replace(/&lt;/g, "<")
       .replace(/&gt;/g, ">")
       .replace(/&quot;/g, "\"")
       .replace(/&#39;/g, "\x27")
       .replace(/[ \t]+/g, " ")
       .replace(/\n\s*\n\s*\n+/g, "\n\n")
       .trim();
  const max = parseInt(process.env.MAXCHARS || "6000", 10);
  if (s.length > max) s = s.slice(0, max) + "\n... [truncated]";
  process.stdout.write(s + "\n");
});
' 2>/dev/null || { echo "error: parse failed" >&2; exit 1; }

# SearXNG skill — advanced reference

Load this only when the basic `search.sh "query"` / `fetch.sh <url>` flow is not enough.

## search.sh options

| Flag | Meaning | Default |
|------|---------|---------|
| `-n <N>` | Max results to print | `8` |
| `-c <cat>` | Category: `general`, `news`, `images`, `science`, `it`, `music`, `videos`, `map`, `files` | (none) |
| `-e <list>` | Comma-separated engines (e.g. `duckduckgo,brave,google`) | (none) |
| `-l <lang>` | Language code (`en`, `hu`, `de`, ...) | (none) |
| `-t <range>` | Time range: `day`, `week`, `month`, `year` | (none) |
| `-p <N>` | Page number | `1` |
| `--json` | Raw JSON output (pipe to `jq`) | text |
| `--check` | Health-check the instance and exit | - |

### Recipes

```bash
# recent news, one engine
./scripts/search.sh -c news -t week -e duckduckgo "openai release"

# Hungarian-language results
./scripts/search.sh -l hu "adóbevallás határidő"

# structured extraction: just titles + urls
./scripts/search.sh --json -n 10 "rust web framework" \
  | jq -r '.results[] | "\(.title)\t\(.url)"'

# next page of results
./scripts/search.sh -p 2 "long tail query"
```

## fetch.sh

```bash
./scripts/fetch.sh <url> [max_chars]     # default max_chars = 6000
```

Best-effort HTML→text: strips `<script>/<style>/<!-- -->`, converts block-level
closing tags to newlines, decodes common entities, collapses whitespace, truncates.
For JS-heavy pages the extracted text may be sparse — try another result URL.

## JSON result shape (per item)

```json
{
  "title": "...",
  "url": "https://...",
  "content": "snippet text",
  "engines": ["duckduckgo"],
  "publishedDate": null,
  "category": "general"
}
```

Top level also has `query`, `number_of_results`, and sometimes `suggestions`.

## Troubleshooting

- **`no JSON results` / `json api UNAVAILABLE`**: the instance must enable the JSON
  format in `settings.yml`:
  ```yaml
  search:
    formats:
      - html
      - json
  ```
- **Request fails / connection refused**: check `$SEARXNG_URL`. From inside the
  sandbox container the host instance is at `http://host.docker.internal:8888`.
- **Zero results but engines returned data**: `number_of_results` can be `0` even
  when `results` is populated (engine-dependent); rely on the `results` array.

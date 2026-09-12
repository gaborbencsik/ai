---
name: searxng-search
description: Web search via a self-hosted SearXNG instance. Use whenever you need up-to-date facts, documentation, news, or to find URLs instead of guessing. Returns clean results (title, url, snippet). Also fetches a page's readable text.
metadata:
  endpoint-env: SEARXNG_URL
  default-endpoint: http://host.docker.internal:8888
---

Search the web and read pages. Uses `$SEARXNG_URL` (default `http://host.docker.internal:8888`).

> **Engine egress note**: several engines (duckduckgo, brave, mojeek) are routed
> through a Tor SOCKS5 container (`searxng-tor`) to dodge IP bans. If those engines
> appear `Suspended` or missing from results, check the tor container first:
> `docker ps | grep searxng-tor` (see `references/advanced.md` → Troubleshooting).

## Search

```bash
./scripts/search.sh "your query"        # top results as readable text
./scripts/search.sh -n 5 "your query"   # limit count
./scripts/search.sh --json "your query" # raw JSON for jq
```

## Read a page

```bash
./scripts/fetch.sh <url>                # main text of a result URL
```

## More

- All flags (category, engines, language, time range, paging): `./scripts/search.sh --help`
- Advanced usage, JSON shape, and troubleshooting: [references/advanced.md](references/advanced.md)

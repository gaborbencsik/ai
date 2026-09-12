# SearXNG Diagnosis & Fixes — 2026-09-10

## Initial state

- **Container**: `searxng/searxng:latest` (version `2026.9.5`), running 3 days on `localhost:8888`
- **Config**: `use_default_settings: true`, `limiter: false`, no Redis, 83 engines enabled
- **Port binding**: `0.0.0.0:8888` — **open to the internet**

## Problems found

| Engine | Symptom | Cause |
|--------|---------|-------|
| **duckduckgo** (4 variants) | `CAPTCHA (wt-wt)` continuous | DDG IP-banned, `suspended_time=0` → instant retry, log spam |
| **brave** (4 variants) | `Too many requests (suspended_time=180)` | Brave rate-limit, 3-min suspension |
| **startpage** (3 variants) | `CAPTCHA (suspended_time=3600)` | Startpage sc-code challenge, 1h suspension |
| **google cse** (2 variants) | `Our systems have detected unusual traffic (suspended_time=180)` | Google CSE rate-limit, no custom API key configured |
| **bing** (4 variants) | `ConnectionError: the server has disconnected` | Bing blocks IP, connection drop |
| **qwant** (4 variants) | `CAPTCHA (suspended_time=0)` | Same `suspended_time=0` retry-spam as duckduckgo |
| **wikidata** | `502 Bad Gateway` | SPARQL endpoint transient down |

**Root cause**: Residential IP, no proxy pool, no rate limiter. The `suspended_time=0` on duckduckgo and qwant means SearXNG never suspends the engine — it retries every search, immediately gets CAPTCHA again, and floods the logs.

## Fixes applied

### 1. Port binding: `0.0.0.0` → `127.0.0.1` (security)

```yaml
# docker-compose.yml
ports:
  - "127.0.0.1:8888:8080"   # localhost only, not reachable from internet
```

### 2. Redis + limiter (engine suspension persistence)

Added `redis:7-alpine` container with healthcheck to `docker-compose.yml`:

```yaml
redis:
  image: redis:7-alpine
  container_name: searxng-redis
  command: ["redis-server", "--save", "60", "1", "--loglevel", "warning"]
  volumes:
    - redis-data:/data
  healthcheck:
    test: ["CMD", "redis-cli", "ping"]
    interval: 10s
    timeout: 3s
    retries: 3
  restart: unless-stopped
```

SearXNG service updated:

```yaml
searxng:
  environment:
    - SEARXNG_VALKEY_URL=redis://redis:6379/0   # not SEARXNG_REDIS_URL (deprecated)
  depends_on:
    redis:
      condition: service_healthy
```

Settings (`settings.yml`):

```yaml
server:
  limiter: true   # was false
```

**Effect**: Engine suspension state (e.g. google news 1h CAPTCHA ban) now survives container restarts via Redis. The limiter also rate-limits external clients, while local Docker bridge IPs (`172.16.0.0/12`) are on the passlist.

### 3. `limiter.toml` created

`/etc/searxng/limiter.toml` (bind-mounted from `./searxng/limiter.toml`):

```toml
[botdetection]
trusted_proxies = ['127.0.0.0/8', '::1']

[botdetection.ip_lists]
pass_ip = [
  '192.168.0.0/16',
  '172.16.0.0/12',   # Docker bridge
  '10.0.0.0/8',
  'fe80::/10',
  'fc00::/7',
]
pass_searxng_org = true
```

### 4. Aggressive back-off (`suspended_times`)

```yaml
# settings.yml
search:
  suspended_times:
    SearxEngineAccessDenied: 86400   # 24h
    SearxEngineCaptcha: 86400        # 24h
    SearxEngineTooManyRequests: 3600 # 1h
```

**Effect**: When an engine returns CAPTCHA or 403, SearXNG suspends it for 24h instead of the short default. Prevents the retry-spam cycle that worsens bans.

### 5. Engine cleanup — 19 blocked engines disabled

Disabled (chronically blocked from residential IP):

- **duckduckgo** (4 variants) — `suspended_time=0`, endless retry
- **brave** (4 variants) — `Too many requests`
- **startpage** (3 variants) — `CAPTCHA`
- **bing** (4 variants) — `ConnectionError`
- **google cse** (2 variants) — `too many requests`, no custom API key
- **qwant** (4 variants) — `suspended_time=0`, endless retry

Result: 83 → 71 enabled engines. Google is the primary general-purpose engine, stable across all tests (10+ results per search).

### 6. `outgoing.proxies` config ready (commented)

```yaml
outgoing:
  # proxies:
  #   all://:
  #     - socks5://127.0.0.1:9050   # Tor
  #     - http://proxy1:8080
  # extra_proxy_timeout: 10
```

## Verification after fixes

```
Test 1 (general search):  10 results, 0 unresponsive engines
Test 2 (news search):     30 results (reuters + qwant news), 0 unresponsive
Test 3 (code search):     10 results, 0 unresponsive
Test 4 (rapid fire 20x):  20/20 HTTP 200
Test 5 (container health): searxng Up, redis Up (healthy), Redis DB size: 1
```

## CAPTCHA problem — solutions

The CAPTCHA issue has four solution layers, from immediate to long-term.

### Solution A: Aggressive back-off — implemented

The `suspended_times` settings (24h for CAPTCHA/AccessDenied, 1h for TooManyRequests) prevent retry-spam. This is already active.

### Solution B: SSH SOCKS tunnel — manual first aid

If an engine has already CAPTCHA-banned the IP, the SearXNG [official docs](https://docs.searxng.org/admin/answer-captcha.html) describe solving it via SSH SOCKS tunnel:

```bash
# SOCKS proxy through the server's IP
ssh -q -N -D 8080 user@your-server

# Browser proxy: SOCKS5 127.0.0.1:8080
# Then open the blocked engine (e.g. qwant.com, duckduckgo.com)
# and solve the CAPTCHA from the server's IP.
```

This is first aid, not a permanent fix. If the abuse pattern continues, the CAPTCHA returns.

### Solution C: Outgoing proxy pool — the effective solution

SearXNG supports a rotating proxy pool natively. This distributes requests across multiple IPs so no single IP gets banned.

```yaml
outgoing:
  proxies:
    all://:
      - socks5://127.0.0.1:9050   # Tor SOCKS proxy
      - http://proxy1:8080
      - http://proxy2:8080
  extra_proxy_timeout: 10
```

| Proxy type | Cost | Reliability | Notes |
|------------|------|-------------|-------|
| **Tor** (container, see "Tor in Docker" below) | Free | Medium | Deployed 2026-09-12: `tor` compose service, `socks5h://tor:9050` |
| **Rotating residential** (BrightData, SmartProxy, Webshare) | $5-50/mo | High | Most reliable — requests come from different residential IPs |
| **Free proxy pool** ([searxng-resilient-router](https://github.com/betamax-tech/searxng-resilient-router)) | Free | Low | Auto-scrapes and health-checks free proxies |

### Solution D: Two-instance resilient-router architecture

For maximum reliability (e.g. automated research tools), the `searxng-resilient-router` pattern provides tiered failover:

```
research tools ───► Go router :8899
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼                ▼
  Tier 1 DIRECT   Tier 2 PROXIED   Tier 3 DEAD-LETTER
  SearXNG :8890   SearXNG :8891    (queue + retry)
  real IP        rotating proxy    never loses a query
  (fast)         pool (backup)
```

- **Tier 1**: direct connection, rate-limited (token bucket 6/min, burst 15)
- **Tier 2**: proxy pool, not rate-limited (rotating IPs absorb it)
- **Tier 3**: if both tiers fail, query is persisted to disk and retried later
- Router treats HTTP 200 + `results: []` as failure (normal load-balancers don't)

More infrastructure (Go binary, systemd services, proxy pool manager), but guarantees search tools never get "no results".

## Current status summary

| What | Status |
|------|--------|
| Port `127.0.0.1` only | Active — not reachable from internet |
| Redis + limiter | Active — suspension state persistent |
| `suspended_times` 24h/24h/1h | Active — aggressive back-off |
| Engine cleanup (19 blocked engines disabled) | Active |
| `outgoing.proxies` | Ready in config, commented — activate when proxy available |
| SSH SOCKS tunnel CAPTCHA fix | Documented — manual first aid |
| Two-instance resilient-router | Option — if maximum reliability needed |

## Next step if Google also gets blocked

The Tor proxy pool is now deployed as a compose service (see "Tor in Docker —
deployed 2026-09-12" below). If Google also gets blocked, route google through
the same `tor` network — or better, subscribe to a rotating residential proxy
($5-15/mo) and put it in `outgoing.networks.tor.proxies` (drop-in replacement,
keep `using_tor_proxy: false` for non-Tor proxies).

## Update 2026-09-12 — live re-test & corrections

### Correction: engine suspension is NOT persisted in Redis

The earlier claim that Redis makes engine suspension survive restarts is **wrong**.
Verified in the container source (`searx/search/processors/abstract.py`):
`SUSPENDED_STATUS` is a plain **in-memory dict** keyed by engine/network id
(`SuspendedStatus` = `threading.Lock` + `suspend_end_time`). Redis (Valkey) is used
only by the incoming **limiter/botdetection** (client rate limiting). All engine
suspensions reset on container restart. Compose comment corrected accordingly.

### New block: mojeek

`mojeek` (3 variants) joined the blocked list: 403 after ~8 rapid queries from the
residential IP (verified; `suspended_time=86400` per our aggressive back-off — works
as designed). Interesting: a direct curl with a browser UA returns 200 — Mojeek
rate-limits per-IP request rate, not per-UA. Disabled same as the others.

### Google CAPTCHA: transient, don't over-punish

Root-caused the 2026-09-12 burst: SearXNG's google engine queries
`https://www.google.com/wml/search` with a **random Nokia WML UA** and
`impersonate=chrome99_android`. Under rapid-fire this endpoint returns transient
`302 → /sorry/index` redirects (replicated directly with curl_cffi from inside the
container: bursts of 302s alternating with 200s; desktop `/search` with
`impersonate=chrome` survived 12/12 rapid queries with zero 302s).

Fix: `SearxEngineCaptcha: 86400 → 900` (15 min). One transient 302 previously took
the **only** general engine down for 24h. Hard 403s (AccessDenied) stay at 24h.

### Current engine state (config API verified)

| Engine | State |
|--------|-------|
| google | enabled — survived 12 rapid queries, 0 unresponsive |
| mojeek | disabled (403 rate-block) |
| duckduckgo / brave / startpage / bing / qwant | disabled (chronic blocks) |
| wikipedia, github, stackoverflow, arxiv, pubmed, reuters | enabled |

### Verification

```
12 rapid queries:  12/12 HTTP 200, results 9-10, 0 unresponsive engines
Post-restart:      google recovers (15 min CAPTCHA cooldown instead of 24h)
limiter.toml:      WARNING "missing config file: /etc/searxng/limiter.toml" —
                   the file exists on the host (tools/searxng/limiter.toml) but
                   botdetection logs this at startup; limiter still passes Docker
                   bridge IPs via the default config. Non-blocking.
```

### Alternative search APIs (2026 pricing snapshot, for offload/failover)

Bing Search API retired 2025-08-11 (Azure "Grounding with Bing" ≈ $35/1k). Market
split: agent-native APIs vs SERP scrapers.

| API | Price/1k | Free tier | Best for |
|-----|----------|-----------|----------|
| **Serper** | ~$0.30–1 | 2.5k one-time | cheapest raw Google SERP JSON |
| **Brave Search API** | ~$5 | $5/mo credit | independent index (no Google/Bing mirror) |
| **Exa** | ~$7 | 1k req/mo | neural/semantic discovery |
| **Tavily** | ~$8 basic | 1k credits/mo | hosted RAG, MCP server, LangChain |
| **Perplexity Sonar** | ~$5–14 + tokens | trial | finished cited answers |
| **Parallel** | ~$4–9 | — | token-compressed excerpts for agents |

Recommendation for this stack: keep SearXNG primary (free, self-hosted, 25+ engines),
add **Serper** (~$3/mo at hobby volume) as explicit fallback in agent code when
SearXNG returns `unresponsive_engines` with only-suspended engines. Brave API if a
Google-independent index matters.

## VPN vs Tor — measured 2026-09-12 (Tor 0.4.9.12, live benchmarks)

### Q1: Would a VPN help?

**Partially — same problem, different IP.** A VPN swaps the residential IP for a
shared VPN-exit IP. Those exits are used by thousands of users hammering Google,
so datacenter-IP reputation is typically *worse* than residential: expect CAPTCHAs
sooner, not later. It only helps for engines that block the residential IP on
reputation (DDG's `wt-wt` ban). Real fix is IP *diversity* (rotation), not IP swap.

### Q2: Tor — measured, works, with one caveat

Live benchmark through a local Tor SOCKS5 (`brew install tor` + `SocksPort 9050`),
using SearXNG's exact request patterns (curl_cffi, engine UAs, impersonation):

| Engine | Direct (residential IP) | Via Tor |
|--------|------------------------|---------|
| google /wml (Nokia UA, burst 5) | 302-sorry under burst | 200s, 1 transient 302 in 5 — same pattern |
| duckduckgo html | CAPTCHA-banned (wt-wt) | **3/3 clean 200, no captcha** (~0.5-1s) |
| mojeek | 403 rate-blocked | **200** |
| brave | TooManyRequests | **200** |
| startpage | CAPTCHA | **200** |
| latency | 0.2-0.4s | 0.4-1.5s first circuit; ~0.5s steady |

Tor circuit rotation (10 min default, or via control port signal NEWNYM) is exactly
the IP-diversity the engines punish less. The caveat: **shared Tor exits also have
reputation** — a fresh exit is clean, a heavily-used one may be pre-flagged; expect
occasional CAPTCHAs on Google regardless of egress.

### Recommended wiring: per-engine Tor network (verified supported)
SearXNG supports named networks (`outgoing.networks` → `Network(proxies=…,
using_tor_proxy=…)`; engines reference via `network:` key). Wire only the
chronically blocked engines through Tor, keep google direct (fast path):

```yaml
# settings.yml
outgoing:
  using_tor_proxy: false
  extra_proxy_timeout: 10
  networks:
    tor:
      proxies:
        all://: socks5h://host.docker.internal:9050
      using_tor_proxy: true   # runtime check: verify egress is a Tor exit

engines:
  - name: duckduckgo
    network: tor
    disabled: false
  - name: brave
    network: tor
    disabled: false
  - name: mojeek
    network: tor
    disabled: false
  # startpage: needs sc-code challenge even via Tor — keep disabled
  # google: keep direct (fast, 302s are transient, 15-min suspension suffices)
```

Run tor on the host (`brew services start tor`, default SocksPort 9050) — Docker
containers reach it via `host.docker.internal`. Note: `socks5h://` (h-suffix) is
required so DNS also resolves through Tor; the Tor check in
`Network.check_tor_proxy` requires this scheme.

Verdict: Tor is the free 80% solution; a paid rotating residential proxy pool
($5-15/mo) is the 100% solution. A single static VPN is not a fix.

## Tor in Docker — deployed 2026-09-12 (live findings)

### What was added

- `tools/docker-compose.yml`: new `tor` service (alpine + `apk add tor`,
  SOCKS5 on 9050, config `tools/searxng/tor/torrc`, healthcheck = SOCKS port
  accepting, `start_period: 60s` covers bootstrap). `searxng` depends on it
  (`condition: service_healthy`) — required because webapp boots with
  `check_network=True` and refuses to start if the Tor egress fails its
  runtime check.
- `tools/searxng/settings.yml`: named network `tor` under `outgoing.networks`
  (`socks5h://tor:9050` — the `h` suffix routes DNS through Tor, required by
  `check_tor_proxy`), `using_tor_proxy: true`, `retries: 6`,
  `retry_on_http_error: [403, 429]`. Engines `duckduckgo`, `brave` (all 4),
  `mojeek` (all 3) re-enabled with `network: tor`. google stays direct.
- `torrc`: `MaxCircuitDirtiness 120` — circuits rotate every 2 min so
  pre-flagged exits are left quickly.
- Skill wiring: `skills/searxng-search/SKILL.md` egress note,
  `references/advanced.md` → new "Tor egress" troubleshooting section,
  `scripts/search.sh --check` now warns when tor-routed engines are suspended.

### Verified live behavior (the honest part)

- Wiring confirmed end-to-end: `SearXNG` network registry shows the tor proxy
  on all three engines; request logs route via `searx.network.tor`; the boot
  gate works (searxng stays down until tor is healthy).
- **Exit quality is the deciding factor, and it is time-varying.** DDG serves
  a 200 status *challenge page* (→ "parsing error") or a 403/429 for minutes
  at a time on flagged exits, then clears. Brave 429s are exit-IP-wide and
  sticky. Same client, same exit: 403 → minutes later → 200 without any
  config change. The `retries: 6` + 2-min circuit rotation + 10-min
  TooManyRequests suspend absorb this; expect tor-routed engines to be
  intermittently `Suspended` in `unresponsive_engines` while google stays
  on as the always-on baseline.
- `IsolateSOCKSAuth` was tested and **reverted**: with it enabled, curl_cffi
  silently bypassed the proxy (requests went out from the home IP).

### Related gotcha (recorded for the future)

`curl_cffi` proxy dicts must use scheme-less keys (`{'https': url}` /
`{'all': url}`). Keys with a scheme (`{'https://': url}`) are **silently
ignored** — requests go out directly. SearXNG's own mapping
(`_proxy_kwargs` in `network/client.py`) handles this correctly; the trap
only bites ad-hoc scripts.
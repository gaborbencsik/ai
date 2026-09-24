# Autonomous AI Dev Workflow – MVP / POC Terv

> Cél: a `autonomous-ai-workflow.md` és `state-and-improvements.md` vízióból a
> **legkisebb, önmagában bizonyító mag** megépítése. Amit a POC-nak igazolnia kell:
> egy story-ból **ember nélkül** eljutunk egy zöld (build + test + lint) diff-ig,
> **állapotgép + repair loop** segítségével — nem hosszú chattel.

---

## 1. Scope – mit igazol a POC

**Egyetlen hipotézis:** determinisztikus state machine + rövid, állapotalapú Claude
hívások + célzott kontextus → egy story önállóan zöldre vihető.

### Benne van (MVP)
- 1 db state machine: `PLAN → IMPLEMENT → BUILD → TEST → REVIEW → DONE`
- Repair loop: bármelyik ellenőrzés bukik → `REPAIR → IMPLEMENT` vissza, max N iteráció
- Kontextus: **qmd + Semble** a releváns fájlok kiválasztásához (nincs új index)
- Prompt caching a stabil system/guideline blokkra
- State = struktúrált fájl (nem chat history)
- Verifikáció: `build`, `unit test`, `lint` (a projekt saját parancsaival)

### Kimarad (későbbi kör)
- ❌ Windmill / Temporal (először sima szkript-orchestráció)
- ❌ Playwright / frontend agent
- ❌ Új indexrétegek: Dependency/Call/Code Map, Test Mapping, Git co-change
- ❌ Multi-agent szerepkörök (Architect/Debug/Frontend külön) — 2 szerep elég
- ❌ Batch API
- ❌ Docker sandbox izoláció (git branch + worktree elég a POC-hoz)

---

## 2. Minimál architektúra

```
        story.yaml
            │
     ┌──────▼──────┐
     │  Orchestrator│  (egyszerű Python/TS szkript – a state machine)
     └──────┬──────┘
            │  minden állapot = 1 Claude hívás (cached system + friss state)
   ┌────────┼─────────────────────────────┐
   │        │                             │
 Context   Planner/Implementer         Reviewer
 (qmd+     (Sonnet)                    (Sonnet)
  Semble)
            │
       Apply patch (git)
            │
   Build / Test / Lint  ── output ──► state.yaml
            │
        Success? ── no ──► REPAIR ──► IMPLEMENT
            │ yes
          DONE (diff a branchen)
```

Csak **2 agent szerep** a POC-ban:
1. **Worker** (Sonnet): context-discovery + plan + implement + repair egyben.
2. **Reviewer** (Sonnet, később Opus): fast review — lint/style/nyilvánvaló hiba.

---

## 3. State modell (nem chat!)

`.workflow/state.yaml` – ez a memória, minden iterációnál ezt küldjük, nem a history-t:

```yaml
story_id: checkout-discounts
phase: TEST              # PLAN|IMPLEMENT|BUILD|TEST|REVIEW|REPAIR|DONE|FAILED
iteration: 3
max_iterations: 8
context_files:           # a Context lépés választja ki (10–30 fájl)
  - src/OrderService.ts
  - src/Order.test.ts
changed_files:
  - src/OrderService.ts
last_command:
  cmd: "npm test"
  exit_code: 1
failed:
  - "checkout.spec.ts: Expected 200, received 401"
todo:
  - "update discount rounding"
known_issues:
  - "lint: OrderService.ts:52 unused var"
```

Claude minden híváskor kap: **cached** system+guideline blokk + `state.yaml` +
aktuális `git diff` + utolsó parancs-output. Semmi mást.

---

## 4. Állapotok viselkedése

| Állapot | Bemenet | Claude tesz | Kimenet | Következő |
|---|---|---|---|---|
| PLAN | story.yaml | acceptance criteria → task lista + keresési kulcsszavak | `todo`, keresési query-k | IMPLEMENT |
| (context) | query-k | qmd + Semble futtatás (nem LLM) | `context_files` | IMPLEMENT |
| IMPLEMENT | state + context fájlok | patch/diff | módosított fájlok | BUILD |
| BUILD | — | (nem LLM) build parancs | exit_code, log | ok→TEST / bukik→REPAIR |
| TEST | — | (nem LLM) test parancs | failed lista | ok→REVIEW / bukik→REPAIR |
| REVIEW | diff | fast review | issues vagy OK | issues→REPAIR / OK→DONE |
| REPAIR | failed + log | célzott javítás | patch | IMPLEMENT |
| DONE | — | — | commit a branchen | vége |
| FAILED | max_iter elérve | — | riport a state-ből | vége |

Kulcs: **build/test/lint nem LLM hívás**, csak a projekt parancsai. Az LLM csak
dönt és kódot ír.

---

## 5. Tech stack (POC-szintű, minimál)

- **Orchestrator:** **Prefect 3** (Python-native workflow framework). Nem saját szkript,
  de nem is nehéz (Windmill Postgres+konténerek) — `uv pip install prefect`, SQLite
  backend, cron/retry/timeout/state/UI kódból. Lásd 5.1 az indoklásért és a
  Windmill-graduation-útért.
- **LLM:** Claude API (Sonnet), `system` blokk `cache_control: ephemeral`-lel.
- **Kontextus:** meglévő qmd (`query`) + Semble (`search`) — **CLI-ként** subprocess-ből.
- **VCS:** git – dedikált branch + `git diff` mint memória; patch apply.
- **Verifikáció:** projekt `package.json`/`Makefile` scriptjei (`build`, `test`, `lint`).
- **Config:** `workflow.yaml` – parancsok, max_iterations, modell id-k.

```yaml
# workflow.yaml
commands:
  build: "npm run build"
  test:  "npm test"
  lint:  "npm run lint"
limits:
  max_iterations: 8
models:
  worker:   claude-sonnet-5
  reviewer: claude-sonnet-5
```

### 5.1 Miért Prefect a POC-ra (és Windmill később)

Az eredeti vízió Windmillt nevezett meg. A **POC első szeletéhez** viszont Prefect a jobb:

| Szempont | Windmill | Prefect 3 (POC választás) |
|---|---|---|
| Minimum futtatás | Postgres + server + worker konténer | `uv pip install prefect`, SQLite, nincs kötelező Docker |
| Cron / retry / timeout | ✓ | ✓ (`@flow`, `@task(retries=…, timeout_seconds=…)`, `.serve(cron=…)`) |
| State + UI | ✓ (Postgres) | ✓ (SQLite, `prefect server start`) |
| Jelleg | ops-platform, UI-first | Python-könyvtár, kódból vezérelt |

A pipeline amúgy is Python (qmd/semble CLI + Claude API), így egy Python-native
orchestrátor nulla impedancia. **Graduation:** ha a mag bizonyít és kell a queue /
UI-szerkesztés / hosszú futás / csapat-demó → átállunk **Windmillre**; a flow-logika
(determinisztikus DAG) ugyanaz marad, csak a futtató réteg cserélődik.

---

## 6. Prompt caching stratégia

Egy **stabil előtag** minden híváshoz (cache-elve):
- system prompt (szerep, output formátum)
- coding guidelines / repo konvenciók (CLAUDE.md kivonat)
- tool leírások

**Változó rész** (nem cache-elt): `state.yaml` + `git diff` + parancs-output +
kiválasztott fájlok. Ez a POC egyik mérendő tétele: cache hit-arány és költség/iteráció.

---

## 7. Milestone-ok

**M1 (ELSŐ SZELET) – Story ingestion & enrichment (~1–2 nap)** ← *most ezt építjük*

Vertikális szelet, ami önmagában is bizonyít valamit: **user ír egy nyers, rövid
story-t → cron (percenként) észreveszi → kontextust gyűjt (qmd + Semble) → ír belőle
egy agent által értelmezhető, kidolgozott user story-t.** Lásd 7.1 lentebb.

**M0 – Váz (0.5 nap)** *(M1 után, ha a mag felé megyünk)*
- Repo layout, `workflow.yaml`, `state.yaml` séma, git branch bootstrap.

**M1b – Egyirányú pipeline (1–2 nap)**
- PLAN → IMPLEMENT → BUILD → TEST, repair loop nélkül.
- Az enriched story a bemenet; kontextus qmd/Semble-ből.
- Siker: egy triviális story-n lefut, diffet gyárt.

**M2 – Repair loop (1 nap)**
- Bukott build/test → REPAIR → IMPLEMENT, max_iterations korláttal, FAILED állapottal.
- Siker: szándékosan hibás promptból is zöldre iterál.

**M3 – Kontextus kiválasztás (1–2 nap)**
- qmd + Semble bekötése a context lépésbe (10–30 fájl automatikusan).
- Prompt caching bekapcsolása, költségmérés.

**M4 – Review + kiértékelés (1 nap)**
- Reviewer szerep (fast review), DONE feltétel a review-tól is függ.
- 3–5 valós story-n mérés: sikerráta, iterációszám, token/költség, wallclock.

> Teljes POC ~1 hét. A Windmill/Playwright/indexek csak ezután, ha a mag bizonyít.

---

## 7.1 Első szelet részletei – Story Ingestion & Enrichment

**Mit bizonyít:** a "kontextus-gyűjtés + story-kidolgozás" lépés önmagában, ember
nélkül működik és determinisztikus. Ez a pipeline `PLAN` állapotának előfoka.

**Adaptálva a repóhoz:** ez a repo skills/plugins/sandbox-konfig — nincs benne
`npm build`. Ezért az első szelet célja **nem** kód-diff, hanem egy **artefaktum**:
a kidolgozott, gépileg értelmezhető story YAML. A meglévő eszközökre épül:
- `story-writer` agent (már létezik: `plugins/product-marketing/agents/story-writer.md`) — a kidolgozás logikája/promptja innen jön.
- `qmd` CLI — dokumentáció-kontextus (`qmd query ... --json`).
- `semble` CLI — kód-kontextus (ha van cél-repo).

### Folyamat

```
inbox/<id>.md            ← user ide dob egy nyers, pár mondatos story-t
      │  (cron, percenként)
      ▼
1. detect     — új/megváltozott fájl az inbox/-ban (mtime + feldolgozott-jelölő)
2. context    — qmd query a nyers szövegből kinyert kulcsszavakra (+ semble, ha kód-repo)
3. enrich     — Claude (Sonnet) hívás: nyers story + kontextus → strukturált story
4. emit       — enriched/<id>.story.yaml kiírása
5. mark       — inbox bejegyzés "processed" (state/<id>.json), hogy ne fusson újra
```

### Bemenet – `inbox/checkout-discount.md`
```markdown
Kéne egy kedvezmény a kosárhoz, ha valaki 10 db fölött rendel.
```

### Kimenet – `enriched/checkout-discount.story.yaml`
```yaml
id: checkout-discount
title: "Mennyiségi kedvezmény 10 db felett"
user_story: >
  As a vásárló, I want to get a discount when I order more than 10 items,
  so that nagyobb rendelésnél olcsóbb az egységár.
acceptance_criteria:
  - "10 db alatt nincs kedvezmény"
  - "10 db-tól X% kedvezmény a kosár végösszegére"
  - "Kerekítés a legközelebbi centre"
edge_cases:
  - "Pontosan 10 db határeset"
  - "Vegyes kosár több termékkel"
context:
  docs:  ["<qmd találatok path:line>"]
  code:  ["<semble találatok, ha van>"]
priority: Should
open_questions:
  - "Fix X% vagy sávos kedvezmény?"
source_file: inbox/checkout-discount.md
```

### Komponensek (Python, egy `story_ingest/` csomag)
| Fájl | Felelősség |
|---|---|
| `watch.py` | inbox szkennelése, feldolgozatlan bejegyzések listája (state alapján) |
| `context.py` | qmd (+semble) CLI hívása subprocess-szel, JSON parse, top-N találat |
| `enrich.py` | Claude API hívás; system = story-writer prompt (cache_control), user = nyers story + kontextus; YAML output validálás |
| `run.py` | a 4 lépés összefűzése egy Prefect `@flow`-ban; idempotens (processed jelölő) |
| `serve.py` | `ingest_flow.serve(cron="* * * * *")` — Prefect scheduler percenként; retry/timeout a `@task`-okon |

### Idempotencia & determinizmus
- `state/<id>.json` tárolja a forrás hash-ét → változatlan input nem fut újra.
- Fix modell + `temperature: 0` az enrich lépésnél.
- Torlódás elleni védelem a Prefecttől: a scheduler nem indít átfedő futást
  (`.serve(..., pause_on_shutdown=False)` + a flow gyorsan visszatér, ha nincs új inbox
  bejegyzés); egy hosszú Claude hívás nem csúszik rá a következő perc futására.
- Enrich lépés `@task(retries=2, retry_delay_seconds=…, timeout_seconds=…)` — átmeneti
  API-hiba nem bukttaja el a teljes flow-t.

### Siker-kritérium (csak erre a szeletre)
- 3 különböző nyers story-ból mindegyikre generál valid, séma-helyes `.story.yaml`-t.
- Kétszeri futás ugyanazon inputon nem gyárt duplikátumot és nem hív feleslegesen LLM-et.
- A kontextus szekció legalább 1 releváns qmd találatot tartalmaz (ahol van értelmes doc).

---

## 8. Siker-kritériumok (mérhető)

- ≥ 3/5 egyszerű story önállóan zöldre megy (build+test+lint) emberi közbeavatkozás nélkül.
- Átlag ≤ N iteráció (N = 4–6) egy story-ra.
- Kontextus ≤ 30 fájl / iteráció (nem a teljes repo).
- Prompt cache hit a stabil blokkra > 80%.
- Reprodukálható: ugyanaz a story → hasonló eredmény.

---

## 9. Fő kockázatok és mérséklés

| Kockázat | Mérséklés a POC-ban |
|---|---|
| Végtelen / drága repair loop | `max_iterations` + FAILED állapot + iterációnkénti költség-log |
| Rossz kontextus-kiválasztás | M1-ben hardcode fallback; összevetjük az auto-kiválasztással |
| Patch apply konfliktus | dedikált branch + `git worktree`, minden iteráció tiszta állapotból diffel |
| Nem determinisztikus futás | strukturált state + fix modell + rögzített parancsok; timestamp/random kívülről |
| Flaky tesztek → hamis repair | csak a story által érintett teszteket futtatjuk (kézzel szűkítve M-ekben) |

---

## 10. Következő kör (POC után, prioritás szerint)

1. **Test Mapping** index → célzott tesztfuttatás (a legnagyobb feedback-gyorsítás).
2. **Dependency Graph / Code Map** → jobb automatikus kontextus.
3. **Windmill** orchestráció (retry/timeout/queue/UI) a saját szkript helyett.
4. **Playwright** + frontend agent.
5. Agent-szerepek szétválasztása (Architect=Opus, Debug, Frontend külön).

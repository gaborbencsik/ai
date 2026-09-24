# Autonomous AI Development Workflow — Terv

> **Állapot:** konkrét terv (nem kód). Ez a dokumentum a korábbi chat-összefoglalót
> (LLM-használat, batch, caching, index-katalógus) **konkrét pipeline-tervvé** emeli,
> és egy helyen konszolidálja a `autonomous-dev-poc/AGENT-SANDBOX-PLAN.md` konténer-
> és provider-döntéseit. A régi kontextus-/költség-anyag a **8. szakaszban** él tovább.
>
> **Kódolás még nincs** — ez tervezési fázis.

---

## 0. Cél egy mondatban

Egy **user story létrejötte** indít el egy **több-állomásos, ember-kapuzott állapotgépet**,
amely — állomásonként **szabadon választott vendor + modell + harness** mellett — megírja,
megtervezi, lekódolja, teszteli és **agent-review-hurokban** addig csiszolja a változást,
amíg egy review-agent el nem fogadja, majd **pull requestet** nyit.

---

## 1. A pipeline állapotgép

```text
[user létrehoz egy story-t]  ──event trigger──►

  ① STORY WRITING        (vendor/modell A · agent-loop · kód-feltárás)
        │  kiír: részletes story + feltárt kontextus
        ▼
  ⏸ HUMAN GATE — a user confirmálja, hogy erre gondolt
        │                         └──(nem jó)──► vissza ①  (instrukcióval)
        │ confirm
        ▼
  ② PLANNING             (vendor/modell B · agent-loop / kontextus-gyűjtés)
        │  kiír: konkrét lépések + releváns kontextusok (10–30 fájl)
        ▼
  ③ CODING               (vendor/modell C · one-off sok kontextussal  VAGY  agent-loop)
        │  git branch-en: kód-módosítás
        ▼
  🧪 TESTS               (build / unit / integration / Playwright — a megfelelő pontokon)
        │
        ▼
  ④ REVIEW               (vendor/modell D · átnézi a diffet + a story-t)
        │
        ├─ elfogadva ─────────► PULL REQUEST ─────► DONE
        └─ elutasítva ──trigger instrukciókkal──► vissza ③  (fejlesztő agent)
                     ⟳ addig, amíg ④ el nem fogadja — de **max-iteráció + eszkaláció** (5. szakasz)
```

Kulcstulajdonságok, amiket a felhasználó rögzített:
- **Állomásonként külön** választható a vendor, a modell és a harness.
- **Emberi kapu** az ① után (confirm), a többi állomás **autonóm**.
- A ③↔④ egy **iteratív hurok** review-vezérléssel.
- A folyamat **megállítható / pufferelhető** és később, kontrolláltan indítható (4. szakasz).
- A ③ munkája **git branch-en** történik; a végén PR.

---

## 2. Három réteg, három független felelősség

A rendszer **három, egymásra merőleges** rétegből áll — egyik sem oldja meg a másik kettőt:

| Réteg | Kérdés, amit megold | Megvalósítás |
|---|---|---|
| **Orchestrátor** | *Mikor · milyen sorrendben · mi történik hibánál · hány fut egyszerre · mi a kapu* | **Prefect** (állapotgép, retry, concurrency, trigger, buffer) |
| **Izoláció / sandbox** | *Hol és milyen elszigeteltségben dolgozik az agent* | MVP: `docker run --rm` (restricted); ③↔④-nél **pontszerűen** container-use (6. szakasz) |
| **Provider** | *Melyik vendor melyik modellje, milyen harnesszel* | Vendor-független `Provider` + `Harness` absztrakció (7. szakasz) |

**Ez a szétválasztás a terv gerince.** A `workflow.yaml` minden állomáshoz egy
`{provider, model, harness}` hármast ad meg; az orchestráció determinisztikus marad
(nem egy „vezér-agent" dönti el, mi jön — a *flow* dönt).

---

## 3. Az állomások, állomásonkénti konfiggal

| Állomás | Provider / modell (MVP) | Harness (alap) | Kód-feltárás | Izoláció | Kimenet / kapu |
|---|---|---|---|---|---|
| **① Story writing** | **Anthropic** (Claude) | **agent-loop** (searchx/qmd/semble) | ✅ igen | olvasás (enyhe) | `stories/<id>.yaml` → **human confirm (file-move)** |
| **② Planning** | **Anthropic** (Claude) | agent-loop / kontextus-gyűjtés | ✅ igen | olvasás (enyhe) | `planned/<id>.yaml` (lépések + fájllista) |
| **③ Coding** | **Ollama Cloud** (GLM-4.6) | **one-off kódgen + agent-loop finomítás** | — | ✅ **erős, ír, branch** | `cu-<id>` branch + diff |
| **🧪 Tests** | — | — (parancsfuttatás) | — | ✅ | pass/fail → REVIEW vagy vissza ③ |
| **④ Review** | **Anthropic** (Claude) | agent-loop / one-off | olvasás | olvasás | accept → **PR**; reject → ③ (instrukcióval) |

**Provider-hozzárendelés elve (költség-optimum):** drága, okos modell (Claude) oda, ahol
az ítélőképesség / user-facing minőség kritikus (①②④); olcsó modell (GLM-4.6 @ Ollama
Cloud) a token-nehéz ③-ra, ahol a kimenetet a 🧪 tesztek + a ④ review úgyis validálják.
A ② terv minősége határozza meg a ③ költségét (jó terv = kevesebb review-kör), ezért ott
is a drágább, jobb modell térül meg. A ④ review-nál a **hibás elfogadás drágább**, mint a
review — később lehet olcsó elő-review (Ollama) → drága végszó (Claude) tiering.

**Harness a ③-ban provider szerint (a felhasználó szabálya):** ha **Anthropic** → agent-loop;
ha **Ollama** → **one-off kódgenerálás + agent-loop finomítás**. Az MVP ③ Ollama, tehát az
utóbbi.

Megjegyzések:
- **① kód-feltárást végez** → nem tiszta transzformáció, hanem **agent-loop** (a modell
  maga dönti el, mit néz meg: qmd/semble/searchx). Ez pontosítja a korábbi
  „enrich = one-shot" feltevést: az **one-shot csak a ③ opciója**.
- **③ kétféle harnesszel is mehet** — one-off (sok előre-összeszedett kontextussal,
  determinisztikusabb/olcsóbb) **vagy** agent-loop (iteratív, tool-használó). A
  `workflow.yaml` állomás-szinten állítja.
- **Tesztek a megfelelő pontokon**: a régi ív szerint build → unit → integration →
  Playwright; a `③↔④` hurokban minden körben a **releváns** teszt-részhalmaz fut
  (lásd Test Mapping, 8. szakasz), nem a teljes suite.

---

## 4. Trigger, buffer és manuális „release" (token-limit kezelés)

A felhasználó igénye: **esemény-trigger kell, de managelhető módon** — a folyamat
bizonyos ponton **megállítható**, a storyk **felduzzaszthatók**, és egy **megfelelő
időpontban** (pl. ha token-limitbe futnánk) kontrolláltan indíthatók.

**Megoldás: decoupled, artefakt-triggerelt állomások + kapuzott futtatás.**

- **Decoupled állomások:** minden állomás egy **állapot-átmenetre** indul, nem egy
  órákig `pause`-oló flow. A story a mappák között vándorol:
  `inbox/ → stories/ → confirmed/ → planned/ → coded/ → reviewed/ → done/`.
  Ez túléli az újraindítást és pontosan illik a meglévő inbox-mintához.
- **Human confirm = file-move (döntés):** az ① kimenete a `stories/<id>.yaml`; a user
  **átmozgatja** a fájlt a `confirmed/` mappába, ha jónak találja. A `confirmed/`-ben
  megjelenő fájl a ② trigger. Nincs Prefect `pause+input` — egyszerű, látható, verziózható,
  túléli az újraindítást. (Ha nem jó: a user visszamozgatja `inbox/`-ba instrukcióval, vagy
  töröl.)
- **Event trigger, managelhető módon:** az új artefakt (pl. `confirmed/<id>.yaml`)
  megjelenése a trigger, de a következő állomás **nem indul automatikusan**, ha egy
  **kapu** zárva van. A kapu lehet:
  - **globális pause flag** (`.pipeline/paused` fájl vagy Prefect deployment „paused"),
  - **állomás-szintű enable/disable** (pl. a drága ③ CODING külön kapcsolható),
  - **buffer + batch-release:** a `confirmed/` mappa **felduzzad**, és egy
    **manuális vagy időzített release** (cron ablak, vagy explicit „engedd el most"
    parancs) indítja a felgyűlt tételeket.
- **Buffer-release (döntés): kombinált terv, de MVP-ben még nem kell.** A cél-architektúra
  a három mód kombinációja — **manuális release** („engedd el most") ∨ **időablak-cron**
  (olcsó/éjszakai ablak) ∨ **budget-kapu** (token-keret elfogyott → záródik). MVP-ben a
  storyk egyszerűen áthaladnak, ha a globális pause nincs bekapcsolva; a kombinált
  release-logika **későbbi bővítés** (a mappa-buffer + a kapu-fájl már most megnyitja rá az utat).
- **Token-/rate-limit védelem:**
  - **concurrency-limit** állomásonként (pl. max 1–2 párhuzamos ③),
  - **budget-kapu:** ha a napi/időszaki token-keret elfogyott, a release-kapu záródik,
    a storyk a bufferben várnak,
  - **kontrollált időablak:** a felduzzasztott batch pl. éjszaka / olcsóbb ablakban fut.

> **Prefect illeszkedés:** deployment + schedule a triggerhez; `concurrency limits`
> a párhuzamhoz; a pause/kapu lehet flow-szintű feltétel-ellenőrzés (a kapu-fájl /
> budget-állapot olvasása a flow elején, és korai „skip", ha zárva). A buffer maga a
> mappa — nincs szükség külső queue-ra a POC-hoz.

---

## 5. Review-hurok: max-iteráció + eszkaláció

A `③↔④` hurok **nem mehet a végtelenségig** (token-égés / beragadás ellen):

- **Max-iteráció** storynként: **`MAX_REVIEW_ROUNDS = 3` (döntés)**, a `planner state`-ben
  számlálva (8. szakasz, „Planner State").
- **Eszkaláció a plafonnál:** ha a review N kör után sem fogad el, a story
  `escalated/<id>.yaml`-be kerül, **emberi beavatkozásra vár** (a review utolsó
  indoklásával + a diff-fel + a teszt-outputtal együtt), és a folyamat **nem** nyit PR-t.
- **Kör-artefaktumok:** minden review-kör kimenete (accept/reject + indoklás +
  instrukciók a ③-nak) naplózódik, hogy az eszkalációkor ember látja a történetet.
- **Determinisztikus terminálás:** a hurkot az **orchestrátor** számolja és zárja
  (nem az agent önmérséklete) — így garantált a leállás.

---

## 6. Izoláció és branch-modell

**MVP: saját `docker run --rm`** a meglévő `docker.sock`-on (részletek:
`autonomous-dev-poc/AGENT-SANDBOX-PLAN.md`). Restricted konténer: `--cap-drop ALL`,
`--read-only` + `--tmpfs`, memória/pids/cpu limit, `--network` csak a provider
végpontjára, `--security-opt no-new-privileges`. A titok **`env://<PROVIDER>_API_KEY`
mintával** (a container-use secret-modelljéből átvéve): env-ként a konténerben, a
modell nem látja az értékét, a logból kiszűrve.

**`docker.sock` bekötés — mivel jár (döntéshez):** a flow ma egy konténerben fut, amibe a
Docker socket **nincs** bekötve. Ahhoz, hogy a flow eldobható agent-konténert indíthasson,
a flow konténerének hozzá kell férnie a Docker démonhoz (`-v /var/run/docker.sock:...` +
`docker` CLI a flow image-ben). **Kockázat:** aki eléri a `docker.sock`-ot, az gyakorlatilag
**root a hoston** (privilegizált konténer indítása, host-FS mount, host-root escape). A
`docker run` szigorító flag-jei az **elindított** konténert korlátozzák, **nem** a flow
hatalmát a Docker fölött. **Enyhítő tény ebben a sandboxban:** az agent **már most** a
`docker` csoportban van, tehát a sandbox fenyegetési modelljén belül ez **nem új képesség**
— a hoston kívülre nem gyengíti az izolációt. **Szigorítási upgrade-út (később):**
`tecnativa/docker-socket-proxy`, ami csak a szükséges Docker API-hívásokat engedi
(`container create/start/remove`), a többit tiltja. **MVP-döntés: közvetlen mount**
(a sandbox amúgy is docker-képes), a socket-proxy a későbbi szigorítás.
(`cu-<id>` v. `feat/<id>`), a diff review-zható, és elfogadáskor ebből lesz a PR.
A PR a sandbox git-auth mintáján megy (push a sandboxból, lásd `CLAUDE.md`).

**container-use — pontszerűen, nem ráépítve (a felhasználó döntése):**
- **Hol térül meg:** kizárólag a **③↔④ coding/review hurokban**, ahol a
  *git-branch-per-agent izoláció + „mit csinált tényleg" log + checkout/diff review*
  natív erősség. A könnyű ① / ② állomáshoz **nem** kell.
- **Hogyan használjuk részfeladatra, nem alapként:** a Prefect flow marad az
  orchestrátor és a trigger; a ③ konkrét futtatását **opcionálisan** delegálhatjuk
  container-use environmentbe (Dagger + git-branch), majd a `cu diff` / `cu apply`
  eredményét visszavesszük a pipeline artefakt-modelljébe. A rendszer **nem** container-use-ra
  épül — ha kivesszük, csak a ③ izolációs backendje cserélődik.
- **Nyitott spike (implementáció előtt):** a container-use **agent-driven MCP** modellre
  készült; a mi flow-nk **flow-driven**. **Döntés (a felhasználóra bízva): marad a sima
  `docker run` + saját branch-kezelés — (c).** A container-use egyszerű, de **kihagyható**;
  nem építünk rá. Ha később a párhuzamos, sok-agentes fázis indokolja, egy idődobozolt
  spike dönti el, hogy (a) flow-ból hívjuk-e vagy (b) a **Dagger SDK**-t közvetlenül — de ez
  **nem MVP-tétel**. A ③ izolációs backendje cserélhető marad, tehát a (c)→(a/b) upgrade
  bármikor megtehető a flow-mag érintése nélkül.

---

## 7. Vendor-független Provider + Harness réteg (future-proof)

A felhasználó explicit elve: **ne épüljön egyetlen vendorra**. Két merőleges absztrakció:

1. **`Provider`** — a puszta modell-hívás: `generate(system, user) -> str`.
   - Preferált közös implementáció: **egy OpenAI-kompatibilis adapter**
     (`base_url` + `model` + kulcs), ami sok vendort kiszolgál.
   - **Megerősített OpenAI-kompat végpontok:** Ollama Cloud `https://ollama.com/v1`;
     Gemini `https://generativelanguage.googleapis.com/v1beta/openai/`.
   - Ahol nincs OpenAI-kompat mód → vendor-specifikus adapter (pl. natív Anthropic).
   - Kapcsoló: `INGEST_PROVIDER=...` **szabad szöveg** (nem fix enum) — új vendor = új adapter.
   - Opcionális gateway (LiteLLM / OpenRouter): egyetlen OpenAI-formátumú végpont sok
     modell fölött, retry/fallback/költség-követéssel — a legerősebb vendor-függetlenség.
2. **`Harness`** — hogyan használjuk a providert:
   - `OneShotHarness` → egy `generate` + séma-validáció + **repair-kör**.
   - `AgentHarness` → teljes agent-loop (tool-használat: searchx/qmd/semble, fájlírás).
   - **Mindkettő egyszerre él**, állomásonként választva (`workflow.yaml`: `harness: oneshot|agent`).

**Future-proof garanciák:**
- A flow-mag (állapotgép, artefakt-átadás, kapuk, séma-validáció) **provider- és
  harness-független** — a modell és a harness cserélhető anélkül, hogy az orchestráció
  változna.
- Auth **egységes, közvetlen kulcs** minden providernél (`<PROVIDER>_API_KEY` env +
  a végpont domainjének engedélyezése host-oldalon `sbx policy allow network`) — nincs
  vendor-specifikus proxy-áthidalás.
- Az izolációs backend (docker run ↔ container-use/Dagger) is **cserélhető** a ③ mögött.

---

## 8. Kontextus és költség (a korábbi anyag, beépítve)

Ez a szakasz a rendszer **költség- és minőség-motorja** — a ①②③ állomások ezt
használják a „10–30 releváns fájl a 4000 helyett" elvhez.

### LLM-használat mintája
Nem egyetlen nagy hívás, hanem **sok kicsi, állapotalapú** hívás (egy story akár
20–100 modell-hívás a teljes hurokban). Ezért a **rövid, állapotalapú iteráció**
hosszú chat helyett kulcsfontosságú.

### Költségoptimalizálás sorrendben (fő tanulság)
1. **Prompt Caching** a stabil rendszerpromptokra és guideline-okra (system prompt,
   coding guidelines, architecture, repo-konvenciók). Iterációnként csak a **változó**
   rész megy: aktuális feladat + git diff + teszt-output + aktuális fájlok.
2. **Releváns kontextus kiválasztása** (10–30 fájl), nem a teljes repo.
3. **Rövid, állapotalapú iterációk** (a „memória" = git diff + TODO + failed tests +
   planner state + issue state, **nem** a teljes chat).
4. **Gazdag projektindexek** a planner döntéseihez (lásd lent).

### Batch API — hol jó, hol nem
Batch **nem** alkalmas az iteratív `kód → teszt → kód` hurokra (nincs azonnali válasz,
nincs iteráció). **Jó** független, nem-iteratív tömegmunkára: dokumentáció-generálás,
tömeges review, backlog-storyk első implementációja. Kiegészítő optimalizáció, nem alap.

### Meglévő index-réteg
- **qmd** — markdown/dokumentáció: BM25 + vektor + HyDE, SQLite index, embedding cache.
  („Melyik dokumentáció vonatkozik erre a story-ra?")
- **semble** — szemantikus kódkeresés viselkedés alapján. („Hol számolódik az ár?")
- A kettő együtt adja a planner **candidate files/docs** halmazát.

### Hiányzó indexek (prioritás szerint) — future-proof kontextus-motor
- **Magas:** Test Mapping (fájl→tesztek: csak a releváns teszt fusson), Dependency Graph
  (import-kapcsolatok), Call Graph (ki hív kit), Code Map (fájl→calls/calledBy/tests JSON).
- **Közepes:** Git Co-change Index (mi szokott együtt változni), Symbol Index.
- **Alacsonyabb:** Module Ownership, **Planner State** (a workflow-memória; egyben a
  review-hurok **iteráció-számlálója**, lásd 5. szakasz).

### Javasolt kontextus-folyam (a ② PLANNING-ben)
```
Story → (qmd + semble) → candidate files/docs
      → Dependency Graph → Test Mapping → Git Co-change
      → Planner: kiválaszt 10–30 fájlt → átadja ③-nak
```

---

## 9. Döntések státusza

**Lezárt döntések (a felhasználó rögzítette):**

1. ✅ **Confirm-mechanizmus (① után):** **file-move** — a user átmozgatja a `stories/<id>.yaml`-t
   a `confirmed/` mappába. Nincs Prefect `pause+input`. (3–4. szakasz)
2. ✅ **Buffer-release:** **kombinált terv** (manuális ∨ időablak-cron ∨ budget-kapu), de
   **MVP-ben még nem kell** — a mappa-buffer + kapu-fájl megnyitja rá az utat. (4. szakasz)
3. ✅ **Provider/modell állomásonként:** **①②④ = Anthropic (Claude)**, **③ = Ollama Cloud (GLM-4.6)**.
   Elv: drága-okos modell a user-facing / ítélet-kritikus állomásokra, olcsó a token-nehéz ③-ra
   (teszt + review validál). (3. szakasz)
4. ✅ **③ harness:** provider-függő — Anthropic → agent-loop; **Ollama → one-off kódgen +
   agent-loop finomítás** (az MVP ③ Ollama, tehát ez). (3. szakasz)
5. ✅ **container-use spike:** **(c) marad `docker run` + saját branch** — container-use egyszerű,
   de kihagyható; nem építünk rá. (a)/(b) csak későbbi, nem-MVP upgrade. (6. szakasz)
6. ✅ **Review-plafon:** **`MAX_REVIEW_ROUNDS = 3`**, utána `escalated/<id>.yaml`. (5. szakasz)
7. ✅ **`docker.sock` bekötése:** **közvetlen mount az MVP-hez** (a sandbox amúgy is docker-képes,
   nincs új kitettség a hoston kívül); a `docker-socket-proxy` a későbbi szigorítás. (6. szakasz)

**Implementációs részletek (rögzítve):**

- ✅ **Eszkalációs értesítés:** egyelőre **elég, hogy a fájl ott van** az `escalated/`-ben —
   nincs külön aktív értesítés az MVP-ben. (Később bővíthető jelzőfájllal / log-sorral.)
- ✅ **② → ③ kontextus-átadás:** a `planned/<id>.yaml` **explicit sémát** kap (lépések listája +
   a kiválasztott 10–30 fájl útvonala); a ③ kizárólag ehhez az artefaktumhoz igazodik.
   A séma pontos mezőit az implementáció első lépéseként rögzítjük.
- ✅ **Ollama GLM-4.6 structured-output:** a ③ one-off kódgen kimenete **validálva** van, és
   hiba esetén **repair-kör** fut (a `OneShotHarness` mintája, 7. szakasz) — GLM-nél ez
   kötelező elem, nem opció.

---

## 10. Források

- `dagger/container-use` — MCP-server + `cu` CLI, Dagger + git-worktree; „works with
  any agent/model — no vendor lock-in" (infra-szintű, **nem** modell-szintű
  függetlenség). Secret-sémák: `env://`, `op://`, `vault://`, `file://` (a modell nem
  látja az értéket, logból kiszűrve). Env-konfig: `.container-use/environment.json`
  (base-image, setup/install, env, secret). *README/docs alapján, searxng-en át.*
- **Ollama OpenAI-kompatibilitás** — `https://ollama.com/v1`. *Megerősítve.*
- **Gemini OpenAI-kompatibilitás** — `https://generativelanguage.googleapis.com/v1beta/openai/`
  (`ai.google.dev/gemini-api/docs/openai`). *Megerősítve.*
- **LiteLLM proxy / OpenRouter** — egységes OpenAI-formátumú végpont sok modell fölött.
  *(Frissen nem ellenőrzött — keresőmotor rate-limit; implementáció előtt megerősítendő.)*
- **Anthropic OpenAI-kompat mód** — *(Frissen nem ellenőrzött — ua.)*
- Konténer-/auth-részletek: `autonomous-dev-poc/AGENT-SANDBOX-PLAN.md`.

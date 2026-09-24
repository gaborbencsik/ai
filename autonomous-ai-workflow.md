# Autonomous AI Software Development Workflow – Összefoglaló

## Cél

Egy olyan **nem interaktív AI fejlesztő workflow** létrehozása, amely egy jól kidolgozott user story alapján önállóan:

- megérti a követelményt,
- feltérképezi a kódot,
- megtervezi a módosításokat,
- implementál,
- teszteket futtat,
- ellenőrzi a frontendet Playwright segítségével,
- review-zza saját munkáját,
- javítja a hibákat,
- addig iterál, amíg minden ellenőrzés sikeres.

A rendszer célja egy "autonóm fejlesztő" jellegű pipeline, nem pedig egy chat alapú asszisztens.

---

# Alapelv

Nem egyetlen nagy AI agentet érdemes építeni.

Jobb egy:

```
State Machine + Specialized Agents + Tools
```

architektúra.

Az LLM csak egy komponens.

A workflow vezérlése determinisztikus:

```
Story
 ↓
Planning
 ↓
Context Discovery
 ↓
Implementation
 ↓
Verification
 ↓
Repair Loop
 ↓
Review
 ↓
Done
```

---

# Magas szintű architektúra

```
                    Story
                      |
                      v

              Workflow Engine

                      |
        +-------------+-------------+
        |             |             |
        v             v             v

    Planner       Developer      Reviewer

        |             |             |

        +-------------+-------------+

                      |

               Sandbox Environment

                      |

       +--------------+--------------+
       |              |              |

      Git          Tests        Playwright

       |              |              |

       +--------------+--------------+

                      |

              Result Analyzer

                      |

              Success?

              /      \

            Yes       No

            |          |

          Done     Repair Agent

                       |
                       v

                    Iterate
```

---

# Workflow engine választás

## Windmill

A Windmill jó választás erre.

Nem azért, mert AI framework, hanem mert workflow orchestrátor.

Erősségei:

- workflow kezelés
- retry
- timeout
- queue
- state kezelés
- UI
- logok
- hosszú futású folyamatok

Jól illik:

- sandbox futtatáshoz
- CI/CD jellegű pipeline-okhoz
- AI agent lépések összekötéséhez

---

# Alternatívák

## Temporal

Erős:

- durable workflow
- komplex state
- enterprise szint

Hátrány:

- komplexebb
- több infrastruktúra

---

## Inngest

Előny:

- egyszerűbb
- event driven
- fejlesztőbarát

---

## Trigger.dev

Jó választás lehet:

- TypeScript stack
- developer workflow
- AI taskok

---

## Kestra

Jó:

- általános workflow engine
- adat pipeline-ok

---

## LangGraph / CrewAI / AutoGen

Nem első választás.

Ezek inkább:

- agent frameworkök
- beszélgetés-orientált rendszerek

A jelenlegi cél inkább:

```
workflow engine
+
AI döntési pontok
```

nem pedig egy folyamatos AI chat.

---

# Ajánlott stack

```
Windmill

+

Docker sandbox

+

Claude API

+

Git

+

Playwright MCP

+

qmd

+

Semble

+

Test Runner

+

CI tools
```

---

# Agent felosztás

Nem egyetlen univerzális agent.

Hanem szerepkörök.

---

# 1. Story Analyzer Agent

Feladata:

- story értelmezése
- acceptance criteria bontása
- érintett területek felismerése

Modell:

- Haiku
- Sonnet

Output:

```yaml
areas:
  - frontend
  - backend

risks:
  - migration

tasks:
  - update API
  - update UI
```

---

# 2. Architect Agent

Feladata:

- nagy döntések
- rendszerhatások
- API design
- migrációs stratégia

Modell:

- Opus
- erősebb reasoning modell

Használat:

ritkán, de fontos pontokon.

---

# 3. Context Discovery Agent

Feladata:

- qmd használata
- Semble használata
- releváns fájlok keresése

Modell:

- Haiku
- Sonnet

Output:

```yaml
files:
  - OrderService.ts
  - Checkout.tsx
  - Order.test.ts
```

---

# 4. Implementation Agent

Feladata:

- kód írás
- refaktor
- patch készítés

Modell:

- Sonnet

Ez végzi a legtöbb munkát.

---

# 5. Debug Agent

Feladata:

Input:

```
test failed

Expected 200
Received 401
```

Output:

- hibakeresés
- javítás

Modell:

- Sonnet

---

# 6. Frontend Agent

Feladata:

- React/Vue/Angular módosítás
- Playwright MCP
- screenshot elemzés

Modell:

- Sonnet

---

# 7. Reviewer Agent

Két szint:

## Fast Review

Feladat:

- lint
- egyszerű hibák
- style

Modell:

- Haiku

---

## Deep Review

Feladat:

- architecture
- security
- edge case-ek

Modell:

- Opus / erősebb reasoning modell

---

# Fable jellegű erősebb modell szerepe

Ha rendelkezésre áll egy Opusnál is erősebb reasoning modell:

Nem napi fejlesztésre.

Hanem:

## Architecture

Példa:

```
Monolith → Service separation
```

Elemzés:

- tradeoffok
- migráció
- kockázatok

---

## Komplex hibakeresés

Példa:

```
Production race condition
```

---

## Security review

Példa:

```
Authentication redesign
```

---

## Nagy refaktor tervezése

Először:

```
Current state

↓

Migration plan

↓

Risks

↓

Execution
```

Utána Sonnet implementál.

---

# Skill set-ek

Minden agent saját skill csomagot kap.

Példa:

```
agents/

 story-analyzer/
   system.md
   tools:
     - qmd


 architect/
   system.md
   tools:
     - qmd
     - semble


 backend-agent/
   system.md
   tools:
     - terminal
     - git


 frontend-agent/
   system.md
   tools:
     - playwright


 reviewer/
   system.md
```

---

# Prompt caching stratégia

A workflow minden agentje ugyanazokat a szabályokat használja.

Cache-elhető:

- system prompt
- coding guideline
- architecture
- repository rules
- tool instrukciók

Nem kell minden iterációban újraküldeni.

Új kérés:

```
Cached context

+

Story

+

Current diff

+

Test output
```

---

# Kontextus kezelés

Kerülendő:

```
Teljes chat history
```

Helyette:

strukturált állapot:

```yaml
story:
  checkout-discount

changed_files:
  - OrderService.ts

failed_tests:
  - checkout.spec.ts

todo:
  - update docs

known_issues:
  - lint error line 52
```

---

# Indexelés és kódismeret

A cél:

Ne:

```
4000 fájl
```

hanem:

```
10-30 releváns fájl
```

---

# Jelenlegi megoldások

## qmd

Feladata:

Dokumentáció indexelés.

Index:

- markdown fájlok
- BM25
- embedding
- vector search

Használat:

- README
- ADR
- specifikáció
- architecture docs

---

## Semble

Feladata:

Kód szemantikus keresése.

Képes:

- intent alapú keresésre
- kapcsolódó kód feltárására
- ismeretlen kódbázis navigálására

Példa:

```
Hol történik az ár kalkuláció?
```

---

# Hiányzó index rétegek

## 1. Dependency Graph

Import kapcsolatok.

Példa:

```
CheckoutController

↓

OrderService

↓

PaymentService
```

---

## 2. Call Graph

Függvényhívások.

Példa:

```
createOrder()

↓

OrderService

↓

PaymentService.authorize()
```

---

## 3. Symbol Index

Tárol:

- class
- interface
- function
- export
- import

---

## 4. Test Mapping

Nagyon fontos.

Példa:

```
JwtService.ts

↓

JwtService.test.ts

↓

login.spec.ts
```

Segít:

- célzott tesztfuttatás
- gyorsabb feedback

---

## 5. Git Co-change Index

Git history alapján.

Példa:

```
OrderService.ts
```

gyakran együtt változik:

```
OrderDto.ts

OrderRepository.ts

CheckoutController.ts
```

---

## 6. Module Ownership

Projekt tudás:

```
Auth

↓

JWT

↓

Refresh Token

↓

Permissions
```

---

## 7. Code Map

Talán a legértékesebb extra réteg.

Példa:

```json
{
  "OrderService": {
    "file": "OrderService.ts",
    "calls": [
      "PaymentService"
    ],
    "calledBy": [
      "CheckoutController"
    ],
    "tests": [
      "OrderService.test.ts"
    ]
  }
}
```

Ez már nem kereső.

Ez projekt tudás.

---

# Ajánlott végső architektúra

```
                         Story

                           |

                     Story Analyzer

                           |

              +------------+------------+

              |                         |

             qmd                    Semble

              |                         |

              +------------+------------+

                           |

                  Context Builder

                           |

              Dependency/Test/Code Map

                           |

                       Planner

                           |

              +------------+------------+

              |                         |

        Backend Agent             Frontend Agent

              |                         |

              +------------+------------+

                           |

                    Verification

              +------------+------------+

              |                         |

            Tests                 Playwright

              |                         |

              +------------+------------+

                           |

                      Reviewer

                           |

                         DONE
```

---

# Prioritási sorrend

## Már megvan

✅ qmd  
✅ Semble  
✅ MCP  
✅ Sandbox  
✅ Playwright  

---

## Elsőként hozzáadni

1. Test Mapping
2. Dependency Graph
3. Code Map
4. Call Graph

---

## Második kör

5. Git Co-change
6. Symbol Index
7. Module Ownership

---

# Fő stratégiai tanulság

A legjobb autonóm fejlesztő rendszer nem egy nagy AI agent.

Hanem:

```
jó workflow

+

jó projektindex

+

specializált agentek

+

jó kontextus kiválasztás

+

erős ellenőrzési ciklus
```

A modell legyen döntési motor.

A rendszer többi része biztosítsa:

- a megfelelő fájlokat,
- a megfelelő eszközöket,
- a megfelelő állapotot,
- a megfelelő ellenőrzéseket.
    
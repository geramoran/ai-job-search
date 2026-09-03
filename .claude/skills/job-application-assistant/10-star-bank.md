---
framework_version: 1.0.0
---

# STAR Answer Bank

<!-- Imported from three Notion pages on 2026-09-02 and reconciled against 01-candidate-profile.md. -->
<!-- Sources: "Guía Completa de Preparación para Entrevista" (last edited 2025-07-27), the earlier -->
<!-- version of the same page (2025-06-30), and "Pitch entrevista de trabajos en ingles" (2025-06-20). -->

`07-interview-prep.md` lists the stories worth telling and what still has to be filled in. **This file
holds the answers that already exist**, written out and ready to rehearse. The two are meant to be read
together: 07 is the map, this is the delivery.

## How to use this file

Every answer carries an evidence tag. **Do not upgrade a tag without new evidence.**

| Tag | Meaning |
|-----|---------|
| **Documented** | Backed by a document, an artifact, or a repo in this workspace |
| **Self-reported** | The candidate's own recollection, confirmed by him but with nothing to show. Safe to say, but never dressed up with numbers he cannot defend |
| **Quarantined** | Present in the Notion notes and **not usable**. Listed at the bottom with the reason. Do not move anything out of quarantine without asking him |

Two rules that override anything the Notion text says:

1. **The imported notes are one to three years old and were written to an older, weaker version of the
   profile.** They say five years of experience, then seven. It is **nine**, from February 2017. They
   sell PHP plus VueJS with no mention of AI. That is not the positioning any more.
2. **Most of the numbers in those notes were invented** — by an earlier AI pass, judging by their shape
   ("40% less processing time", "99% uptime"). They are all quarantined. The only three real numbers are
   the ones in `CLAUDE.md`: 50-200 daily packages with 12 drivers on ProntoForms, the unquantified
   distributor-quota increase at Batta, and the Asta POS becoming a top revenue line.

---

## 1. Laravel performance: Eloquent out of the hot path

**Answers:** "tell me about a complex technical problem you solved", "how do you approach performance",
"when have you gone against the framework's default way of doing things", "how do you handle stress"
(the version below where the plan comes first).

**Where:** the ATT / ProntoForms warehouse and delivery platform, 2020-2021. Freelance, sole developer.
**Confirmed by the candidate 2026-09-02** — the Notion notes did not name the company and it was worth
pinning down, because the answer only lands if he can describe the system around it.
**Evidence:** Self-reported for the optimisation itself; the platform and its scale are Documented.

### Español

- **Situación:** "Desarrollé solo la plataforma de gestión de almacén y entregas de un cliente, en Laravel
  8. Con el sistema ya en producción empecé a ver tiempos de respuesta lentos e inestabilidad ocasional en
  los picos de uso, que es justo cuando la operación no puede esperar: entre 50 y 200 paquetes diarios y 12
  repartidores dependían de ella todos los días."
- **Tarea:** "Encontrar la causa raíz y bajar la carga del servidor PHP sin interrumpir la operación, porque
  no había ventana de mantenimiento cómoda."
- **Acción:** "Al analizar los cuellos de botella vi que la dependencia fuerte de Eloquent se estaba
  comiendo el servidor en las operaciones de alta frecuencia: mucho objeto hidratado para consultas que en
  el fondo eran agregaciones. Refactoricé esas rutas críticas a procedimientos almacenados de MySQL,
  moviendo la lógica pesada a la capa de base de datos y dejando Laravel para el resto. No migré todo:
  solo lo que el perfilado señalaba."
- **Resultado:** "Los tiempos de respuesta bajaron y se acabaron las interrupciones en horas pico. El
  sistema aguantó carga alta sin degradarse. El costo que acepté a cambio, y lo digo porque es real, es
  que esa lógica dejó de estar en el repositorio y pasó a vivir en la base de datos, así que la documenté
  para no dejar una trampa."

### English

- **Situation:** "I was the only developer on a warehouse and delivery platform built with Laravel 8. Once
  it was in production, I saw slow response times and some instability at peak hours. That was the worst
  moment for it: 50 to 200 packages a day, and 12 drivers depending on the system every day."
- **Task:** "Find the root cause and reduce the load on the PHP server, without stopping the operation."
- **Action:** "I profiled the bottlenecks. Our heavy use of Eloquent was consuming most of the PHP server
  resources on the high-frequency operations. I refactored those critical paths to MySQL stored
  procedures, so the heavy logic ran in the database and Laravel handled the rest. I only moved what the
  profiling pointed at."
- **Result:** "Response times went down and the service interruptions stopped. The system stayed stable
  under load. The trade-off, and I want to be honest about it, is that this logic now lives in the
  database instead of the repository, so I documented it."

**Follow-ups to expect:** why not caching or eager loading first (have an answer — this is the obvious
objection); how you measured before and after; how the stored procedures are versioned and deployed; what
you would do differently today.

---

## 2. Learning Ionic and Angular in a week

**Answers:** "describe a time you had to learn a technology fast", "how do you handle unfamiliar code",
"tell me about working outside your comfort zone", "biggest strength" (adaptability).

**Where:** Grupo Batta Hermanos, 2019.
**Evidence:** Self-reported. The apps and the outcome are Documented in the profile; the one-week and
one-month timings are his recollection.

**Correction applied 2026-09-02:** the app was **inherited from an external vendor** and he adapted it and
carried it forward alone. There was **no internal mobile team** — the teamwork story built on that premise
is quarantined below.

### Español

- **Situación:** "En 2019, en Grupo Batta, me asignaron una aplicación móvil para que el personal del área
  de clientes subiera prospectos para autorización de créditos. El problema es que yo venía de desarrollo
  web: Ionic y Angular no los había tocado, y la aplicación base la había hecho una compañía externa, así
  que tenía que entender código ajeno en una tecnología que no conocía."
- **Tarea:** "Aprender Ionic y Angular desde cero, adaptar esa aplicación existente y conectarla con
  nuestro Web API en .NET Core, en tiempo corto."
- **Acción:** "Para .NET Core y Entity Framework sí tenía apoyo dentro de la empresa; para Ionic y Angular
  no había nadie, así que fue autoaprendizaje: documentación oficial, tutoriales y experimentar
  directamente sobre el código heredado hasta entender cómo estaba armado. Empecé por hacerla correr y
  entender el flujo antes de cambiar nada."
- **Resultado:** "En una semana la tenía funcionando y conectada, y en un mes había entregado todos los
  ajustes que pidió la dirección. Salió a producción y siguió operando. De ahí salió también la segunda
  app, que ya construí completa."

### English

- **Situation:** "In 2019 at Grupo Batta, I was assigned a mobile app for the client service team to upload
  credit authorisation prospects. I came from web development. I had never used Ionic or Angular, and the
  base app was built by an outside company, so it was unfamiliar code in an unfamiliar technology."
- **Task:** "Learn Ionic and Angular from scratch, adapt that app, and connect it to our .NET Core Web API,
  in a short time."
- **Action:** "I had support inside the company for .NET Core and Entity Framework. For Ionic and Angular
  there was nobody, so I learned on my own: official documentation, tutorials, and experimenting on the
  inherited code until I understood how it was built. First I made it run and followed the flow, then I
  changed things."
- **Result:** "It was working and connected in one week, and I delivered every adjustment management asked
  for within a month. It went to production and stayed there. The second app came after that one, and I
  built it completely."

**Follow-ups to expect:** what was wrong with the vendor's code; what you would have rewritten with more
time; how you tested a hybrid app in 2019; why Ionic rather than native.

---

## 3. Onboarding new developers at MySourcing

**Answers:** "tell me about teamwork", "have you mentored anyone", "how do you transfer knowledge",
"describe a responsibility you were given beyond writing code".

**Where:** MySourcing, roughly 2025 onward, after three years in the company.
**Evidence:** Self-reported. **Confirmed by the candidate 2026-09-02 as a formally assigned
responsibility**, not something informal he volunteered for.

**Read this before using it.** The profile's rule is *no people-management claims*, and it still holds:
no headcount, no hiring, no performance reviews, no "I led a team of X". What is true and sayable is
narrower and more credible — he was **given responsibility for bringing new developers into the system**.
Say that, and let the interviewer ask for more.

### Español

- **Situación:** "En MySourcing trabajábamos bajo Scrum. Como era el que más tiempo llevaba en el sistema,
  más de tres años, me asignaron la integración de los desarrolladores nuevos al equipo."
- **Tarea:** "Acortar la curva de aprendizaje para que pudieran contribuir al sistema pronto, sin que el
  equipo perdiera velocidad mientras tanto."
- **Acción:** "Armé una introducción estructurada en vez de dejarlos leer código a ciegas: les explicaba la
  arquitectura y por qué estaba así, les asignaba tareas iniciales progresivas en vez de tirarlos al
  módulo más complicado, revisaba sus entregas y les daba retroalimentación concreta, no solo 'aprobado'."
- **Resultado:** "Los nuevos se adaptaron bastante más rápido al sistema y el equipo mantuvo su ritmo. No
  tengo una métrica formal de esto, es mi observación y la del equipo."

### English

- **Situation:** "At MySourcing we worked with Scrum. I had been with the system longer than anyone else,
  more than three years, so I was given responsibility for bringing new developers into the team."
- **Task:** "Shorten their learning curve so they could contribute soon, without slowing the team down in
  the meantime."
- **Action:** "I built a structured introduction instead of letting them read code alone. I explained the
  architecture and the reasons behind it, gave them progressive first tasks instead of the hardest module,
  reviewed their work, and gave specific feedback rather than just approving it."
- **Result:** "New developers got productive on the system noticeably faster and the team kept its pace. I
  don't have a formal metric for this. It is my observation and the team's."

**Follow-ups to expect:** how many developers (answer honestly, and do not inflate); what you would change
about the onboarding; how you handled someone who was not improving; whether you wrote documentation that
outlived the conversation. **If asked whether you managed them, say no** — it was technical onboarding,
and the hiring and evaluation were not yours.

---

## 4. First contact with TypeScript at BOZ IT

**Answers:** "learning a new language on the job", "how do you get productive in a new stack", "adaptability".

**Where:** BOZ IT Development, January to April 2022.
**Evidence:** Self-reported. The role and stack are Documented.

**Correction applied:** the Notion note says three months. The engagement was **January to April 2022**,
so say four, or say "the length of the engagement" and avoid the number.

- **Situación:** "Entré a BOZ IT a trabajar en módulos de nómina y proyección financiera, y el stack era
  TypeScript con Node y SQL Server. Yo venía de PHP y JavaScript sin tipos."
- **Tarea:** "Entregar módulos funcionales dentro del proyecto, con lógica transaccional donde un error de
  cálculo se ve directo en el dinero de alguien."
- **Acción:** "Estudié la documentación, tomé cursos y practiqué en proyectos pequeños fuera del horario.
  Dentro del proyecto me apoyé en el compilador como red de seguridad: tipar bien los cálculos me evitó
  errores que en JavaScript plano habrían llegado a producción."
- **Resultado:** "Entregué a tiempo, y TypeScript dejó de ser algo nuevo: hoy es la base de casi todo lo
  que construyo, incluido el motor de costeo de CostoPreciso."

**English framing note:** end this one on the arc, not the course. "That was my first TypeScript project.
Today it is the base of almost everything I build" is the sentence that makes it worth telling in 2026.

---

## 5. The payroll calculation bug

**Answers:** "tell me about a production bug under pressure", "how do you debug something you did not write",
"a time you worked to a hard deadline".

**Where:** MySourcing, 2022-2024 stage, the payroll engine.
**Evidence:** Self-reported, and **thinner than the others**. The Notion version carried a placeholder for
money saved ("evitando pérdidas de \$X"), which is the tell that the number was never real. Use the story,
never a figure.

- **Situación:** "El sistema de nóminas atendía a varias empresas y aparecieron errores de cálculo que
  afectaban a más de una a la vez. En nómina eso no es un bug cosmético: es el pago de gente real y hay
  fecha."
- **Tarea:** "Encontrar la causa y corregir sin frenar la operación de las demás empresas."
- **Acción:** "Revisé logs, reproduje el error en un ambiente de pruebas hasta aislarlo al módulo de
  cálculo en JavaScript, y desarrollé el parche sobre esa reproducción, no sobre producción."
- **Resultado:** "Quedó resuelto en un par de días y el cálculo volvió a ser confiable."

**Only tell this one if you can answer the follow-up**: what the bug actually was, and what stopped it from
happening again. A debugging story with no root cause sounds rehearsed. If the specifics are gone, use
story 1 instead.

---

## 6. The POS that became a revenue line

**Answers:** "an achievement you are proud of", "something you built that outlasted you", "shipping to
non-technical users".

**Where:** Asta Software, 2017-2019.
**Evidence:** Documented in the profile; the revenue claim is the company's, reported by him.

- **Situación:** "Asta necesitaba una línea de producto propia. Yo entré a construir el punto de venta con
  facturación electrónica e integración de recargas de tiempo aire."
- **Tarea:** "El sistema completo: la aplicación en C#, el cumplimiento de facturación, las integraciones y
  el empaquetado del instalador."
- **Acción:** "Diseñé la arquitectura, integré los servicios de terceros y armé el .exe con todos los
  programas e instalaciones de base de datos que el despliegue necesitaba, porque el cliente final no es
  técnico y el instalador tenía que resolverlo todo."
- **Resultado:** "Se convirtió en una de las principales líneas de ingreso de la empresa, y siguió
  operando años después de que yo salí."

**Say the date out loud.** This was years one and two of the career. Describing the scope without the date
invites the interviewer to discover it and discount everything else.

---

## Personal pitch, 90 seconds

**The Notion versions are superseded — do not read them.** They say five years, then seven, and neither
mentions AI orchestration or CostoPreciso. Both are quarantined below. Use these.

### Español

"Soy ingeniero en informática con nueve años construyendo sistemas en producción, desde 2017. La base más
profunda que tengo es PHP y Laravel, y desde 2022 trabajo principalmente en TypeScript, React y Node.

Los últimos dos años en MySourcing arquitecté una plataforma de chat multitenant que además funciona como
hub de integración entre productos, y encima de eso construí una capa de orquestación de IA que expone la
suite de la empresa como herramientas que un modelo puede invocar. Ahí es donde está mi trabajo más
interesante: no entrenar modelos, sino el lugar donde la salida de un modelo tiene consecuencias reales,
con permisos, aislamiento por empresa y manejo de fallos.

En paralelo construyo CostoPreciso como freelance para un cliente, un SaaS de costeo para PYMEs, yo solo y
con especificación primero usando Spec-kit:
un motor determinista en TypeScript con 346 pruebas en verde, desplegado en julio. Trabajo con Claude Code
todos los días como método, no como autocompletado.

Busco un rol donde pueda seguir llevando modelos a producto real y ser dueño del sistema de punta a punta."

### English

"I'm a computer engineer with nine years building production systems, since 2017. My deepest base is PHP
and Laravel, and since 2022 I work mainly in TypeScript, React and Node.

In my last two years at MySourcing, I architected a multi-tenant chat platform that also works as an
integration hub between products. On top of it, I built an AI orchestration layer that exposes the
company's products as tools an LLM can call. That is the work I find most interesting. Not training
models. The place where a model's output has real consequences: permissions, tenant isolation, and what
happens when it calls the wrong thing.

At the same time, I have been building CostoPreciso as a freelance developer for a client, a costing SaaS
for small Mexican companies. I am the only developer on it, and I built it specification first, with a
deterministic TypeScript engine and 346 passing tests. I deployed it in July.
I use Claude Code every day as a working method, not as autocomplete.

I'm looking for a role where I can keep bringing models into real products and own a system end to end."

**Delivery note for the English version:** it is written in short sentences on purpose. Do not improvise
longer ones under pressure — that is where B1 delivery breaks. Rehearse it out loud until it is automatic;
the opening is where listening anxiety peaks.

---

## English delivery kit

Kept from the Notion pages because it is practice material, not claims.

**Transitions worth having automatic:** "Let me give you a specific example..." · "In my previous role
at..." · "The main challenge was..." · "What I found was..." · "As a result..." · "This taught me that..."
· "Could you rephrase that?" (this one is not a weakness, it is normal, and it costs nothing)

**Words to drill:** development /dɪˈveləpmənt/ · architecture /ˈɑːrkɪtektʃər/ · implementation
/ˌɪmplɪmenˈteɪʃən/ · integration /ˌɪntɪˈɡreɪʃən/ · optimization /ˌɑːptɪməˈzeɪʃən/ · bottleneck
/ˈbɑːtlnek/ · maintenance /ˈmeɪntənəns/ · onboarding /ˈɑːnbɔːrdɪŋ/ · refactor /ˌriːˈfæktər/ ·
troubleshooting /ˈtrʌblʃuːtɪŋ/

**Practice loop from the notes, still sensible:** record the pitch daily until it flows · one STAR answer
per session, spoken not read · full mock interview weekly · listening is the weakest skill (A2), so
practise being *asked* questions, not only answering them.

---

## Quarantine: in the Notion notes, not usable

Nothing here goes into a CV, a cover letter, an application form, or an interview answer. Each line says
why. **If any of these turn out to be real and measured, he can say so and it moves out — but only then.**

### Invented or unverifiable numbers

Every one of these appears in the Notion pages with no source, and the profile's rule is that only three
real numbers exist:

- "aumentando la cuota de distribuidores en **30%**" and "entregamos **15%** antes del plazo" (Batta) — the
  quota increase is real, **the percentage is not**
- "**60%** less distributor processing time" (Batta)
- "serving **15+ companies**, reducing HR processing time by **40%**" (MySourcing) — proposed CV rewrite
- "**3+ concurrent projects** while maintaining **99% uptime**"
- "improved API performance by **30%**" and "bug rates dropped by **25%**" (pitch page)
- "evitando pérdidas de **\$X**" — the placeholder was never filled in

### Superseded positioning

- **"5 years" / "7 years" of experience** — it is nine, from February 2017
- **"self-taught Computer Engineer"** — he holds the degree and the cédula profesional; the phrase
  undersells and confuses
- **Skill levels "Expert / Proficient / Working Knowledge"** — replaced by the evidence-strength grouping
  in `01-candidate-profile.md`, which is honest about what has years behind it and what has one project
- **"In 5 years I see myself leading development teams... cloud architectures and microservices"** — not
  the direction any more. See the AI-engineering answer in `07-interview-prep.md`
- **"currently pursuing AWS certification"** — **confirmed 2026-09-02 as never pursued.** Do not repeat it
- **The 90-second pitches in both Notion pages** — superseded by the ones above

### Misattributed work

- **ProntoForms listed as a MySourcing integration** — it was the 2020-2021 freelance project for a
  different client. Attributing it to MySourcing collapses two roles and is the kind of error that
  unravels under one follow-up question
- **"Coordinar el desarrollo web service con el equipo móvil" at Batta** — **confirmed 2026-09-02: there
  was no internal mobile team.** The base app came from an external vendor and he carried it alone. The
  whole teamwork STAR built on this premise is void; use story 3 for teamwork instead
- **"Communication challenge — aligning teams"** (workshops, user stories, weekly syncs) — no company, no
  project, no date in the source. Unsourced and generic; do not use it until he can name the project

### Kept, with the claim narrowed

- **ISO 27001 security policies at MySourcing** — **confirmed 2026-09-02 as real.** Recorded in
  `01-candidate-profile.md`. Claim it as *working within* ISO 27001-aligned security policies on the
  platform, not as owning a certification or an audit, and be ready for the follow-up on which controls
  actually touched his code

---

## Sync log

| Date | What happened |
|------|---------------|
| 2026-09-02 | Imported three Notion pages (edited 2025-06-20, 2025-06-30, 2025-07-27), reconciled against the profile. Four ambiguities resolved with the candidate: the Laravel optimisation belongs to ProntoForms; the Batta app was inherited from an external vendor with no internal mobile team; the MySourcing onboarding responsibility was formally assigned; ISO 27001 is real, the AWS certification never happened. Everything else above the quarantine line is ready to rehearse. |

**Notion is the older copy now — this file is canonical.** If he edits those pages again, re-import rather
than trusting either side, and add a row here.

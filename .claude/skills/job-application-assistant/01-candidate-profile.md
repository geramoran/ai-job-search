---
framework_version: 1.0.0
---

# Candidate Profile

<!-- Populated by /setup Path A on 2026-08-10 from documents/cv, documents/linkedin, documents/diplomas -->

## Identity
- **Name:** Jose Gerardo Martínez Morán
- **Location:** Torreón, Coahuila, Mexico (GMT-6, no DST)
- **Phone:** (+52) 871-310-7796
- **Email:** geramtz100@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/geramoran/
- **GitHub:** https://github.com/geramoran
- **Languages:** Spanish (native); English B1 Intermediate — see Language Evidence below
- **Status:** Actively job seeking since August 2026 (MySourcing role ended July 2026), while running a
  direct freelance engagement for a private client (CostoPreciso — see Freelance Client Work)
- **Professional licence:** Cédula Profesional 12320388 (SEP, Dirección General de Profesiones), issued 31 May 2021, verifiable at gob.mx/cedulaprofesional
- **Constraints:** Open to remote (Mexico/LatAm and international), hybrid in Torreón, and relocation to another Mexican city. Not open to fully on-site 5 days/week.
- **CV language:** Both — English for remote-international postings, Spanish for Mexico/LatAm postings

### LinkedIn corrections pending (as of 2026-08-21)

The public LinkedIn profile disagrees with the verified record in five places. Each one is a claim a
recruiter can check, so fix them at the source rather than working around them:

| Field | LinkedIn currently says | Verified record |
|-------|-------------------------|-----------------|
| Languages | English **"Full Professional"** | **B1 Intermediate** (EF SET 41/100). This is the most damaging one — Capital One cut him on an English test in July 2026. |
| About / headline | "más de **6 años** de experiencia"; headline still reads "Fullstack Senior Developer **en** Mysourcing" | **Nine years** (career starts Feb 2017); the MySourcing role ended July 2026 |
| Asta Software start | "enero de 2017" | **07 February 2017** (constancia laboral) |
| Education | "Ing. en Informática**, Inglés** · (2010 - 2015)" | ", Inglés" is not part of the degree name — remove it |
| Batta Hermanos title | "Ingeniero de desarrollo de software" | **Analista de Desarrollo** (constancia) |

### Language Evidence (important — do not overstate)

EF SET Certificate, awarded 23 May 2025, score **41/100 = B1 Intermediate** (cert.efset.org/8wVcW6):

| Skill | Score | CEFR |
|-------|-------|------|
| Reading | 52 | B2 Upper Intermediate |
| Speaking | 43 | B1 Intermediate |
| Writing | 35 | A2 Elementary |
| Listening | 34 | A2 Elementary |

**Real-world evidence (not self-reported):** Capital One, July 2026. Inbound recruiter approach via
LinkedIn, recruiter screen passed on 29 June, then a process of form -> psychometric test -> **English level
test**. He failed the English test and was rejected on 14 July, without ever reaching a technical
evaluation. This is the concrete cost of the B1 level in a corporate hiring funnel: the language filter
sits *before* any chance to demonstrate the work.

**Rules for using this:**
- Claim **B1 Intermediate** overall, or "fluent technical reading (B2)" when reading specifically is what matters.
- **Never claim "Full Professional"** — the LinkedIn profile currently says this and it is not supported. It should be corrected there.
- Listening (A2) is the weakest skill and the real risk in English-language screening calls. Roles requiring daily English meetings should be flagged, not silently applied to.

## Education

| Degree | Period | Institution | Key Topics |
|--------|--------|-------------|------------|
| Ingeniero en Informática (Bachelor's / Licenciatura, Computer Informatics Engineering) | 2010–2015 (studies); acto recepcional 16 Oct 2017; degree issued 22 Mar 2018 | Instituto Tecnológico Superior de Lerdo, Durango, Mexico | Software engineering, databases, web and desktop development |

**Verified against official documents** (`documents/diplomas/`):
- Título profesional issued by Secretaría de Educación del Estado de Durango. Official title wording: **"Ingeniero en Informática"**.
- Cédula Profesional 12320388, programme registered as *Licenciatura en Ingeniería Informática* (clave 611387), institution clave 100081.
- Candidate reports Mención Honorífica / Honorable Mention (stated in CVs; not printed on the título itself).

**Note:** the LinkedIn education entry reads `Ing. en Informática, Inglés · (2010 - 2015)` — the ", Inglés" is not part of the official degree name and should be removed from LinkedIn.

## Professional Experience

### Full-Stack Web & AI Developer Senior - MySourcing (May 2022 - Jul 2026)
Acapulco de Juárez, Guerrero, Mexico (remote)

**Internal Chat Platform (2025-2026)**
- Architected a centralized web chat system as a unified API hub connecting multiple internal and external products in a multitenant environment (isolated per company)
- Implemented real-time bidirectional communication with Socket.io: live notifications, cross-product messaging, collaborative actions
- Built end-to-end encrypted file sharing across tenant boundaries
- Implemented **rate limiting / request throttling** on the chat platform's APIs
- Integrated purchase-authorization workflows from the Requisitions Portal directly into the chat UI, removing context-switching for approvers
- **Developed an AI orchestration layer exposing the company's product suite as tools callable by the LLM**, enabling automation of cross-system workflows

**Standing clarification on the encryption — this drifted once in a live screening (PJV, 2026-08-13) and
must not drift again.** The written version (email of 2026-08-07) says he designed the platform by hand;
what he said on the call implied a Claude security audit produced the design. Both facts are true and the
order is what matters. The agreed single version:

> "El diseño inicial y la arquitectura del chat las hice sin asistente. Cuando ya estaba en producción usé
> Claude para auditar la parte de seguridad y de ahí salieron observaciones que implementé, incluido el
> cifrado punto a punto. Si sonó a que el asistente decidió el diseño, me expliqué mal: decidí yo, revisé
> con herramienta."

**Architecture decided unaided; assistant used to audit an already-running system.** Use this ordering in
every document and answer. It is also the honest general shape of how he works with Claude Code, so it
doubles as the answer to "how much of your work does the AI do?".
- Stack: TypeScript, ReactJS, Node.js, Express, Socket.io, Prisma ORM, PostgreSQL, Tailwind, Axios, Docker, Claude AI, Claude Code, Spec-kit

**Requisitions Portal (2025-2026)**
- Designed and built the full purchase-requisition lifecycle: creation, multi-level authorization, supplier management, payment tracking
- Automated supplier communication through transactional email workflows including purchase-order generation and delivery status updates
- Built real-time dashboards giving finance and operations teams visibility into spending and pending approvals
- Stack: TypeScript, ReactJS, Node.js, Express, Prisma ORM, PostgreSQL, Tailwind, Axios, Docker, Claude Code, Spec-kit

**Stripe integration — Asociación Riviera Diamante (short project, ~March 2026)**
- Integrated **Stripe** into https://rivieradiamanteac.org/, the site of Asociación Riviera Diamante A.C.
  (Acapulco, Guerrero), which charges **recurring membership subscriptions** — monthly tiers from $120 MXN
  per property and an annual plan — rather than one-off checkout. Site built on **Next.js**.
- **Duration: short. Around March 2026.** The candidate first recalled "at least a year" and corrected it the
  same day (2026-08-17) to a brief engagement. **Use the corrected version only.**
- **Employer attribution: resolved (candidate, 2026-08-17).** This was **MySourcing client work** — the
  association was MySourcing's client, not a side engagement. It belongs under the MySourcing heading on a CV,
  as a short client project alongside the Chat Platform and Requisitions Portal.
- It is also the candidate's **most recent payment-gateway work** (~March 2026, months before the July 2026
  separation). Everything else on gateways is 2019–2022.
- Honest framing: this is **exposure to Stripe, including a recurring-billing flow**, not depth. Do not lead
  with it and never imply sustained Stripe work. The gateway depth in this profile is PayPal, Conekta and
  OpenPay.

**Personnel Management System (2022-2024)**
- Analysis and development of HR modules for multi-company payroll and personnel management
- Bug fixes and iterative improvements to the payroll calculation engine
- Stack: JavaScript, Node.js, MySQL, AngularJS, RxJS, PHP, Laravel, Docker

**Role-level responsibilities (imported from the candidate's Notion prep notes, confirmed 2026-09-02)**
- Worked under **Scrum**
- Worked within **ISO 27001-aligned security policies** on the platform. Claim it as working inside those
  policies, never as owning a certification or running an audit, and expect the follow-up on which controls
  actually touched his code
- **Formally assigned responsibility for onboarding new developers** onto the system, after three-plus years
  as its longest-serving developer: structured introduction to the architecture, progressive first tasks,
  review and specific feedback on their work. **This is not people management** — no hiring, no headcount,
  no performance evaluation, and it is never to be written as "led a team of X". STAR answer in
  `10-star-bank.md` story 3

**Reason for leaving (agreed interview line, confirmed by candidate 2026-08-12):** the separation was the
company's decision, July 2026. Two developers covering several products; a disagreement with the owner over
priorities and delivery timing. **Use this neutral one-line version in every interview and document, never a
different one.** The fuller circumstances are recorded only in the gitignored application archive
(`documents/applications/poderjudicialvirtual_desarrollador_full_stack_senior/interview_prep_phone_screen.md`)
because this file is tracked in git. Never criticise the employer, and never volunteer the health/workload
detail in an interview.

### Desarrollador Fullstack Mid TypeScript - BOZ IT Development (Jan 2022 - Apr 2022)
Mexico
- Analysis and development of modules for a **payroll (nóminas)** and **financial projection** system serving multiple clients, with complex transactional logic
- Fixed critical bugs in calculation and data-validation flows
- Stack: TypeScript, Node.js, SQL Server, DevExpress

**Note (added 2026-08-21):** the payroll half of this role was missing from earlier versions of this
profile — the LinkedIn entry reads "sistema de nóminas y de proyecciones financieras". It matters because
it makes payroll a **two-employer** thread (BOZ IT 2022, then MySourcing 2022-2024) rather than a single
one, which strengthens any application to an HR/payroll or fintech-adjacent product.

### Webmaster Developer - Basculas REVUELTA (Jul 2021 - Jan 2022)
Torreón, Coahuila, Mexico
- Administered and improved Grupo Revuelta's websites using ASP.NET MVC, Umbraco, and AngularJS
- Installed and administered the Magento e-commerce platform for the livestock store; developed custom plugins with PHP and Magento
- Stack: ASP.NET MVC, Umbraco, AngularJS, PHP, Magento, HTML, CSS, JavaScript, C#

### Freelance Full-Stack Developer - ATT / ProntoForms project (Nov 2020 - Jun 2021)
Remote, Mexico
- Sole developer: designed, built, and deployed a warehouse and delivery management platform end-to-end, from architecture through production
- Inventory module: full CRUD for products, warehouses, and areas; blind inventory counts with automated discrepancy reporting; zone/rack-based tracking
- Logistics module: dispatch, receipt, and shipment management; PDF delivery manifests (DomPDF); full audit trail via status catalogue and unit log
- ProntoForms webhook integration: real-time processing of GPS coordinates, field photos, and rejection reasons from mobile forms, with automated audit log
- Automated Excel/PDF reports via cron jobs and Laravel Queue with scheduled email delivery; role-based access control, dark-mode UI
- **Performance work in production (candidate-confirmed 2026-09-02):** profiled slow response times and peak-hour instability to heavy Eloquent use on high-frequency operations, and refactored those hot paths to **MySQL stored procedures**, moving the load off the PHP server. Full STAR answer in `10-star-bank.md` story 1. The trade-off he names himself is that the logic left the repository for the database
- **Scale in production: 50-200 packages processed per day with 12 active couriers using the platform daily** (candidate-reported, 2026-08-07)

**⚠ Figure drift — use one version and only one.** Two different sets of numbers for this platform are
already in the hands of the same interviewer at PoderJudicialVirtual:

| Source | Figures given |
|--------|---------------|
| Email to PJV, 2026-08-07 (written) | **50-200 packages/day, 12 active couriers** |
| PJV screening call, 2026-08-13 (spoken) | 4 administrators, 20-30 couriers, peak of ~80 packages |

**The written version above is canonical. Use it in every CV, letter and interview from now on.** These are
four-year-old recollections of a system delivered in 2021, and the candidate decided (2026-08-13) that both
are honest approximations and that the profile figure would not change — but the decision only helps if it
is applied consistently, and until now it lived only in the PJV prep notes. If confronted with both:

> "Son estimaciones de memoria de un sistema que entregué hace cuatro años; el rango operativo era de 50 a
> 200 paquetes diarios según temporada, con una docena de repartidores activos. Si mencioné 80, era el pico
> que recuerdo de un día concreto."

Never introduce a third set of numbers. If a precise figure is needed and cannot be recalled, say it is an
estimate rather than inventing precision.
- Stack: PHP 8, Laravel 8, Vue.js, MySQL, Redis, Docker, AWS S3

### Analista de Desarrollo (Analyst Developer) - Grupo Batta Hermanos (Sep 2019 - Oct 2020)
Torreón, Coahuila, Mexico

**Title and dates — resolved by the candidate 2026-08-21 against the constancia laboral.**
- **Use "Analista de Desarrollo" / "Analyst Developer", with no seniority suffix.** The HR constancia
  reads "ANALISTA DE DESARROLLO JR"; earlier drafts of this profile and the archived CVs said "Mid Analyst
  Developer". Neither suffix is used going forward. If an employer holds the constancia and asks about the
  "Jr", see the prepared answer in `07-interview-prep.md`.
- Legal entity for forms and background checks: **Hermanos Batta, S.A. de C.V.** (brand: Grupo Batta
  Hermanos). Area: Sistemas.
- **The constancia's end date is wrong.** It states "del 09 de Septiembre del 2019 al 07 de Octubre del
  2021", but the letter itself is dated 27 April 2021, so its end date falls after its own issue date.
  LinkedIn independently records September 2019 - October 2020 ("1 año 2 meses"), and the freelance
  ProntoForms engagement starts November 2020. **October 2020 is correct.** Worth asking Batta HR for a
  corrected letter before any employment verification runs against it.
- Analysed, developed, and deployed two mobile applications (Ionic + AngularJS), a website (Node.js + VueJS), and a web service (ASP.NET MVC Core + C#) to onboard voucher distributors and supervise field staff; measurably increased distributor quota and reduced processing times
- **How the mobile work actually started (candidate-confirmed 2026-09-02):** the first app — for client-service staff uploading credit-authorisation prospects — was **inherited from an external vendor**, and he learned Ionic and AngularJS from scratch to adapt it and wire it to the .NET Core Web API, with no internal mobile team and nobody in-house to ask. He built the second app himself. Prep notes that describe coordinating with a "mobile team" here are wrong; see the quarantine list in `10-star-bank.md`
- Maintained a store-support website for in-branch incident reporting (HTML, CSS, JavaScript, jQuery, PHP)
- Maintained sensitive credit-area data directly in SQL Server (T-SQL) where ERP actions were unavailable
- Maintained plugins for Batta Hermanos' VisCoi ERP system, written in Visual Basic 6.0
- Handled support tickets end-to-end with SLA tracking through to closure
- Stack: ASP.NET MVC Core, C#, Visual Basic 6.0, PHP, JavaScript, jQuery, Ionic, AngularJS, VueJS, Node.js, SQL Server

### Desarrollador Web y .NET - Asta Software (Feb 2017 - Apr 2019)
Torreón, Coahuila, Mexico

**Title, dates and engagement type — checked 2026-08-21 against the constancia laboral.**
- **Keep "Desarrollador Web y .NET" / "Web & .NET Developer".** The constancia says "Desarrollador de
  Software, área de Sistemas" and LinkedIn says "Desarrollador full stack web". The candidate confirmed
  (2026-08-21) that the CV wording is the accurate description of the actual work, and it is a narrower,
  more defensible claim than the official one, not a broader one. No conflict to manage.
- **Exact dates from the official document: 07 February 2017 - 05 April 2019.** These match this profile.
  LinkedIn shows "enero de 2017" and the archived PoderJudicialVirtual CV shows "Mar 2019" — both are wrong
  and should be corrected at the source.
- **Engagement was under Régimen de Incorporación Fiscal (RIF)** — the constancia states he "prestó
  servicio bajo el Régimen de Incorporación Fiscal para la empresa". This was a Mexican contractor
  arrangement, not payroll employment. Two practical consequences: it is genuine precedent for B2B /
  contractor engagements with international employers, and an employment-verification check on this period
  will find a service relationship rather than an IMSS employment record. Do not describe it as freelance
  on a CV — it was a full-time in-house role at Asta's offices; the RIF is a billing arrangement only.
- Legal entity for forms and background checks: **Asesoría en Sistemas y Tecnologías Administrativas
  S.A. de C.V.** (RFC AST020720GD2).
- Developed, deployed, and maintained point-of-sale systems with electronic invoicing and third-party airtime top-up integrations, using C# and Windows Forms (.NET Framework 4.0) with direct Microsoft SQL Server LocalDB connections; **now one of the company's top revenue lines**
- Built the corresponding .exe packaging with all required programs and database installations for correct deployment
- Built dynamic websites with PHP and Laravel for multiple clients
- Built e-commerce sites on the Aimeos framework (PHP/Laravel), integrating PayPal, Conekta and **OpenPay** payment gateways (OpenPay confirmed by the candidate 2026-08-17 as Asta-era work, ~2019, on the Aimeos e-commerce — not a later role)
- Stack: C#, .NET Framework, PHP, Laravel, Aimeos, MySQL, SQL Server, Firebird, HTML, CSS, JavaScript, jQuery, PayPal, Conekta, OpenPay

## Verified Work Samples

### LexCore technical assessment — PoderJudicialVirtual, August 2026
The most recent auditable evidence of PHP/Laravel depth in the whole profile, and the only work product here
that was **set and graded by an external party** rather than self-described. Repo
`pjvgit/prueba-lexcore-gerardo-martinez`, PR #1 merged-ready on 2026-08-17, delivered inside the deadline.

**Measurable output:** 11 commits, 15 files, +1125/−77. Test suite taken from **5 to 35 passing tests**
(55 assertions), `pint` clean on touched files, zero changes to the project's setup.

**What it demonstrates, concretely:**
- **Found both planted traps.** The obvious fix to the revenue bug (`whereNull('deleted_at')` inside the
  method) silently breaks `GenerateMonthlyStatementJob`, which needs the gross figure including cancelled
  payments to reconcile against credit notes — the comment saying so lives in the job, not in the surface
  the ticket points at. He went looking for the second consumer instead of patching. Resolved by splitting
  `sumNetPayments()` / `sumGrossPayments()` and deleting the ambiguous name.
- **Caught a test that encoded the bug as the rule.** `DashboardTest::test_dashboard_shows_total_revenue`
  asserted the wrong total with the cancelled payment deliberately in the arrange, which is why the suite
  was green with the defect inside it.
- **Found two latent defects nobody asked about**, including `ResendCoverageNotice` telling a user with an
  unpaid new plan that their coverage "expired" on a future date.
- **Verified a fix by mutation.** After adding the missing test for `GenerateMonthlyStatementJob`, he
  confirmed it went red when the job was switched to `sumNetPayments()`.
- **Documented six explicit assumptions** rather than guessing requirements, and deliberately left four
  things untouched with written reasons (report period, authentication, timezone, frontend build).

**AI logbook with 8 justified rejections.** The assessment asked for a record of AI use; the README stated
that "una bitácora rica en rechazos justificados cuenta muy a favor". He documented eight suggestions he
turned down and why. This is the profile's only hard evidence for the agentic-engineering claim — it shows
judgment *over* the tool, not just use of it. See `07-interview-prep.md` for the prepared answer to "what
part did the AI write?".

**He also declined to use spec-kit and wrote down why**: the README was already the specification, and the
scaffolding would have put more process files than solution files in a three-hour diff. Knowing when not to
apply a methodology is stronger signal than applying it everywhere.

**Caveat:** no evaluator feedback has been received. Everything above is the candidate's own account plus
the artifacts in the PR. Present it as work delivered, never as work praised.

### CuatroD Studios technical assessment — Telegram requirements-qualification agent, June 2026
**The only n8n evidence in the entire profile**, and the only conversational-agent system the candidate has
built end to end outside an employer's codebase. Role evaluated: *Automation / AI Workflow Builder*.
Technical interview 12 June 2026; assessment built 15-18 June 2026. Artifacts in `prueba_tecnica/`: the
exported workflow, the requirements catalog, a 13-page architecture document and an installation README.

**Measurable output:** one n8n workflow of **26 nodes** (9 Data Table, 8 Code, 2 IF, 2 Telegram send,
1 trigger, 1 Wait, 1 HTTP Request, 1 Set), **4 persistence tables**, a 3-service requirements catalog as
editable JSON, and documentation covering 12 real incidents with symptom/cause/solution plus 4 stated
limitations.

**What it demonstrates, concretely:**
- **Debounce without queues or locks.** Burst grouping is solved by having every execution write its own
  timestamp to a shared per-chat row, wait 6-8s, then re-read: only the execution whose timestamp still
  matches the most recent write proceeds. Parallel executions coordinate through the data itself. This is
  the strongest single piece of distributed-reasoning evidence in the profile.
- **Idempotency designed in, not bolted on.** Dedup key `chat_id + message_id`, filtered with the Data
  Table "If Row Does Not Exist" operation, and the seen-record insert placed *immediately* after the
  filter specifically to shrink the race window on near-simultaneous webhook retries.
- **A contract for LLM output, with a failure path.** The response is parsed and validated against eight
  required fields in a Code node. On parse failure or missing fields the flow does not stop and does not
  propagate partial data: it emits a fallback reply to the user and forces `requiereHumano: true` with a
  reason. Two failure modes named and closed — silent no-reply, and half-valid data reaching memory.
- **Provider-agnostic LLM integration.** Deliberately used the generic HTTP Request node against an
  OpenAI-compatible chat-completions endpoint rather than n8n's native OpenAI node, so swapping providers
  means changing a URL and a credential, not the flow logic. Credentials held in n8n's Header Auth store,
  never inline in a node.
- **Prompt hardening driven by an observed failure.** The model invented field names not in the catalog
  (`nombre_completo_parcial` for `nombre_completo`). Fixed by injecting the exact closed list of valid
  field names, derived dynamically from the catalog, plus one correct and one incorrect example taken from
  the real error. After the change the model preferred registering nothing over guessing.
- **Requirements modelled as editable data.** The 3-service catalog lives as JSON in a Set node, separate
  from the prompt, so adding a service or a field needs no prompt rewrite and no Code node change — a
  constraint the assignment set explicitly.
- **Verified persistence empirically rather than assuming it.** Confirmed by experiment that the Data Table
  Upsert does not null out previously stored fields when the incoming patch carries them empty, which is
  what makes cross-turn memory work without manual merge logic.
- **Human-escalation branch** writing to a `casos_escalados` audit table with review status, plus a
  Telegram alert whose text is sanitized of characters Telegram would parse as broken markup.

**Caveats:**
- **No evaluator feedback received.** Everything above is the candidate's own account plus the artifacts on
  file. Present it as work delivered, never as work praised, and do not imply an outcome.
- The assessment brief itself is CuatroD Studios' property. Describe the system and the candidate's
  decisions; do not republish the brief, the catalog or the workflow export.
- **This is not spec-kit evidence.** No spec-driven artifacts exist in the deliverable. The
  Spec-driven Development claim rests on MySourcing and this repo — see the LexCore entry, where declining
  spec-kit was itself the documented decision.

## Compensation

- **Accepted range, confirmed 2026-08-13:** PoderJudicialVirtual's published band of **$65,000-80,000 MXN
  gross per month, 100% nómina** (not honorarios — the company corrected this on the screening call),
  fully remote. The candidate confirmed on the call that this sits inside his expectations.
- This is the **only hard compensation anchor on file.** Treat it as a floor reference for Mexican remote
  senior full-stack roles, not as a ceiling, and not as validated for USD-denominated international
  contracts, where the market differs.
- Availability stated to employers: **start the Monday after an offer is confirmed.**

## Freelance Client Work

- **CostoPreciso / CosteoMX** (Jun 2026 - present) — `github.com/geramoran/saasconteo` (**currently private**).
  Multi-tenant costing SaaS for Mexican SMEs of any sector, built as **sole developer**. **This is the
  profile's real Spec-driven Development evidence** — see the Methodology section, which points here.

  **Engagement, corrected by the candidate on 2026-09-02:** this is a **direct freelance engagement for a
  client**, not a personal product and not MySourcing client work. Earlier drafts of this file, of
  `CLAUDE.md`, of the portfolio prompt and of the site filed it under independent/personal projects; that
  was wrong. On a CV it belongs in **professional experience** as a freelance entry (2026 - present, "private
  client", remote), where it also covers the period since MySourcing ended in July 2026.
  **Do not name the client** — the candidate has not authorized it. Write "a private client".

  **Verified on 2026-08-21 by inspecting the working tree, not from the candidate's account:**
  - **Spec-kit used properly, at scale.** A written project constitution with NON-NEGOTIABLE principles
    (pure engine with no infra imports, deterministic and auditable formulas traceable to a numbered
    section of the costing spec, sector-agnostic vocabulary, multi-tenant from day zero), then **16
    features** each taken through `spec.md` → `plan.md` → `tasks.md` before implementation. **14,706 lines
    of specification** across 46 files. `docs/GUIA-SPECKIT.md` documents the workflow itself.
  - **The specs precede the code and constrain it.** Constitution principle I is stated as a rule verifiable
    by grep; the engine maps one file per numbered section of the formula spec, with the section reference
    kept in the code comment.
  - **346 passing tests across 22 files** in the costing engine (`npx vitest run`, re-run and confirmed
    green on 2026-08-21), plus 11 backend and 29 frontend test files.
  - **~25,000 lines of TypeScript** across 272 files. Backend NestJS + Drizzle ORM + PostgreSQL 16 with
    row-level tenant isolation, argon2, JWT, Google auth, rate limiting. Frontend React 18 + Vite SPA with
    Tailwind and shadcn/ui. 40 commits between 7 and 18 July 2026.
  - **Deployed 18 July 2026** to an Ubuntu 24.04 VPS: Nginx, backend under systemd, PostgreSQL in Docker.
  - **Precursor: `demo-costeo`** (8-16 June 2026) — the same Spec-kit method over 24 features and 8,746
    lines of spec, where the costing domain was worked out before the SaaS was rebuilt around it.

  **The best interview story in the whole profile:** the real deploy surfaced **six bugs that a fully green
  test suite did not catch**, because no test exercised real production — Nest's DI boot, the bundle loaded
  via a script tag, auth state that was not React state. He documented each one and the rollback of a
  `manualChunks` change that white-screened production. This is honest evidence about the *limits* of
  testing, which lands better than a clean-suite claim.

  **Constraints when writing about it:**
  - **The repo is private.** Its own GitHub description calls it "open-source", but it is not public. Do not
    link it on a CV or the portfolio site until the candidate makes it public — see the note in Still
    missing under References.
  - **In development, not yet handed over to the client** (candidate, 2026-09-02). It is deployed to a VPS,
    not launched: no users, no operation running on it, no revenue, and the domain `costopreciso.com.mx`
    is named in the deploy notes but was not yet registered as of 18 July 2026. Never imply traction, and
    never say it was delivered.
  - The root `README.md` "Estado del proyecto" section is **stale** — it lists most of the engine as pending
    when 346 tests say otherwise. Trust `CLAUDE.md` and the test run, not that README.

## Independent Projects

- **Elvira Richards** (Mar 2018 - Dec 2018) — www.elvirarichards.com.mx — talent page for promoter Elvira Richards. Built on WordPress with a custom PHP theme, custom modules, and third-party plugins. Included ongoing server maintenance. Ran in parallel with the Asta Software role.

## Technical Skills

Grouped by strength of evidence, not by aspiration. Use these levels when writing CVs.

### Strong - long production use (5+ years)
- **PHP / Laravel** — Asta, ProntoForms, Revuelta, MySourcing
- **C# / ASP.NET MVC** — Asta, Batta Hermanos, Revuelta
- **JavaScript / jQuery** — every role since 2017
- **MySQL / MariaDB** and **SQL Server (T-SQL)** — every role since 2017
- **VueJS (2/3)** and **AngularJS** — Batta, ProntoForms, MySourcing
- **HTML / CSS / Bootstrap**

### Strong - recent production use (2022-2026)
- **TypeScript** — BOZ IT, MySourcing
- **ReactJS**, **Node.js / Express**, **Prisma ORM**, **PostgreSQL**, **Socket.io**, **Tailwind**, **Docker**

### Developing - real but narrower exposure
- **LangChain / LangGraph** (Udemy course completed May 2026 + AI orchestration layer at MySourcing)
- **Python**, **Claude API**, **Next.js**, **Redis**, **AWS S3**, **RxJS**
- **n8n** — one complete conversational-agent workflow built and documented end to end (CuatroD Studios
  assessment, June 2026): Data Tables, Code nodes, HTTP Request against an OpenAI-compatible endpoint,
  Telegram trigger and send, Wait-based debounce. Single project, not years of use — say so.

### Methodology
- **Agentic engineering as a core development practice**: Claude Code used daily, Spec-driven Development
  (Spec-kit), multi-agent orchestration
- **Where the Spec-driven Development claim is actually backed:** the CostoPreciso / CosteoMX project under
  Independent Projects — a written constitution plus 16 features carried through spec/plan/tasks, 14,706
  lines of specification, 346 passing engine tests. Cite that project, not MySourcing, when a posting asks
  for evidence: the MySourcing work is real but sits behind an NDA with no artifacts to show.
- **Judgment about when not to apply it** is separately evidenced in the LexCore assessment, where spec-kit
  was declined with a written reason.
- Professional Git workflow: branching, pull requests, code review
- Linux/Ubuntu environments, containerized services

### Legacy / maintenance-capable
- Visual Basic 6.0, Firebird, Magento, Umbraco, WordPress, Ionic, DevExpress

### Domain Expertise
- **Multitenant SaaS architecture** — per-company isolation, shared API hub
- **Real-time systems** — Socket.io, live dashboards, cross-product messaging
- **AI orchestration in production** — exposing product suites as LLM-callable tools
- **Conversational agents / workflow automation** — burst debouncing, webhook idempotency, per-user
  persistent memory, structured LLM output contracts, escalation to human review (n8n, CuatroD assessment)
- **ERP / HR / payroll systems** — payroll calculation engines, personnel modules
- **Approval and requisition workflows** — multi-level authorization, supplier management
- **Payment gateway integration** — Stripe, PayPal, Conekta, OpenPay
- **Warehouse / logistics / inventory systems**
- **Point-of-sale and electronic invoicing (facturación electrónica)**

## Certifications

**Udemy**
- Curso Completo: LangChain, LangGraph y Agentes IA con Python — 18h — completed 4 May 2026 (credential UC-034b1549-e078-4025-ab6f-4ee3088014cf)

**Platzi** — **active paid subscription as of August 2026.** This matters for planning: the whole catalogue
(programming, AI, cloud, and Platzi English Academy with its live Practice Sessions) is already paid for, so
any learning plan should exhaust Platzi before recommending Udemy, Coursera or Pluralsight. Signal-bearing
subset below; ~90 course certificates in total on LinkedIn.
- Curso de Claude AI — Apr 2026
- Curso de Claude AI — Jul 2025
- Curso de Herramientas de AI para Developers — May 2025
- Curso de Prompt Engineering — May 2025
- Curso de Introducción al Desarrollo Backend — Jul 2025
- Curso de Fundamentos de Node.js — Jul 2025
- Curso de Docker — Oct 2024
- Curso de Docker: Fundamentos — Oct 2024
- Curso de Patrones de Diseño y Buenas Prácticas en PHP — Sep 2024

**EF SET**
- English Certificate 41/100, B1 Intermediate — 23 May 2025

## Publications
None.

## Awards
- Mención Honorífica (Honorable Mention) — Instituto Tecnológico Superior de Lerdo (2017)

## References

Two documents are on file in `documents/references/`. **Both are Mexican *constancias laborales*
(employment-verification letters issued by HR), not recommendation letters.** They prove dates and title;
only the Asta one carries competency language. Do not attach them to a CV or cover letter — the CV keeps
"available upon request" and employers contact referees directly. Use them when a background check or an
onboarding form asks for proof of employment.

### Asta Software — Lic. José Antonio Vázquez Gómez, Gerente de Sistemas
Constancia dated 08 April 2019, on letterhead of **Asesoría en Sistemas y Tecnologías Administrativas
S.A. de C.V.** (Av. Juárez No. 146 Ote., Edificio San Pedro Desp. 304, Col. Centro, C.P. 27000, Torreón,
Coahuila · RFC AST020720GD2). Named signatory, so this is the one usable as an actual referee — contact
details are not recorded; ask the candidate before listing him.

Competency language (verbatim, the only third-party assessment in the whole profile):
> "Durante este tiempo, siempre observó una actitud de superación, iniciativa y responsabilidad,
> distinguiéndose de igual manera por sus valores de honestidad y respeto."

### Grupo Batta Hermanos — signed "Capital Humano" (no named person)
Constancia dated 27 April 2021, on letterhead of **Hermanos Batta, S.A. de C.V.** Verification only: area
(Sistemas), title and dates. No competency language and no named signatory, so it cannot serve as a referee
contact — it is documentary evidence only. See the date and title notes on the Batta entry above.

### Still missing
No referee from **MySourcing** (the four-year, most recent role) and none from the ProntoForms freelance
project. A named contact from either would be worth more than both constancias for a reference check. Add
to `documents/references/` and re-run `/setup`.

More references are available upon request.

# Search Queries for Job Scraper

<!-- Populated by /setup Path A on 2026-08-10 for Jose Gerardo Martínez Morán -->
<!-- Re-run `/setup --section search` to update as priorities change. -->

## Installed portal CLIs (primary for `/scrape`)

`/scrape` discovers every portal skill under `.agents/skills/*/SKILL.md` and runs its CLI first. You do **not** need a matching `site:` line below for those CLIs to run.

**Currently installed and useful:**

- `computrabajo-search` — **Computrabajo Mexico. Built 2026-08-10. Best default for
  city-scoped searches.** Working `--location` filter, no rate limiting, 28 tests
  passing. No posting-age filter (disallowed by robots.txt); filter on the relative
  `date` field instead.
- `occ-search` — **OCC Mundial, Mexico's largest board. Built 2026-08-10.** Widest
  coverage. Caveats: **no location filter** (fold the city into the query, then
  verify the `location` field), no posting-age filter, and detail pages rate limit
  after ~3 requests, so do not bulk-fetch descriptions.
- `linkedin-search` — country-agnostic, filter to Mexico / remote
- `freehire-search` — country-agnostic
- `indeed-search` — **browser-driven, not a CLI. Built 2026-08-10.** Indeed blocks
  server-side requests at the CDN (HTTP 503), so this skill drives Chrome through
  the `claude-in-chrome` tools instead. Requires Chrome running with the extension
  and `mx.indeed.com` permitted. **`/scrape` cannot run it unattended** — use it as
  an interactive supplement. Supports keyword, location, and a real posting-age
  filter (`fromage`), and surfaces remote-international roles the Mexican-only
  boards miss.

**Installed but not applicable** (Danish demos, ignore for this candidate): `jobindex-search`, `jobbank-search`, `jobdanmark-search`, `jobnet-search`

- `getonbrd-search` — **browser-driven. Built 2026-08-10.** Curated LatAm tech-only
  board, high share of fully remote roles quoting **USD** salaries. Category routes
  segment correctly (`/jobs/programming`, `/jobs/machine-learning-ai`); keyword
  filtering is client-side because `?search=` does not filter.
- `hireline-search` — **browser-driven. Built 2026-08-10.** Tech-only Mexico/LatAm,
  **publishes explicit MXN salary ranges** on most postings and encodes work mode
  in the location field. Only ~12 offers per page, so keyword sweeps need several
  pages; slowest of the installed portals.

**Rejected after investigation:**
- **Torre.ai — not viable.** Requires authentication. `torre.ai/search/jobs`
  redirects to `/app/search-job?silent_auth=failed` and renders an empty body;
  `torre.ai/jobs` redirects to `/postings` which 404s. Its API returns 401. The
  portal-skill pattern only works on public pages, so this one is out unless the
  user wants to drive a logged-in session manually.

**Still unbuilt, worth considering:**
- `weworkremotely-search` / `remoteok-search` — remote-first international boards

**Deduplicate across portals.** Indeed aggregates from other sources and will
repeat postings that also appear on OCC and Computrabajo; match on company plus
title, since the offer IDs differ per portal.

**Also worth adding** (candidate said "any other job sites are fine"):
- `getonbrd-search` — Get on Board (getonbrd.com), LatAm tech-only, strong remote and USD listings
- `torre-search` — Torre.ai, LatAm-focused, good AI/startup coverage
- `weworkremotely-search` / `remoteok-search` / `himalayas-search` — remote-first international boards paying in USD
- `glassdoor-search` — Glassdoor Mexico, useful for salary and review signal alongside listings

The `site:` query templates below are the **WebSearch fallback** — for portals without a CLI, for company career pages, and for when a CLI fails.

**Language scope:** write every query category in every language listed in your CLAUDE.md Languages table (typically 1-2, sometimes more). A posting requiring a language you have *not* declared, as a job condition, is excluded before scoring; a posting requiring a *higher level* than you declared in a language you *do* work in is flagged for your own judgment, not excluded — see `04-job-evaluation.md`'s Language Gate, the single source of truth for this rule. Translate each category's keywords rather than machine-translating word-for-word (e.g. "Frontend Developer" -> "Desarrollador Frontend", not a literal word-for-word translation) if you work in more than one language.

## Search Sites

Primary:
- **occ.com.mx** — largest general job board in Mexico
- **mx.computrabajo.com** — high volume, mixed quality
- **mx.indeed.com** — aggregates many sources including international remote
- **linkedin.com/jobs** — filter: Mexico / Remote; also covered by the `linkedin-search` CLI
- **getonbrd.com** — LatAm tech-only, high signal-to-noise for remote USD roles

Secondary:
- Direct Google searches with `site:` filters for target company career pages
- Remote-first boards: weworkremotely.com, remoteok.com, himalayas.app, wellfound.com

## Query Categories

Queries are grouped by priority. Write **each category in every language from your Languages table** (see Language scope above). Combine each query with your location terms (e.g. your city, region, or metro area) where the site supports it.

Each priority has two kinds of block. **Plain terms** blocks are what the portal CLIs consume: one term per line, one CLI call per term, no `OR`, no `site:` prefix, and no location (the CLI's location flag, or the city in `--query` where that portal's SKILL.md says so, carries it). Quote a multi-word phrase only if the portal's `Query syntax:` line says quoting is honoured. **WebSearch-only** blocks are Google syntax (`site:`, quotes, `OR`) for the fallback path and are never passed to a CLI.

**Organize by function, not job title.** The same underlying work carries different titles across companies and markets (a "Data Scientist" role at one employer may be posted as "Insights Analyst" or "Data Consultant" at another). Name each priority category after the function it covers, and list several plausible job titles as query variants within that category rather than betting an entire priority tier on one exact title string.

### Priority 1: AI / Agentic Engineering

The candidate's differentiator and most-desired direction. Production LLM orchestration, not model training.

#### Plain terms (portal CLIs)

```
[YOUR_PRIMARY_JOB_TITLE_1]
[YOUR_PRIMARY_JOB_TITLE_2]
[YOUR_KEY_SKILL]
```

#### WebSearch-only (`site:` fallback)

```
site:linkedin.com/jobs "AI Engineer" remoto México
site:linkedin.com/jobs "AI Product Engineer" remote LATAM
site:linkedin.com/jobs "LLM Engineer" OR "LLM Application Engineer" remote
site:occ.com.mx "Ingeniero de IA" OR "AI Engineer" remoto
site:getonbrd.com "AI Engineer" OR "Inteligencia Artificial" remoto
site:linkedin.com/jobs LangChain OR LangGraph remote México
site:mx.indeed.com "AI Engineer" OR "Agentes IA" remoto
"AI agents" OR "agentic" engineer remote hiring LATAM contractor
```

Filter these hard: reject postings whose core is model training, fine-tuning, evaluation, or MLOps. See `04-job-evaluation.md`.

### Priority 2: Senior Full-Stack (TypeScript / React / Node)

Highest-volume, highest-conversion direction. The stable base.

#### Plain terms (portal CLIs)

```
[YOUR_DOMAIN_KEYWORD_1]
[YOUR_DOMAIN_KEYWORD_2]
```

#### WebSearch-only (`site:` fallback)

```
site:linkedin.com/jobs "Senior Full Stack" TypeScript React remoto México
site:linkedin.com/jobs "Full Stack Developer" Node.js PostgreSQL remote LATAM
site:occ.com.mx "Desarrollador Fullstack Senior" TypeScript React
site:mx.computrabajo.com "Desarrollador Full Stack" React Node
site:getonbrd.com "Full Stack" TypeScript React remoto
site:mx.indeed.com "Fullstack Senior" TypeScript remoto
site:linkedin.com/jobs "React" "Node.js" "Prisma" OR "PostgreSQL" remote
```

### Priority 3: Senior Backend / PHP-Laravel

Deepest accumulated experience. Less senior competition, less modern stack.

#### Plain terms (portal CLIs)

```
[YOUR_ADJACENT_TITLE_1]
[YOUR_ADJACENT_TITLE_2]
```

#### WebSearch-only (`site:` fallback)

```
site:linkedin.com/jobs "Senior Backend" PHP Laravel remoto México
site:occ.com.mx "Desarrollador PHP Laravel" senior remoto
site:mx.computrabajo.com "Laravel" desarrollador senior
site:getonbrd.com Laravel PHP backend remoto
site:mx.indeed.com "Backend Developer" Laravel MySQL remoto
site:linkedin.com/jobs "Laravel" "MySQL" senior developer LATAM
```

### Priority 4: Adjacent and Broader

Wider net. Roles the profile supports that the candidate may not search for by name.

#### Plain terms (portal CLIs)

```
[YOUR_KEY_SKILL] developer
technical consultant
```

#### WebSearch-only (`site:` fallback)

```
site:linkedin.com/jobs "Software Engineer" C# ".NET" remoto México
site:linkedin.com/jobs "Technical Lead" OR "Tech Lead" full stack remoto México
site:linkedin.com/jobs "Solutions Engineer" OR "Integration Engineer" API remote LATAM
site:occ.com.mx "Arquitecto de Software" web remoto
site:linkedin.com/jobs "Vue.js" OR "AngularJS" senior developer México
site:mx.indeed.com "Desarrollador Web Senior" Torreón OR remoto
site:linkedin.com/jobs SaaS multitenant engineer remote contractor LATAM
```

### Priority 5: Local Torreón / La Laguna

Lower volume, no language barrier, hybrid feasible.

```
site:occ.com.mx desarrollador Torreón Coahuila
site:mx.computrabajo.com programador OR desarrollador Torreón
site:linkedin.com/jobs software developer Torreón OR "La Laguna" Coahuila
site:mx.indeed.com desarrollador software Torreón Gómez Palacio Lerdo
```

## Location Filter

The candidate is open to a wide range. Rank results in this order rather than rejecting on location alone:

**Tier 1 — ideal**
- Fully remote, LatAm or Mexico-based employer (no language barrier, no relocation)
- Fully remote international paying USD, **provided** the role does not require daily spoken English

**Tier 2 — strong**
- Remote international with contractor/B2B or EOR engagement, US timezone overlap (GMT-6 overlaps all US zones)
- Hybrid in Torreón / Gómez Palacio / Lerdo (La Laguna metro area)

**Tier 3 — acceptable, involves relocation**
- Monterrey, CDMX, Guadalajara, Querétaro — hybrid or on-site with relocation
- Flag relocation cost and timing to the user before drafting

**Tier 4 — reject**
- On-site 5 days/week anywhere (stated deal-breaker)
- Europe or APAC roles demanding full-day timezone overlap
- Roles requiring US/EU work authorization, residency, or a local employment entity, with no contractor or EOR path

## Hard Rejects (do not surface these)

Per the candidate's stated deal-breakers:
- On-site 5 days/week with no hybrid option
- Night on-call rotation or 24/7 support duty
- Pure legacy maintenance/support with no new development
- Body-shop staffing consultancies renting developers by the hour to a final client (cárnicas / staffing por proyecto)

## Flags (surface, but warn)

- Requires daily spoken English or English-language client communication → EF SET listening is A2. Surface it, mark the flag, let the user decide.
- Core requirement is ML model training / fine-tuning / MLOps → outside the candidate's actual AI scope.
- Asks for formal people management experience → not documented.

## Language Filter

Your working languages and levels are in CLAUDE.md's Languages table. When filtering scraped results, apply `04-job-evaluation.md`'s Language Gate: a posting requiring a language you haven't declared at all is excluded; a posting requiring a higher level than you declared in a language you do work in is not excluded, flag it clearly instead (see `job-scraper/SKILL.md`'s Step 3 "Quick Fit Assessment" for how the flag surfaces in `/scrape` output). Postings simply *written* in a language you don't work in, that don't require it on the job, are fine.

## Date Filter

Only include jobs posted within the last 14 days, or with an application deadline that has not yet passed. If a posting date cannot be determined, include it but flag as "date unknown".

## Adapting Queries

If the user specifies a focus area, select queries from the matching category and generate 2-3 custom queries for that focus. Example: `/scrape AI` → Priority 1 queries plus focus-specific variants.

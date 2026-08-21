---
name: occ-search
version: 1.0.0
description: >
  Use this skill to search job listings on OCC Mundial (occ.com.mx), Mexico's
  largest general job board, or to look up a specific OCC job posting. Covers
  the whole Mexican market across every sector and role (software, engineering,
  finance, health, logistics, sales, administration). Trigger phrases: buscar
  trabajo en Mexico, empleos en OCC, bolsa de trabajo, ofertas de trabajo,
  vacantes, busqueda de empleo, chamba, trabajo en Torreon/Monterrey/CDMX,
  OCC Mundial, find jobs in Mexico, Mexican job board, job openings Mexico.
context: fork
enabled: true  # set to false to keep this portal installed but have /scrape skip it
allowed-tools: Bash(bun run .agents/skills/occ-search/cli/src/cli.ts *)
---

# OCC Mundial Search Skill

Search live job listings from OCC Mundial (`occ.com.mx`), the largest general job
board in Mexico. No authentication, no API key, and **zero runtime dependencies** —
it runs with just `bun`.

## ⚠️ Personal use only

This reads OCC's public job pages. **Keep volume low and do not use it commercially
or for bulk data collection.** Run it on your own responsibility. OCC actively rate
limits detail pages (see Notes).

## When to use this skill

- Search for job openings anywhere in Mexico by keyword, title, or technology
- Get the full description, salary range, and posting dates for a specific offer

## Commands

### Search job listings

```bash
bun run .agents/skills/occ-search/cli/src/cli.ts search --query "<keywords>" [flags]
```

Key flags:
- `--query <text>` / `-q <text>` — **required.** Keywords, e.g. `"desarrollador php"`.
  Multi-word queries are slugified automatically and accents are folded.
- `--page <n>` / `-p <n>` — page number (1-indexed, ~21 results per page).
- `--limit <n>` / `-n <n>` — cap total results emitted (client-side).
- `--format json|table|plain` — default `json`.

### Fetch full job detail

```bash
bun run .agents/skills/occ-search/cli/src/cli.ts detail <id|url> [--format json|plain]
```

`id` is the numeric offer ID from `search` results (e.g. `21273972`). A full
`occ.com.mx/empleo/oferta/...` URL also works. Returns the full description,
company, location, employment type, posting date, expiry date, and salary range.

## Usage examples

```bash
# PHP developer roles, human-readable
bun run .agents/skills/occ-search/cli/src/cli.ts search -q "desarrollador php" --format table

# React roles, first 10
bun run .agents/skills/occ-search/cli/src/cli.ts search -q "desarrollador react" --limit 10 --format table

# Software engineering, second page, as JSON
bun run .agents/skills/occ-search/cli/src/cli.ts search -q "ingeniero de software" --page 2

# Fold a city into the query (see the location caveat in Notes)
bun run .agents/skills/occ-search/cli/src/cli.ts search -q "desarrollador torreon" --format table

# Full detail for one offer
bun run .agents/skills/occ-search/cli/src/cli.ts detail 21273972 --format plain
```

## Output formats

| Format | Best for |
|--------|----------|
| `json` | Default — programmatic use, passing IDs to `detail` |
| `table` | Quick human-readable scanning |
| `plain` | Reading a single job's full detail (`detail` command) |

All errors are written to **stderr** as `{ "error": "...", "code": "..." }` and the
process exits with code `1`.

## Notes

These are portal quirks found during reconnaissance. Full detail in `url-reference.md`.

- **No location filter.** OCC exposes no working location parameter — `?l=`,
  `?location=`, and the `/empleos/en-<ciudad>/` route were all tested and all
  return the unfiltered result set. Fold the city into `--query` instead, but
  **verify the `location` field in the results**, because OCC matches it loosely.
- **No posting-age filter.** No working parameter exists. Each result carries a
  relative date (`Hoy`, `Ayer`, `Hace 4 días`, `Hace 1 mes`) you can filter on.
- **Detail pages are rate limited.** Roughly three succeed, then HTTP 403 persists
  for an extended cooldown. The CLI retries with backoff and then fails with an
  explicit "Rate limited" message. Do not loop over a result page fetching every
  description; pick the postings worth reading first.
- **Never use `/empleos/?q=`.** That query parameter silently ignores the search
  term and returns the same recommendation feed for every input, which is why this
  skill uses the `/empleos/de-<slug>/` route. A regression test guards this.
- Search results are parsed from HTML cards; detail pages are parsed from their
  embedded schema.org JSON-LD, which is more stable across markup changes.
- Salary is often absent on search cards and reported as `0 - 0` on detail pages
  when undisclosed; both are normalized to `null`.

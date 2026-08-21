---
name: computrabajo-search
version: 1.0.0
description: >
  Use this skill to search job listings on Computrabajo Mexico
  (mx.computrabajo.com), one of the highest-volume job boards in the Mexican
  market, or to look up a specific Computrabajo posting. Supports keyword and
  city filtering across every sector and role. Trigger phrases: buscar trabajo
  en Mexico, Computrabajo, empleos, bolsa de trabajo, ofertas de trabajo,
  vacantes, busqueda de empleo, chamba, trabajo en Torreon/Monterrey/CDMX/
  Guadalajara, find jobs in Mexico, Mexican job board, job openings Mexico.
context: fork
enabled: true  # set to false to keep this portal installed but have /scrape skip it
allowed-tools: Bash(bun run .agents/skills/computrabajo-search/cli/src/cli.ts *)
---

# Computrabajo Mexico Search Skill

Search live job listings from Computrabajo Mexico (`mx.computrabajo.com`). No
authentication, no API key, and **zero runtime dependencies** — it runs with just
`bun`.

Compared with the sibling `occ-search` skill, this portal supports a **working
location filter** and does not rate limit detail pages, which makes it the better
default for city-scoped searches.

## ⚠️ Personal use only

This reads Computrabajo's public job pages. **Keep volume low and do not use it
commercially or for bulk data collection.** Run it on your own responsibility.
Parameters disallowed by the site's `robots.txt` are never sent (see Notes).

## When to use this skill

- Search job openings anywhere in Mexico by keyword and optionally by city
- Get the full description, requirements, salary, and contract type for an offer

## Commands

### Search job listings

```bash
bun run .agents/skills/computrabajo-search/cli/src/cli.ts search --query "<keywords>" [flags]
```

Key flags:
- `--query <text>` / `-q <text>` — **required.** Keywords, e.g. `"desarrollador php"`.
- `--location <text>` / `-l <text>` — city or state, e.g. `"Torreon"`, `"Monterrey"`,
  `"Ciudad de Mexico"`. Accents are folded automatically.
- `--page <n>` / `-p <n>` — page number (1-indexed, ~20 results per page).
- `--limit <n>` / `-n <n>` — cap total results emitted (client-side).
- `--format json|table|plain` — default `json`.

### Fetch full job detail

```bash
bun run .agents/skills/computrabajo-search/cli/src/cli.ts detail <id|url> [--format json|plain]
```

`id` is the 32-character hex offer ID from `search` results. A full offer URL
also works. Returns the description, requirements list, salary, contract type,
and workday.

## Usage examples

```bash
# PHP developer roles nationwide
bun run .agents/skills/computrabajo-search/cli/src/cli.ts search -q "desarrollador php" --format table

# Developer roles in Torreon specifically
bun run .agents/skills/computrabajo-search/cli/src/cli.ts search -q "desarrollador" -l "Torreon" --format table

# Software engineering in Monterrey, second page
bun run .agents/skills/computrabajo-search/cli/src/cli.ts search -q "ingeniero de software" -l "Monterrey" --page 2

# Full detail for one offer
bun run .agents/skills/computrabajo-search/cli/src/cli.ts detail 2CD4A159C933355E61373E686DCF3405 --format plain
```

## Output formats

| Format | Best for |
|--------|----------|
| `json` | Default — programmatic use, passing IDs to `detail` |
| `table` | Quick human-readable scanning (IDs are printed in full) |
| `plain` | Reading a single job's full detail (`detail` command) |

All errors are written to **stderr** as `{ "error": "...", "code": "..." }` and the
process exits with code `1`.

## Notes

Portal quirks found during reconnaissance; full detail in `url-reference.md`.

- **No posting-age filter.** Computrabajo's `pubdate=` parameter is disallowed by
  its `robots.txt`, along with the distance, salary, and contract-type filters, so
  this CLI never sends them. Each result carries a relative date (`Hace 3 horas`,
  `Ayer`, `Hace 5 días`) you can filter on client-side.
- **Location filtering is strong but not absolute.** Computrabajo pads the tail of
  a city search with offers from elsewhere, so verify the `location` field when it
  matters.
- **Offer IDs are 32-character hex**, not numeric, and the `table` output prints
  them in full so they can be passed straight to `detail`.
- Company names are read from a dedicated anchor rather than the surrounding
  paragraph, because that paragraph also holds the employer's star rating.
  Confidential postings show text like "Importante empresa del sector" instead.
- Detail pages carry no schema.org JSON-LD, so parsing is HTML-anchored and more
  sensitive to redesigns than `occ-search`'s detail parser.

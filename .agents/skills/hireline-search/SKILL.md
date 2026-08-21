---
name: hireline-search
version: 1.0.0
description: >
  Use this skill to search tech job listings on Hireline (hireline.io), a
  tech-only job board for Mexico and LatAm with salary ranges shown on most
  postings. Browser-driven, not a CLI. Trigger phrases: Hireline, hireline.io,
  empleos de tecnologia en Mexico, vacantes tech Mexico, trabajos de programador
  Mexico, empleos TI, tech jobs Mexico.
context: fork
enabled: true  # set to false to keep this portal installed but have /scrape skip it
allowed-tools: mcp__claude-in-chrome__navigate, mcp__claude-in-chrome__javascript_tool, mcp__claude-in-chrome__get_page_text, mcp__claude-in-chrome__tabs_context_mcp, mcp__claude-in-chrome__tabs_create_mcp, mcp__claude-in-chrome__tabs_close_mcp
---

# Hireline Search Skill (browser-driven)

Tech-only job board for Mexico and LatAm. Lower recruiter noise than the general
boards, and **most postings publish an explicit salary range in MXN**, which the
general boards usually hide.

## ⚠️ No CLI, and no server-side keyword search

Both verified 2026-08-10:

1. **Offers render client-side.** The server HTML has no job data, so a
   `bun`/`fetch` CLI sees nothing.
2. **`?q=` is ignored.** `/mx/empleos?q=php` returns the same 12 offers as the
   unfiltered listing.

So this skill paginates the listing and filters **client-side** in the extractor.
`/scrape` cannot run it unattended.

## ⚠️ Personal use only

Keep volume low. Run it on your own responsibility.

## Listing URLs

> Note the host has **no `www.`** and the path is prefixed by region. Using
> `www.hireline.io/empleos` returns 404 — that cost a debugging cycle.

| Scope | URL |
|-------|-----|
| Mexico | `https://hireline.io/mx/empleos` |
| Remote LatAm | `https://hireline.io/remoto/empleos?l=latam` |
| Pagination | append `?page=<n>` (or `&page=<n>`) — ~12 offers per page |

## Procedure

1. `mcp__claude-in-chrome__tabs_context_mcp` with `createIfEmpty: true`.
2. `mcp__claude-in-chrome__navigate` to the listing URL.
3. **Wait for `document.readyState === "complete"`.**
4. Run `extract.js` via `mcp__claude-in-chrome__javascript_tool`, passing the
   keyword to `extractHireline("<keyword>")`.
5. Because only ~12 offers load per page, **walk several pages** when filtering
   by keyword: navigate `?page=2`, `?page=3`, … and merge results. Stop when a
   page returns `meta.scanned === 0`.
6. For a full description, navigate to the offer `url` and use
   `mcp__claude-in-chrome__get_page_text`.
7. **Close the tab** with `mcp__claude-in-chrome__tabs_close_mcp`.

## Output shape

```json
{
  "meta": { "count": 12, "scanned": 12, "page": 1 },
  "results": [
    {
      "id": "114352",
      "title": "Product Owner",
      "company": "Pyramid Consulting",
      "location": "Remoto: México",
      "date": null,
      "salary": "$45,000 a 50,000 MXN (Bruto)",
      "slug": "product-owner",
      "url": "https://hireline.io/mx/empleos/product-owner/114352"
    }
  ]
}
```

## Notes

- **Two parsing traps**, both handled in `extract.js`:
  - `.vacancy-subtitle` holds the **salary**, not the company. The company is
    appended to the title as `"<role> en <Company>"` and is split off the last
    `" en "`.
  - `"Sueldo oculto"` means undisclosed and is normalized to `null`.
- **Only ~12 offers per page**, so a keyword search needs several pages. This is
  the slowest of the installed portals; prefer `computrabajo-search` or
  `occ-search` for broad sweeps and use Hireline for a curated tech-only pass.
- `location` encodes the work mode inline: `"Remoto: México"`,
  `"Ciudad de México - Híbrido"`. Useful for filtering on the user's
  no-fully-on-site deal-breaker.
- No per-card posting date is rendered; `date` is always `null`.

---
name: getonbrd-search
version: 1.0.0
description: >
  Use this skill to search tech job listings on Get on Board (getonbrd.com), a
  curated Latin American tech-only job board with a high share of fully remote
  roles paying in USD. Browser-driven, not a CLI. Trigger phrases: Get on Board,
  getonbrd, empleos remotos LatAm, trabajos remotos en dolares, remote LatAm
  tech jobs, trabajo remoto USD, vacantes remotas Latinoamerica.
context: fork
enabled: true  # set to false to keep this portal installed but have /scrape skip it
allowed-tools: mcp__claude-in-chrome__navigate, mcp__claude-in-chrome__javascript_tool, mcp__claude-in-chrome__get_page_text, mcp__claude-in-chrome__tabs_context_mcp, mcp__claude-in-chrome__tabs_create_mcp, mcp__claude-in-chrome__tabs_close_mcp
---

# Get on Board Search Skill (browser-driven)

Curated tech-only job board covering Latin America, with a large share of fully
remote roles quoting salaries **in USD**. That USD-remote concentration is the
main reason to use it alongside the Mexican boards.

## ⚠️ No CLI, and no server-side keyword search

Two separate limitations, both verified 2026-08-10:

1. **Offers are rendered client-side.** The server HTML contains only navigation
   links, so a `bun`/`fetch` CLI sees no job data.
2. **`?search=` does not filter.** `/empleos?search=laravel`,
   `?search=enfermera` and `?search=react` all return byte-identical result
   sets, and the word "laravel" never appears on the page.

So this skill navigates to a **category page**, which does segment correctly,
and then filters by keyword **client-side** inside the extractor.

`/scrape` cannot run this unattended. Treat it as an interactive supplement.

## ⚠️ Personal use only

Keep volume low. Run it on your own responsibility.

## Category URLs

```
https://www.getonbrd.com/jobs/<category>
```

Verified categories relevant to this profile:

| Category | Slug |
|----------|------|
| Programming | `programming` (redirects to `/empleos/programacion`) |
| Machine learning / AI | `machine-learning-ai` |
| Sysadmin / DevOps / QA | `sysadmin-devops-qa` |
| Mobile development | `mobile-developer` |
| Data science / analytics | `data-science-analytics` |
| Cybersecurity | `cybersecurity` |

The full catalogue across every category is at `https://www.getonbrd.com/empleos`
(~162 offers). A single category page carries more depth: `/jobs/programming`
returned 334 result elements, all in the programming category.

## Procedure

1. `mcp__claude-in-chrome__tabs_context_mcp` with `createIfEmpty: true`.
2. `mcp__claude-in-chrome__navigate` to the category URL.
3. **Wait for `document.readyState === "complete"`** before extracting.
4. Run `extract.js` via `mcp__claude-in-chrome__javascript_tool`, passing the
   keyword to `extractGetOnBrd("<keyword>")`. Omit the keyword to get everything
   in the category.
5. For a full description, navigate to the offer `url` and use
   `mcp__claude-in-chrome__get_page_text`.
6. **Close the tab** with `mcp__claude-in-chrome__tabs_close_mcp`.

## Output shape

```json
{
  "meta": { "count": 1, "scanned": 208 },
  "results": [
    {
      "id": "lider-tecnico-technical-lead-laravel-php-plataforma-de-pa-promarketing-remote",
      "title": "Líder Técnico / Technical Lead Laravel/PHP– Plataforma de Pa",
      "company": "Promarketing",
      "location": "Remoto",
      "date": "Aug 03",
      "salary": null,
      "employment": "Full time",
      "category": "programming",
      "url": "https://www.getonbrd.com/jobs/programming/lider-tecnico-..."
    }
  ]
}
```

`meta.scanned` is how many offers were on the page before keyword filtering —
useful for telling "no matches" apart from "page did not load".

## Notes

- **Keyword filtering is client-side and literal**, matching title plus company.
  It will not catch a technology mentioned only in the body text, so search
  broad (`"php"`, not `"php laravel senior"`) and narrow by reading results.
- **Titles are truncated by the site itself** in the results list (note the
  `"Plataforma de Pa"` above). Open the offer URL for the full title.
- Salaries are quoted in mixed currencies (USD, CLP, MXN); the raw string is
  preserved rather than normalized.
- `date` is a short English label such as `"Aug 09"`, with no year.
- Pages carry both Spanish (`/empleos/programacion`) and English
  (`/jobs/programming`) URLs for the same offers; the extractor deduplicates on
  the slug, so mixed listings do not produce doubles.

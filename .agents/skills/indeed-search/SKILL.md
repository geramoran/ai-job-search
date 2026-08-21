---
name: indeed-search
version: 1.0.0
description: >
  Use this skill to search job listings on Indeed Mexico (mx.indeed.com),
  including remote and international postings that surface there. Unlike the
  other portal skills this one drives the user's Chrome browser instead of a
  CLI, because Indeed blocks server-side requests. Trigger phrases: Indeed,
  buscar trabajo en Indeed, empleos en Indeed, ofertas Indeed, vacantes Indeed,
  Indeed Mexico, search Indeed, jobs on Indeed.
context: fork
enabled: true  # set to false to keep this portal installed but have /scrape skip it
allowed-tools: mcp__claude-in-chrome__navigate, mcp__claude-in-chrome__javascript_tool, mcp__claude-in-chrome__get_page_text, mcp__claude-in-chrome__tabs_context_mcp, mcp__claude-in-chrome__tabs_create_mcp, mcp__claude-in-chrome__tabs_close_mcp
---

# Indeed Mexico Search Skill (browser-driven)

Search live job listings from Indeed Mexico (`mx.indeed.com`).

## ⚠️ This skill has no CLI, and that is deliberate

Every other portal skill in this repo ships a `bun` CLI. Indeed cannot, because
**it blocks server-side HTTP requests at the edge**:

```
$ curl -A "<browser UA>" "https://mx.indeed.com/jobs?q=desarrollador"
HTTP 503 — error code: 1201
```

That is a Cloudflare origin block, and no combination of headers gets past it.
Working around it would mean defeating a bot-protection system, which this repo
does not do.

What *does* work is the user's own Chrome browser, driven through the
`claude-in-chrome` tools: a real browser session with real cookies loads Indeed
normally, and the result list can then be read out of the live DOM. That is what
this skill does.

**Consequences to be aware of:**
- Chrome must be running with the Claude extension, and `mx.indeed.com` must be
  permitted in the extension's site settings.
- It is slower and more fragile than the CLI skills.
- `/scrape` cannot run it unattended the way it runs `occ-search` or
  `computrabajo-search`. Treat it as an interactive supplement.

## ⚠️ Personal use only

Automated access is against Indeed's Terms of Service. Keep volume low, do not
collect in bulk, and run it on your own responsibility.

## Search URL

Build the URL, then navigate to it:

```
https://mx.indeed.com/jobs?q=<keywords>&l=<location>&fromage=<days>&start=<offset>
```

| Parameter | Purpose | Notes |
|-----------|---------|-------|
| `q` | keywords | URL-encoded, `+` for spaces |
| `l` | location | e.g. `Torre%C3%B3n%2C+Coah.`, `Monterrey%2C+N.L.`, or `Remoto` |
| `fromage` | posted within N days | `1`, `3`, `7`, `14` — **use this instead of a per-card date** |
| `start` | pagination offset | multiples of 10 (`0`, `10`, `20`) — page N is `(N-1) * 10` |

All four were verified working on 2026-08-10.

## Procedure

1. `mcp__claude-in-chrome__tabs_context_mcp` with `createIfEmpty: true`.
2. `mcp__claude-in-chrome__navigate` to the search URL built above.
3. **Wait for hydration.** Indeed renders its result list client-side. Run
   `document.readyState` first and only extract once it returns `"complete"` —
   extracting while it is `"loading"` yields cards with empty titles. If it is
   still loading, re-run the check rather than proceeding.
4. Run the extractor in `extract.js` via
   `mcp__claude-in-chrome__javascript_tool`. It returns the same JSON shape as
   the CLI skills: `{ meta: { count, page }, results: [...] }`, each result
   carrying `id`, `title`, `company`, `location`, `date`, `salary`, `url`.
5. For a single posting's full description, navigate to
   `https://mx.indeed.com/viewjob?jk=<id>` and use
   `mcp__claude-in-chrome__get_page_text`, which returns the full job body as
   readable text.
6. **Close the tab** with `mcp__claude-in-chrome__tabs_close_mcp` when done.

## Output shape

```json
{
  "meta": { "count": 9, "page": 1 },
  "results": [
    {
      "id": "a93b8960fd5e4c8a",
      "title": "Desarrollador Python Jr",
      "company": "MAHA HOME DE MEXICO",
      "location": "Torreón, Coah.",
      "date": null,
      "salary": "$13,000 por mes",
      "url": "https://mx.indeed.com/viewjob?jk=a93b8960fd5e4c8a"
    }
  ]
}
```

## Notes

- **`date` is always `null`.** Indeed's Mexican results list renders no per-card
  posting date. Bound recency with `fromage` in the URL instead.
- **Indeed rotates its markup.** Two title layouts were observed on the same day:
  one with `<h2 class="jobTitle"><span title="...">`, one with only a titled
  `<span>` and no `<h2>`. The extractor tries each slot in turn. If titles start
  coming back `null`, that cascade is the thing to extend — see `url-reference.md`.
- Indeed aggregates from many sources, so it duplicates postings that also appear
  on OCC and Computrabajo. Deduplicate by company plus title when merging.
- Indeed also surfaces remote-international roles that the Mexican-only boards
  miss, which is the main reason to keep it despite the friction.

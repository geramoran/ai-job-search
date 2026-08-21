# OCC Mundial — endpoint reference

Reconnaissance performed 2026-08-10. This file records the parsing anchors and
portal quirks a maintainer needs when OCC changes its markup.

## Base

`https://www.occ.com.mx`

## Search

```
GET https://www.occ.com.mx/empleos/de-<slug>/[?page=<n>]
```

- `<slug>` is the query, lowercased, accent-folded to ASCII, punctuation removed,
  spaces replaced with hyphens. `"Desarrollador PHP"` → `desarrollador-php`.
- `page` is 1-indexed. Page 1 omits the parameter. ~21 results per page.
- Returns server-rendered HTML. No authentication.

### Critical: do not use `/empleos/?q=<query>`

The obvious-looking query parameter **silently ignores the search term.**
Verified 2026-08-10:

| Request | Result |
|---------|--------|
| `/empleos/?q=desarrollador` | same 22 offers |
| `/empleos/?q=enfermera` | same 22 offers |
| `/empleos/?q=chofer` | same 22 offers |

All three returned identical IDs, led by an unrelated "Almacenista" posting.
That endpoint serves a recommendation feed, not search results. The real search
is performed client-side via an authenticated XHR the public pages do not expose.
The `/empleos/de-<slug>/` SEO route does filter correctly and is what this skill
uses. `tests/search.test.ts` carries a regression guard asserting that two
unrelated queries do not return near-identical result sets.

### Parameters that do NOT work

| Parameter tried | Behaviour |
|-----------------|-----------|
| `?l=`, `?location=`, `?lugar=` | Ignored. Result set unchanged. |
| `/empleos/en-<ciudad>/` | Route resolves but does not constrain location. |
| `?tm=<n>`, `?jobage=<n>` | Ignored. Posting-age distribution unchanged. |

There is therefore no `--location` or `--jobage` flag. Location can be folded
into the query (`-q "desarrollador torreon"`), but OCC matches it loosely, so
results must still be filtered on the `location` field client-side.

### Search result card anchors

Cards are split on `data-id='<digits>'`. Each chunk is parsed independently so a
malformed card cannot break the rest.

| Field | Anchor |
|-------|--------|
| `id` | `data-id='(\d+)'` on the container, also `id="jobcard-<id>"` |
| `title` | `<h2 class="text-grey-900 text-lg ...">` |
| `date` | `<span class="mr-2 text-sm font-light">` — relative text: "Hoy", "Ayer", "Hace 4 días" |
| `salary` | `<span class="mr-2 text-grey-900 font-base font-light mb-2 sm:mb-4">` — absent on many cards |
| `company` | `<a href=".../bolsa-de-trabajo-<NAME>/">` inside `<span class="line-clamp-title">` |
| `location` | `<div class="no-alter-loc-text ...">` → inner `<p>` |
| `url` | `/empleo/oferta/<id>-<slug>` harvested from page links |

Accented Spanish is emitted as hex numeric character references (`&#xE9;` for é,
`&#xF1;` for ñ), so entity decoding is mandatory, not cosmetic.

## Detail

```
GET https://www.occ.com.mx/empleo/oferta/<id>[-<slug>]
```

The slug is optional; the bare ID resolves.

### Rate limiting (important)

Detail pages are rate limited. Measured behaviour on 2026-08-10: about **three
requests succeed, then HTTP 403 persists for an extended cooldown window**
(still returning 403 after several minutes of idling).

This is *not* a header problem, and two plausible-looking explanations were
tested and disproved:
- **Referer:** a request with a Referer returned 403 while one without returned 200.
- **Accept-Encoding:** the same inversion happened. Identical `curl` invocations
  returned 200 three times, then 403 three times, five seconds apart.

The CLI treats 403 as retryable with a longer backoff (3s floor, up to 30s,
6 attempts) and then fails with an explicit "Rate limited" message. Callers
should not fetch descriptions for a whole result page in a loop.

### Detail parsing — prefer the JSON-LD

Detail pages embed a schema.org `JobPosting` block:

```html
<script type="application/ld+json">{ ... };</script>
```

Two quirks:
1. Keys are **PascalCase** (`Title`, `Description`, `DatePosted`), not
   schema.org's usual camelCase. The parser does case-insensitive lookups so
   both forms resolve if OCC ever normalizes them.
2. A stray `;` follows the closing brace, so `JSON.parse` on the whole script
   body throws. The parser brace-matches the leading object instead.

| Field | JSON-LD path |
|-------|--------------|
| `title` | `Title` |
| `company` | `HiringOrganization.Name` (fallback `identifier.Name`) |
| `location` | `JobLocation.Address.AddressLocality` + `.AddressRegion` |
| `date` | `DatePosted` (ISO `YYYY-MM-DD`) |
| `validThrough` | `ValidThrough` |
| `employmentType` | `EmploymentType` (e.g. "Tiempo completo") |
| `salaryMin/Max/Currency/Period` | `BaseSalary.Value.{MinValue,MaxValue}`, `BaseSalary.Currency`, `BaseSalary.Value.UnitText` |
| `description` | `Description` — HTML, converted to plain text |

A `0 - 0` salary range means "not disclosed" and is normalized to `null`.

If the JSON-LD block is missing, the parser falls back to the `<title>` tag,
which has the form `Trabajo de <Title> - <id> | OCC`.

## robots.txt

Checked 2026-08-10. Neither `/empleos/` nor `/empleo/oferta/` is disallowed for
`User-agent: *`. Note `Disallow:/rest` with `Allow:/rest?server=jobs` — that REST
API exists but returns `401 {"errors":[{"code":"SVR-03"}]}` without credentials,
so it is unusable here.

Personal use only: keep volume low.

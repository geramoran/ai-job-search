# Computrabajo Mexico — endpoint reference

Reconnaissance performed 2026-08-10. Records the parsing anchors and portal
quirks a maintainer needs when the markup changes.

## Base

`https://mx.computrabajo.com` — server-rendered HTML, UTF-8 (`Content-Type: text/html; charset=utf-8`).

## Search

Search is a **path route**, not a query parameter:

```
GET /trabajo-de-<slug>                    keyword
GET /trabajo-de-<slug>-en-<ciudad-slug>   keyword + location
GET /trabajo-de-<slug>?p=<n>              page (1-indexed, ~20 per page)
```

Slugs are lowercase, accent-folded ASCII with hyphens for spaces:
`"Desarrollador PHP"` → `desarrollador-php`, `"Torreón"` → `torreon`.

### Verified behaviour

| Check | Result |
|-------|--------|
| Does the keyword filter? | **Yes.** `desarrollador` and `enfermera` return **zero** overlapping offer IDs, and titles track the keyword. |
| Does the location filter? | **Yes.** `/trabajo-de-desarrollador-en-torreon` returns mostly Torreón offers. |
| Pagination | `?p=2` returns a different result set. |

Location searches pad the tail of the list with offers from other cities
("también te puede interesar"), so a location filter is a strong signal but not
an absolute guarantee. The live test asserts a majority, not every row.

### Search card anchors

Offers are `<article class="box_offer ...">` elements.

> **Watch the quoting.** `data-id` uses **single** quotes: `data-id='2CD4A159...'`.
> A regex written for double quotes matches unrelated elements and silently
> returns 3 results instead of 20. This cost a debugging cycle during
> reconnaissance.

| Field | Anchor |
|-------|--------|
| `id` | `<article ... data-id='<HEX>'>` — 32-char uppercase hex, **not numeric** |
| `title` + `url` | `<a class="js-o-link fc_base" href="...">` inside `<h2 class="fs18 fwB prB">` |
| `company` | `<a ... offer-grid-article-company-url>` inside `<p class="dFlex vm_fx fs16 fc_base mt5">` |
| `location` | `<p class="fs16 fc_base mt5"><span class="mr10">` |
| `salary` | text following `<span class="icon i_salary"></span>` — absent on many offers |
| `date` | `<p class="fs13 fc_aux mt15">` — relative: "Hace 3 horas", "Ayer", "Hace 5 días" |

**Company name trap:** the `<p>` wrapping the company anchor *also* contains the
employer's star rating, so taking the paragraph's text yields `"4.0 Grupo Nach"`.
Read the `offer-grid-article-company-url` anchor instead. Confidential postings
have no anchor and carry plain text (`"Importante empresa del sector"`), so the
fallback keeps the paragraph text and strips a leading `\d+[.,]\d+` rating.

Accented Spanish arrives as hex numeric character references (`&#xF3;` for ó).

## Detail

```
GET /ofertas-de-trabajo/oferta-de-trabajo-de-<slug>-<ID>
```

**The slug segment is arbitrary.** `oferta-de-trabajo-de-x-<ID>` resolves
correctly, so `detail <ID>` builds a URL without needing the real slug. A bare
`/ofertas-de-trabajo/oferta-de-trabajo-de-<ID>` (no slug at all) returns 404.

There is **no schema.org JobPosting JSON-LD** on detail pages — the only
`ld+json` block is an `Organization`. Parsing is therefore HTML-based.

| Field | Anchor |
|-------|--------|
| `title` | `<h1 class="fwB fs24 mb5 box_detail w100_m">` |
| `company` + `location` | the `<p class="fs16">` right after the H1, formatted `"<company> - <location>"` — split on the **last** `" - "`, since titles and companies can contain hyphens |
| `salary` / `contractType` / `workday` | `<span class="tag base mb10">` chips, in no fixed order — classified by content, not position |
| `description` | first `<p class="mbB">` inside `<div ... div-link="oferta">` |
| `requirements` | `<li>` items inside `<ul class="disc mbB">` |

## robots.txt

Checked 2026-08-10. `/ofertas-de-trabajo/*` and `/trabajo-de-*` are allowed for
`User-agent: *`, but these are **disallowed** and are therefore never sent:

```
Disallow: /ofertas-de-trabajo/*pubdate=     (posting-age filter)
Disallow: /ofertas-de-trabajo/*dis=         (distance)
Disallow: /ofertas-de-trabajo/*sal=         (salary)
Disallow: /ofertas-de-trabajo/*cont=        (contract type)
Disallow: /Ajax/*, /_services/*             (internal endpoints)
Disallow: /hojas-de-vida/*, /curriculums/*  (candidate CVs)
```

This is why the CLI exposes no `--jobage` flag: the parameter exists but is
disallowed. Filter on the relative `date` field client-side instead.

Personal use only: keep volume low.

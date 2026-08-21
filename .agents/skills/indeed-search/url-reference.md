# Indeed Mexico — endpoint and DOM reference

Reconnaissance performed 2026-08-10.

## Access model

| Path | Result |
|------|--------|
| `curl`/`fetch` from a server | **HTTP 503, `error code: 1201`** — Cloudflare origin block |
| Real Chrome session via `claude-in-chrome` | **HTTP 200**, full results |

`robots.txt` itself is permissive (`User-agent: * / Allow: /`, with specific
disallows for `/*&serpstart=`, `/advanced_search`, `/company/*`, `/api/*`, and
similar). The block is at the CDN layer, not in robots.txt. This skill therefore
uses the browser rather than attempting to defeat the protection.

Parameters this skill never sends, because robots.txt disallows them:
`serpstart`, `alid`, `calert`, `iafilter`, `mna`, `rss`.

## Search URL

```
https://mx.indeed.com/jobs?q=<keywords>&l=<location>&fromage=<days>&start=<offset>
```

| Parameter | Verified | Notes |
|-----------|----------|-------|
| `q` | yes | keywords, `+` for spaces |
| `l` | yes | `Torre%C3%B3n%2C+Coah.` narrowed results to Torreón |
| `fromage` | yes | days: 1 / 3 / 7 / 14. Page title changes to "Nuevos trabajos …" |
| `start` | yes | offset in multiples of 10 |

## Detail URL

```
https://mx.indeed.com/viewjob?jk=<id>
```

`id` is the 16-char hex `data-jk` attribute. `get_page_text` on this URL returns
the full description as readable text, including responsibilities, requirements,
salary, and benefits.

## DOM anchors

**Wait for `document.readyState === "complete"` before extracting.** Indeed
hydrates the list client-side; extracting during `"loading"` returns cards whose
title fields are empty while company and location are already populated — a
partial result that looks like a parser bug but is a timing bug.

| Field | Selector |
|-------|----------|
| card | `.job_seen_beacon`, fallback `li:has(a[data-jk])` |
| `id` | `a[data-jk]` → `data-jk` attribute (16-char hex) |
| `title` | **cascade**, see below |
| `company` | `[data-testid="company-name"]` |
| `location` | `[data-testid="text-location"]` |
| `salary` | `[data-testid="attribute_snippet_testid"]`, fallback `.salary-snippet-container` |
| `date` | none — no per-card date exists in this market's list |

### The title cascade

Two markup variants were observed **on the same day, same account**:

1. `<h2 class="jobTitle"><span title="Desarrollador Full Stack">…`
2. no `<h2>` at all; only `<span title="Desarrollador Python Jr">` plus the
   anchor text and an `aria-label` of `"detalles completos de <title>"`

The extractor tries, in order: `span[title]` attribute →
`h2.jobTitle span[title]` → `h2.jobTitle` → anchor text. If Indeed adds a third
variant and titles return `null`, extend this cascade rather than replacing it —
the existing branches still fire for other users.

### Fields checked and found absent

- Per-card posting date: no `[data-testid*="date"]`, `.date`, or any leaf node
  matching `/hace|publicad|nuevo|días|hoy/` inside a card.
- `.jobMetaDataGroup` exists but concatenates salary and benefits, so it is not
  a usable date source.

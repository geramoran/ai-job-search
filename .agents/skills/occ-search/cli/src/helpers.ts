// Data source: OCC Mundial (occ.com.mx) public job pages. No authentication required.
//
// IMPORTANT — two findings from reconnaissance that shape this file:
//
// 1. The `?q=` query parameter on /empleos/ does NOT filter. Requesting
//    /empleos/?q=desarrollador, /empleos/?q=enfermera and /empleos/?q=chofer all
//    return the identical 22 recommended offers. The real keyword search is the
//    SEO route /empleos/de-<slug>/, which does filter correctly. Never switch
//    back to `?q=` — it silently returns plausible-looking but unrelated results.
//
// 2. Detail pages are RATE LIMITED and answer HTTP 403 once the limit is hit.
//    Measured behaviour: roughly 3 detail requests succeed, then 403 persists
//    for a cooldown window. It is not a header problem — identical requests
//    return 200 then 403 minutes apart, and no combination of User-Agent,
//    Referer, or Accept-Encoding avoids it. We therefore treat 403 as a
//    retryable status with a long backoff, and callers should space detail
//    lookups out rather than fetching descriptions for a whole result page.
//    Search pages are not affected.
//
// Search results are parsed from HTML job cards; detail pages carry a schema.org
// JSON-LD JobPosting block, which we prefer over HTML scraping because it is far
// more stable across markup changes.

export const BASE = "https://www.occ.com.mx"
export const SEARCH_BASE = `${BASE}/empleos/de-`
export const DETAIL_BASE = `${BASE}/empleo/oferta`

export function writeError(error: string, code: string): void {
  process.stderr.write(JSON.stringify({ error, code }) + "\n")
}

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

/**
 * Turn a free-text query into the slug OCC's SEO search route expects.
 * "Desarrollador PHP" -> "desarrollador-php"; accents are folded because the
 * route uses unaccented ASCII slugs ("programacion", not "programación").
 */
export function slugify(query: string): string {
  return query
    .normalize("NFD")
    // The character class below is the Unicode combining-diacritics block
    // (U+0300-U+036F). It renders as invisible marks in most editors; that is
    // expected, not file corruption. NFD splits "ó" into "o" + U+0301, and this
    // strips the mark, leaving plain ASCII for the slug.
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

/** Fetch HTML with exponential backoff on 429/5xx. Returns "" on a 404. */
export async function htmlFetch(url: string, referer = `${BASE}/`): Promise<string> {
  const maxRetries = 6
  let delay = 500
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "es-MX,es;q=0.9,en;q=0.8",
        Referer: referer,
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    })
    // 403 is OCC's rate-limit response, not a permanent denial, so it is
    // retried like 429. It needs a longer cooldown than a transient 5xx.
    if (response.status === 429 || response.status === 403 || response.status >= 500) {
      if (attempt === maxRetries) {
        throw new Error(
          response.status === 403
            ? "Rate limited by OCC (HTTP 403) after retries. Wait a few minutes and try again, " +
              "or fetch fewer detail pages in a row."
            : `Request failed: ${response.status} ${response.statusText}`,
        )
      }
      const jitter = Math.floor(Math.random() * 500)
      const wait = response.status === 403 ? Math.max(delay, 3000) : delay
      await new Promise((r) => setTimeout(r, wait + jitter))
      delay = Math.min(delay * 2, response.status === 403 ? 30000 : 8000)
      continue
    }
    if (response.status === 404) return ""
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`)
    }
    return response.text()
  }
  throw new Error("Request failed after max retries")
}

export interface JobCard {
  id: string
  title: string
  company: string | null
  location: string | null
  date: string | null
  salary: string | null
  url: string
}

export interface JobDetail extends JobCard {
  description: string | null
  employmentType: string | null
  validThrough: string | null
  salaryMin: number | null
  salaryMax: number | null
  salaryCurrency: string | null
  salaryPeriod: string | null
}

function numericEntity(cp: number): string {
  return cp >= 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : ""
}

/**
 * Decode HTML entities. OCC emits hex numeric references heavily for accented
 * Spanish (&#xE9; for é, &#xF1; for ñ), so numeric refs matter more here than
 * the handful of named ones.
 */
export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&aacute;/gi, "á")
    .replace(/&eacute;/gi, "é")
    .replace(/&iacute;/gi, "í")
    .replace(/&oacute;/gi, "ó")
    .replace(/&uacute;/gi, "ú")
    .replace(/&ntilde;/gi, "ñ")
    .replace(/&#(\d+);/g, (_, dec) => numericEntity(parseInt(dec, 10)))
    .replace(/&#[xX]([0-9a-fA-F]+);/g, (_, hex) => numericEntity(parseInt(hex, 16)))
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
}

function clean(html: string): string {
  return decodeHtmlEntities(stripTags(html))
}

/**
 * Parse the search-results page. Cards are split on the `data-id='<n>'`
 * attribute of the offer container and each chunk is parsed independently, so
 * one malformed card cannot break the rest.
 */
export function parseJobCards(html: string): JobCard[] {
  const results: JobCard[] = []
  const seen = new Set<string>()

  // Map offer id -> canonical slug URL, harvested from the page's links.
  const slugById = new Map<string, string>()
  for (const m of html.matchAll(/\/empleo\/oferta\/(\d+)-([a-z0-9-]+)/gi)) {
    if (!slugById.has(m[1])) slugById.set(m[1], `${DETAIL_BASE}/${m[1]}-${m[2]}`)
  }

  const chunks = html.split(/data-id='(?=\d)/).slice(1)

  for (const chunk of chunks) {
    const idMatch = chunk.match(/^(\d+)'/)
    if (!idMatch) continue
    const id = idMatch[1]
    if (seen.has(id)) continue

    const titleMatch = chunk.match(
      /<h2 class="text-grey-900 text-lg[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/h2>/i,
    )
    const title = titleMatch ? clean(titleMatch[1]) : ""
    if (!title) continue

    // Relative posting date rendered as "Hoy" / "Ayer" / "Hace N dias".
    const dateMatch = chunk.match(/<span class="mr-2 text-sm font-light"[^>]*>\s*([^<]+?)\s*<\/span>/i)
    const date = dateMatch ? clean(dateMatch[1]) || null : null

    const salaryMatch = chunk.match(
      /<span class="mr-2 text-grey-900 font-base font-light[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/span>/i,
    )
    const salary = salaryMatch ? clean(salaryMatch[1]) || null : null

    // Company sits inside the "bolsa-de-trabajo-" anchor.
    const companyMatch = chunk.match(
      /href="[^"]*\/bolsa-de-trabajo-[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/a>/i,
    )
    const company = companyMatch ? clean(companyMatch[1]) || null : null

    const locMatch = chunk.match(
      /no-alter-loc-text[^>]*>[\s\S]{0,200}?<p[^>]*>\s*([\s\S]*?)\s*<\/p>/i,
    )
    const location = locMatch ? clean(locMatch[1]) || null : null

    seen.add(id)
    results.push({
      id,
      title,
      company,
      location,
      date,
      salary,
      url: slugById.get(id) ?? `${DETAIL_BASE}/${id}`,
    })
  }

  return results
}

/**
 * Extract the schema.org JobPosting object from a detail page.
 * OCC emits PascalCase keys ("Title", "Description") rather than schema.org's
 * usual camelCase, and appends a stray ";" after the JSON, so we decode the
 * leading object rather than JSON.parse-ing the whole script body.
 */
function extractJobPostingLd(html: string): Record<string, unknown> | null {
  const scripts = html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
  )
  for (const s of scripts) {
    const body = s[1].trim()
    if (!body.includes("JobPosting")) continue
    // Trim anything after the first complete JSON object.
    let depth = 0
    let end = -1
    let inStr = false
    let esc = false
    for (let i = 0; i < body.length; i++) {
      const ch = body[i]
      if (inStr) {
        if (esc) esc = false
        else if (ch === "\\") esc = true
        else if (ch === '"') inStr = false
        continue
      }
      if (ch === '"') inStr = true
      else if (ch === "{") depth++
      else if (ch === "}") {
        depth--
        if (depth === 0) {
          end = i + 1
          break
        }
      }
    }
    if (end === -1) continue
    try {
      return JSON.parse(body.slice(0, end)) as Record<string, unknown>
    } catch {
      continue
    }
  }
  return null
}

/** Case-insensitive property lookup, so both `Title` and `title` resolve. */
function prop(obj: Record<string, unknown> | null, name: string): unknown {
  if (!obj) return undefined
  const key = Object.keys(obj).find((k) => k.toLowerCase() === name.toLowerCase())
  return key ? obj[key] : undefined
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null
}

function asString(v: unknown): string | null {
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null
}

function asNumber(v: unknown): number | null {
  const n = typeof v === "number" ? v : typeof v === "string" ? parseFloat(v) : NaN
  return Number.isFinite(n) ? n : null
}

/** Convert the description's HTML into readable plain text with paragraph breaks. */
export function htmlToText(html: string): string {
  const withBreaks = html
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\/(p|li|ul|ol|div|h\d)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
  return decodeHtmlEntities(withBreaks.replace(/<[^>]+>/g, ""))
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

/** Parse a detail page, preferring the JSON-LD block over HTML scraping. */
export function parseJobDetail(html: string, id: string): JobDetail {
  const ld = extractJobPostingLd(html)

  const title =
    asString(prop(ld, "Title")) ??
    (html.match(/<title>\s*(?:Trabajo de\s*)?([^<|]+?)\s*(?:-\s*\d+\s*)?\|/i)?.[1]?.trim() ||
      "(sin titulo)")

  const org = asRecord(prop(ld, "HiringOrganization"))
  const identifier = asRecord(prop(ld, "identifier"))
  const company = asString(prop(org, "Name")) ?? asString(prop(identifier, "Name"))

  const place = asRecord(prop(ld, "JobLocation"))
  const address = asRecord(prop(place, "Address"))
  const locality = asString(prop(address, "AddressLocality"))
  const region = asString(prop(address, "AddressRegion"))
  const location = [locality, region].filter(Boolean).join(", ") || null

  const descRaw = asString(prop(ld, "Description"))
  const description = descRaw ? htmlToText(descRaw) || null : null

  const salary = asRecord(prop(ld, "BaseSalary"))
  const salaryValue = asRecord(prop(salary, "Value"))
  const salaryMin = asNumber(prop(salaryValue, "MinValue"))
  const salaryMax = asNumber(prop(salaryValue, "MaxValue"))
  const salaryCurrency = asString(prop(salary, "Currency"))
  const salaryPeriod = asString(prop(salaryValue, "UnitText"))

  const urlFromLd = asString(prop(ld, "Url"))

  return {
    id,
    title,
    company,
    location,
    date: asString(prop(ld, "DatePosted")),
    salary:
      salaryMin !== null && salaryMax !== null && (salaryMin > 0 || salaryMax > 0)
        ? `${salaryMin} - ${salaryMax} ${salaryCurrency ?? ""}`.trim()
        : null,
    url: urlFromLd ? urlFromLd.replace(/^http:/, "https:") : `${DETAIL_BASE}/${id}`,
    description,
    employmentType: asString(prop(ld, "EmploymentType")),
    validThrough: asString(prop(ld, "ValidThrough")),
    salaryMin,
    salaryMax,
    salaryCurrency,
    salaryPeriod,
  }
}

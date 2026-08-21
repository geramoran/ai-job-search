// Data source: Computrabajo Mexico (mx.computrabajo.com) public job pages.
// No authentication required. Server-rendered HTML, UTF-8.
//
// Findings from reconnaissance (2026-08-10), see ../url-reference.md:
//
// 1. Search is a path route, not a query parameter:
//      /trabajo-de-<slug>              keyword search
//      /trabajo-de-<slug>-en-<ciudad>  keyword + location (this one DOES filter)
//    Verified filtering: "desarrollador" and "enfermera" return zero overlapping
//    offer IDs, and titles track the keyword.
//
// 2. Offer IDs are 32-character uppercase hex, not numeric.
//
// 3. Offer containers use SINGLE quotes: data-id='<ID>'. A regex expecting
//    double quotes silently matches unrelated elements instead.
//
// 4. The detail URL slug is arbitrary — /ofertas-de-trabajo/oferta-de-trabajo-de-x-<ID>
//    resolves fine — so `detail <ID>` can build a URL without knowing the slug.

export const BASE = "https://mx.computrabajo.com"
export const SEARCH_BASE = `${BASE}/trabajo-de-`
export const DETAIL_BASE = `${BASE}/ofertas-de-trabajo/oferta-de-trabajo-de`

export function writeError(error: string, code: string): void {
  process.stderr.write(JSON.stringify({ error, code }) + "\n")
}

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

/**
 * Turn free text into the slug Computrabajo's path routes expect.
 * "Desarrollador PHP" -> "desarrollador-php"; accents fold to ASCII.
 * The character class strips Unicode combining diacritics (U+0300-U+036F),
 * which render as invisible marks in most editors.
 */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

/** Fetch HTML with exponential backoff on 429/5xx. Returns "" on a 404. */
export async function htmlFetch(url: string): Promise<string> {
  const maxRetries = 6
  let delay = 500
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "es-MX,es;q=0.9,en;q=0.8",
        Referer: `${BASE}/`,
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    })
    if (response.status === 429 || response.status >= 500) {
      if (attempt === maxRetries) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`)
      }
      const jitter = Math.floor(Math.random() * 500)
      await new Promise((r) => setTimeout(r, delay + jitter))
      delay = Math.min(delay * 2, 8000)
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
  contractType: string | null
  workday: string | null
  requirements: string[]
}

function numericEntity(cp: number): string {
  return cp >= 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : ""
}

/** Computrabajo emits accented Spanish as hex numeric references (&#xE9;). */
export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, dec) => numericEntity(parseInt(dec, 10)))
    .replace(/&#[xX]([0-9a-fA-F]+);/g, (_, hex) => numericEntity(parseInt(hex, 16)))
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
}

function clean(html: string): string {
  return decodeHtmlEntities(stripTags(html))
}

/** Convert an HTML fragment to readable text, keeping line structure. */
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

export function detailUrl(id: string): string {
  // The slug segment is arbitrary; "x" is enough for the route to resolve.
  return `${DETAIL_BASE}-x-${id}`
}

/**
 * Parse the search-results page. Offers are `<article class="box_offer ...">`
 * elements carrying data-id in SINGLE quotes. Each chunk is parsed
 * independently so one malformed card cannot break the rest.
 */
export function parseJobCards(html: string): JobCard[] {
  const results: JobCard[] = []
  const seen = new Set<string>()

  const chunks = html.split(/<article[^>]*\bdata-id='/i).slice(1)

  for (const chunk of chunks) {
    const idMatch = chunk.match(/^([0-9A-Fa-f]{16,})'/)
    if (!idMatch) continue
    const id = idMatch[1].toUpperCase()
    if (seen.has(id)) continue

    // Title and canonical URL both live in the js-o-link anchor.
    const linkMatch = chunk.match(
      /<a[^>]*class="[^"]*js-o-link[^"]*"[^>]*href="([^"#]+)[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/a>/i,
    )
    if (!linkMatch) continue
    const href = decodeHtmlEntities(linkMatch[1])
    const title = clean(linkMatch[2])
    if (!title) continue

    // Company: prefer the dedicated anchor, because the surrounding <p> also
    // contains the employer's star rating ("4.0"), which would otherwise be
    // concatenated into the name as "4.0 Grupo Nach". Offers posted
    // confidentially have no anchor and carry plain text instead
    // ("Importante empresa del sector"), so fall back to the paragraph and
    // strip any leading rating.
    const companyBlock = chunk.match(
      /<p class="dFlex vm_fx fs16 fc_base mt5"[^>]*>\s*([\s\S]*?)\s*<\/p>/i,
    )
    let company: string | null = null
    if (companyBlock) {
      const anchor = companyBlock[1].match(
        /<a[^>]*offer-grid-article-company-url[^>]*>\s*([\s\S]*?)\s*<\/a>/i,
      )
      company = clean(anchor ? anchor[1] : companyBlock[1]).replace(/^\d+[.,]\d+\s+/, "") || null
    }

    const locMatch = chunk.match(
      /<p class="fs16 fc_base mt5"[^>]*>\s*<span class="mr10"[^>]*>\s*([\s\S]*?)\s*<\/span>/i,
    )
    const location = locMatch ? clean(locMatch[1]) || null : null

    // Salary sits next to an i_salary icon; absent on many offers.
    const salaryMatch = chunk.match(
      /<span class="icon i_salary"[^>]*><\/span>\s*([\s\S]*?)\s*<\/span>/i,
    )
    const salary = salaryMatch ? clean(salaryMatch[1]) || null : null

    // Relative posting date, e.g. "Hace 3 horas", "Ayer".
    const dateMatch = chunk.match(/<p class="fs13 fc_aux mt15"[^>]*>\s*([\s\S]*?)\s*<\/p>/i)
    const date = dateMatch ? clean(dateMatch[1]).replace(/\s+/g, " ") || null : null

    seen.add(id)
    results.push({
      id,
      title,
      company,
      location,
      date,
      salary,
      url: href.startsWith("http") ? href : `${BASE}${href}`,
    })
  }

  return results
}

/** Parse a single offer's detail page. */
export function parseJobDetail(html: string, id: string): JobDetail {
  const titleMatch = html.match(/<h1 class="fwB fs24[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/h1>/i)
  const title = titleMatch ? clean(titleMatch[1]) : "(sin titulo)"

  // The line under the H1 is "<company> - <location>".
  const subMatch = html.match(/<h1 class="fwB fs24[^"]*"[^>]*>[\s\S]*?<\/h1>\s*<p class="fs16"[^>]*>\s*([\s\S]*?)\s*<\/p>/i)
  let company: string | null = null
  let location: string | null = null
  if (subMatch) {
    const sub = clean(subMatch[1])
    const split = sub.lastIndexOf(" - ")
    if (split > 0) {
      company = sub.slice(0, split).trim() || null
      location = sub.slice(split + 3).trim() || null
    } else {
      company = sub || null
    }
  }

  // Tag chips carry salary, contract type and workday, in no fixed order.
  const tags: string[] = []
  for (const m of html.matchAll(/<span class="tag base mb10"[^>]*>\s*([\s\S]*?)\s*<\/span>/gi)) {
    const t = clean(m[1])
    if (t) tags.push(t)
  }
  const salary = tags.find((t) => /\$|sueldo|mensual|quincenal/i.test(t)) ?? null
  const contractType = tags.find((t) => /contrato/i.test(t)) ?? null
  const workday = tags.find((t) => /tiempo (completo|parcial)|jornada|medio tiempo/i.test(t)) ?? null

  // Main description paragraph inside the offer block.
  let description: string | null = null
  const block = html.match(/div-link="oferta"[\s\S]*?<p class="mbB"[^>]*>([\s\S]*?)<\/p>/i)
  if (block) description = htmlToText(block[1]) || null

  // "Requerimientos" bullet list.
  const requirements: string[] = []
  const reqList = html.match(/<ul class="disc mbB"[^>]*>([\s\S]*?)<\/ul>/i)
  if (reqList) {
    for (const li of reqList[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
      const t = clean(li[1])
      if (t) requirements.push(t)
    }
  }

  return {
    id: id.toUpperCase(),
    title,
    company,
    location,
    date: null,
    salary,
    url: detailUrl(id),
    description,
    contractType,
    workday,
    requirements,
  }
}

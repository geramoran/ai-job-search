import {
  SEARCH_BASE,
  htmlFetch,
  parseJobCards,
  slugify,
  writeError,
  type JobCard,
} from "../helpers.js"

export interface SearchOpts {
  query: string
  location?: string
  page: number
  limit?: number
  format: "json" | "table" | "plain"
}

export function buildUrl(opts: SearchOpts): string {
  const q = slugify(opts.query)
  const loc = opts.location ? slugify(opts.location) : ""
  const path = loc ? `${q}-en-${loc}` : q
  const page = opts.page > 1 ? `?p=${opts.page}` : ""
  return `${SEARCH_BASE}${path}${page}`
}

/**
 * Offer IDs are 32-char hex and must be copyable into `detail`, so they are
 * never truncated. The other columns are trimmed instead.
 */
function renderTable(cards: JobCard[]): string {
  if (cards.length === 0) return "No results."
  const rows = cards.map((c) => {
    const title = (c.title || "").slice(0, 34).padEnd(34)
    const company = (c.company || "-").slice(0, 22).padEnd(22)
    const loc = (c.location || "-").slice(0, 22).padEnd(22)
    return `${c.id.padEnd(32)} ${title} ${company} ${loc} ${c.date || "-"}`
  })
  const header =
    "ID".padEnd(32) +
    " " +
    "TITLE".padEnd(34) +
    " " +
    "COMPANY".padEnd(22) +
    " " +
    "LOCATION".padEnd(22) +
    " DATE"
  return [header, "-".repeat(header.length), ...rows].join("\n")
}

export async function runSearch(opts: SearchOpts): Promise<number> {
  try {
    if (!slugify(opts.query)) {
      writeError(
        `--query "${opts.query}" produced an empty search slug; use letters or numbers`,
        "BAD_QUERY",
      )
      return 1
    }
    const html = await htmlFetch(buildUrl(opts))
    if (!html) {
      process.stdout.write(
        opts.format === "json"
          ? JSON.stringify({ meta: { count: 0, page: opts.page }, results: [] }, null, 2) + "\n"
          : "No results.\n",
      )
      return 0
    }
    let cards = parseJobCards(html)
    if (opts.limit !== undefined && opts.limit >= 0) cards = cards.slice(0, opts.limit)

    if (opts.format === "table") {
      process.stdout.write(renderTable(cards) + "\n")
    } else if (opts.format === "plain") {
      process.stdout.write(
        cards
          .map(
            (c) =>
              `${c.title}\n  ${c.company || "-"} · ${c.location || "-"} · ${c.date || "-"}` +
              `${c.salary ? `\n  ${c.salary}` : ""}\n  id: ${c.id}\n  ${c.url}`,
          )
          .join("\n\n") + "\n",
      )
    } else {
      process.stdout.write(
        JSON.stringify({ meta: { count: cards.length, page: opts.page }, results: cards }, null, 2) +
          "\n",
      )
    }
    return 0
  } catch (e) {
    writeError(e instanceof Error ? e.message : String(e), "SEARCH_FAILED")
    return 1
  }
}

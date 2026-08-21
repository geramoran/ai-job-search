import { BASE, DETAIL_BASE, htmlFetch, parseJobDetail, writeError } from "../helpers.js"

export interface DetailOpts {
  id: string
  format: "json" | "plain"
}

/** Accept a raw offer ID or any occ.com.mx offer URL. */
function normalizeId(input: string): string | null {
  const fromUrl = input.match(/\/empleo\/oferta\/(\d+)/)
  if (fromUrl) return fromUrl[1]
  const bare = input.match(/^\d{5,}$/)
  if (bare) return input
  const anyNum = input.match(/(\d{5,})/)
  return anyNum ? anyNum[1] : null
}

export async function runDetail(opts: DetailOpts): Promise<number> {
  const id = normalizeId(opts.id)
  if (!id) {
    writeError(`Could not parse an offer ID from "${opts.id}"`, "BAD_ID")
    return 1
  }
  try {
    // A Referer is mandatory here: OCC answers 403 on detail pages without one.
    const html = await htmlFetch(`${DETAIL_BASE}/${id}`, `${BASE}/empleos/`)
    if (!html) {
      writeError("Offer not found", "NOT_FOUND")
      return 1
    }
    const job = parseJobDetail(html, id)

    if (opts.format === "plain") {
      const lines = [
        job.title,
        `${job.company || "-"} · ${job.location || "-"}`,
        "",
        job.date ? `Publicada: ${job.date}` : "",
        job.validThrough ? `Vigente hasta: ${job.validThrough}` : "",
        job.employmentType ? `Jornada: ${job.employmentType}` : "",
        job.salary ? `Salario: ${job.salary} (${job.salaryPeriod ?? "?"})` : "",
        "",
        job.description || "(sin descripcion)",
        "",
        `URL: ${job.url}`,
      ].filter((l) => l !== "")
      process.stdout.write(lines.join("\n") + "\n")
    } else {
      process.stdout.write(JSON.stringify(job, null, 2) + "\n")
    }
    return 0
  } catch (e) {
    writeError(e instanceof Error ? e.message : String(e), "DETAIL_FAILED")
    return 1
  }
}

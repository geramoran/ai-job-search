import { detailUrl, htmlFetch, parseJobDetail, writeError } from "../helpers.js"

export interface DetailOpts {
  id: string
  format: "json" | "plain"
}

/** Accept a raw 32-char hex offer ID or any Computrabajo offer URL. */
function normalizeId(input: string): string | null {
  const bare = input.match(/^[0-9A-Fa-f]{16,}$/)
  if (bare) return input.toUpperCase()
  // URLs end with the id, optionally followed by #lc=... or ?params.
  const fromUrl = input.match(/([0-9A-Fa-f]{24,})(?:[#?]|$)/)
  if (fromUrl) return fromUrl[1].toUpperCase()
  const oi = input.match(/[?&]oi=([0-9A-Fa-f]+)/i)
  if (oi) return oi[1].toUpperCase()
  return null
}

export async function runDetail(opts: DetailOpts): Promise<number> {
  const id = normalizeId(opts.id)
  if (!id) {
    writeError(`Could not parse an offer ID from "${opts.id}"`, "BAD_ID")
    return 1
  }
  try {
    const html = await htmlFetch(detailUrl(id))
    if (!html) {
      writeError("Offer not found", "NOT_FOUND")
      return 1
    }
    const job = parseJobDetail(html, id)
    if (job.title === "(sin titulo)" && !job.description) {
      writeError("Offer not found or no longer published", "NOT_FOUND")
      return 1
    }

    if (opts.format === "plain") {
      const lines = [
        job.title,
        `${job.company || "-"} · ${job.location || "-"}`,
        "",
        job.salary ? `Salario: ${job.salary}` : "",
        job.contractType ? `Contrato: ${job.contractType}` : "",
        job.workday ? `Jornada: ${job.workday}` : "",
        "",
        job.description || "(sin descripcion)",
        "",
        job.requirements.length ? "Requerimientos:" : "",
        ...job.requirements.map((r) => `- ${r}`),
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

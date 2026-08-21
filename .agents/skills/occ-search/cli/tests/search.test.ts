import { describe, expect, test } from "bun:test"
import { runCLI, parseJSON } from "./helpers.js"

interface SearchResponse {
  meta: { count: number; page: number }
  results: Array<{
    id: string
    title: string
    company: string | null
    location: string | null
    date: string | null
    salary: string | null
    url: string
  }>
}

describe("occ-search CLI — argument handling", () => {
  test("search without --query exits 1 with a JSON error on stderr", async () => {
    const r = await runCLI(["search"])
    expect(r.exitCode).toBe(1)
    expect(r.stdout).toBe("")
    const err = JSON.parse(r.stderr)
    expect(err.code).toBe("NO_QUERY")
  })

  test("a non-numeric --page exits 1 with BAD_ARG", async () => {
    const r = await runCLI(["search", "-q", "desarrollador", "--page", "abc"])
    expect(r.exitCode).toBe(1)
    expect(JSON.parse(r.stderr).code).toBe("BAD_ARG")
  })

  test("an unknown command exits 1 with BAD_CMD", async () => {
    const r = await runCLI(["frobnicate"])
    expect(r.exitCode).toBe(1)
    expect(JSON.parse(r.stderr).code).toBe("BAD_CMD")
  })

  test("detail without an id exits 1 with NO_ID", async () => {
    const r = await runCLI(["detail"])
    expect(r.exitCode).toBe(1)
    expect(JSON.parse(r.stderr).code).toBe("NO_ID")
  })

  test("a query that slugifies to nothing exits 1 with BAD_QUERY", async () => {
    const r = await runCLI(["search", "-q", "!!!"])
    expect(r.exitCode).toBe(1)
    expect(JSON.parse(r.stderr).code).toBe("BAD_QUERY")
  })
})

describe("occ-search CLI — live search", () => {
  test("returns populated results for a real query", async () => {
    const r = await runCLI(["search", "-q", "desarrollador php", "--limit", "5"])
    const data = parseJSON<SearchResponse>(r)

    expect(data.results.length).toBeGreaterThan(0)
    expect(data.meta.count).toBe(data.results.length)

    for (const job of data.results) {
      expect(job.id).toMatch(/^\d+$/)
      expect(job.title.length).toBeGreaterThan(0)
      // A title must be text, not leftover markup.
      expect(job.title).not.toContain("<")
      expect(job.url).toContain("occ.com.mx")
    }
  })

  /**
   * Regression guard for the reason this skill uses the /empleos/de-<slug>/ route
   * rather than /empleos/?q=<query>: that query parameter silently ignores the
   * search term and returns the same recommended offers for every input. If a
   * future change reintroduces it, unrelated results would look superficially
   * valid, so assert that results actually track the query.
   */
  test("results are relevant to the query, not a generic recommendation feed", async () => {
    const [dev, nurse] = await Promise.all([
      runCLI(["search", "-q", "desarrollador", "--limit", "20"]),
      runCLI(["search", "-q", "enfermera", "--limit", "20"]),
    ])
    const devIds = parseJSON<SearchResponse>(dev).results.map((j) => j.id)
    const nurseIds = parseJSON<SearchResponse>(nurse).results.map((j) => j.id)

    expect(devIds.length).toBeGreaterThan(0)
    expect(nurseIds.length).toBeGreaterThan(0)

    // Two unrelated searches must not return a near-identical result set.
    const overlap = devIds.filter((id) => nurseIds.includes(id)).length
    expect(overlap).toBeLessThan(Math.min(devIds.length, nurseIds.length) / 2)
  })

  test("--limit caps the result count", async () => {
    const r = await runCLI(["search", "-q", "desarrollador", "--limit", "3"])
    const data = parseJSON<SearchResponse>(r)
    expect(data.results.length).toBeLessThanOrEqual(3)
  })

  test("table format renders a header row", async () => {
    const r = await runCLI(["search", "-q", "desarrollador", "--limit", "3", "--format", "table"])
    expect(r.exitCode).toBe(0)
    expect(r.stdout).toContain("TITLE")
    expect(r.stdout).toContain("COMPANY")
  })
})

/**
 * Detail pages are rate limited: roughly three succeed, then OCC returns 403
 * for a cooldown window (see the note at the top of src/helpers.ts). These
 * tests therefore accept a rate-limited outcome as a pass, provided the CLI
 * reports it cleanly. The parsing itself is covered offline and
 * deterministically in parsing.test.ts, which is where a parser regression
 * would be caught.
 */
describe("occ-search CLI — live detail", () => {
  test("returns a parsed description, or reports rate limiting cleanly", async () => {
    const searchResult = await runCLI(["search", "-q", "desarrollador", "--limit", "1"])
    const data = parseJSON<SearchResponse>(searchResult)
    expect(data.results.length).toBeGreaterThan(0)

    const id = data.results[0].id
    const r = await runCLI(["detail", id])

    if (r.exitCode !== 0) {
      const err = JSON.parse(r.stderr) as { error: string; code: string }
      expect(err.code).toBe("DETAIL_FAILED")
      expect(err.error).toContain("Rate limited")
      return
    }

    const job = JSON.parse(r.stdout) as { id: string; title: string; description: string | null }
    expect(job.id).toBe(id)
    expect(job.title.length).toBeGreaterThan(0)
    expect(job.description).not.toContain("<p>")
    expect(job.description).not.toContain("&oacute;")
  })

  test("an unknown id exits 1 with a JSON error rather than crashing", async () => {
    const r = await runCLI(["detail", "99999999"])
    expect(r.exitCode).toBe(1)
    expect(r.stdout).toBe("")
    expect(() => JSON.parse(r.stderr)).not.toThrow()
  })
})

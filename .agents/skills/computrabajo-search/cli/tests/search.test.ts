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

describe("computrabajo-search CLI — argument handling", () => {
  test("search without --query exits 1 with NO_QUERY", async () => {
    const r = await runCLI(["search"])
    expect(r.exitCode).toBe(1)
    expect(r.stdout).toBe("")
    expect(JSON.parse(r.stderr).code).toBe("NO_QUERY")
  })

  test("a non-numeric --page exits 1 with BAD_ARG", async () => {
    const r = await runCLI(["search", "-q", "desarrollador", "--page", "x"])
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

  test("an unparseable detail id exits 1 with BAD_ID", async () => {
    const r = await runCLI(["detail", "not-an-id"])
    expect(r.exitCode).toBe(1)
    expect(JSON.parse(r.stderr).code).toBe("BAD_ID")
  })

  test("a query that slugifies to nothing exits 1 with BAD_QUERY", async () => {
    const r = await runCLI(["search", "-q", "###"])
    expect(r.exitCode).toBe(1)
    expect(JSON.parse(r.stderr).code).toBe("BAD_QUERY")
  })
})

describe("computrabajo-search CLI — live search", () => {
  test("returns populated results for a real query", async () => {
    const r = await runCLI(["search", "-q", "desarrollador php", "--limit", "5"])
    const data = parseJSON<SearchResponse>(r)

    expect(data.results.length).toBeGreaterThan(0)
    expect(data.meta.count).toBe(data.results.length)

    for (const job of data.results) {
      // Offer ids are 32-char hex.
      expect(job.id).toMatch(/^[0-9A-F]{16,}$/)
      expect(job.title.length).toBeGreaterThan(0)
      expect(job.title).not.toContain("<")
      expect(job.url).toContain("computrabajo.com")
      // The employer rating must never leak into the company name.
      expect(job.company ?? "").not.toMatch(/^\d+[.,]\d+\s/)
    }
  })

  /**
   * Relevance guard. The sibling occ-search skill exists because OCC's obvious
   * query parameter silently ignores the search term; the same class of bug
   * would be invisible here without an explicit check, so assert that two
   * unrelated queries return substantially different result sets.
   */
  test("results track the query rather than returning a fixed feed", async () => {
    const [dev, nurse] = await Promise.all([
      runCLI(["search", "-q", "desarrollador", "--limit", "20"]),
      runCLI(["search", "-q", "enfermera", "--limit", "20"]),
    ])
    const devIds = parseJSON<SearchResponse>(dev).results.map((j) => j.id)
    const nurseIds = parseJSON<SearchResponse>(nurse).results.map((j) => j.id)

    expect(devIds.length).toBeGreaterThan(0)
    expect(nurseIds.length).toBeGreaterThan(0)

    const overlap = devIds.filter((id) => nurseIds.includes(id)).length
    expect(overlap).toBeLessThan(Math.min(devIds.length, nurseIds.length) / 2)
  })

  test("--location narrows results to that city", async () => {
    const r = await runCLI(["search", "-q", "desarrollador", "-l", "Torreon", "--limit", "5"])
    const data = parseJSON<SearchResponse>(r)
    expect(data.results.length).toBeGreaterThan(0)

    // Computrabajo pads the tail of a location search with nearby/other
    // offers, so require a majority rather than every row.
    const inCity = data.results.filter((j) => /torre/i.test(j.location ?? "")).length
    expect(inCity).toBeGreaterThan(data.results.length / 2)
  })

  test("--limit caps the result count", async () => {
    const r = await runCLI(["search", "-q", "desarrollador", "--limit", "3"])
    expect(parseJSON<SearchResponse>(r).results.length).toBeLessThanOrEqual(3)
  })

  test("table format prints untruncated ids usable with detail", async () => {
    const r = await runCLI(["search", "-q", "desarrollador", "--limit", "3", "--format", "table"])
    expect(r.exitCode).toBe(0)
    expect(r.stdout).toContain("TITLE")
    // A 32-char hex id must appear in full, otherwise it cannot be passed on.
    expect(r.stdout).toMatch(/[0-9A-F]{32}/)
  })
})

describe("computrabajo-search CLI — live detail", () => {
  test("fetches a full description for an id taken from search", async () => {
    const searchResult = await runCLI(["search", "-q", "desarrollador", "--limit", "1"])
    const data = parseJSON<SearchResponse>(searchResult)
    expect(data.results.length).toBeGreaterThan(0)

    const id = data.results[0].id
    const r = await runCLI(["detail", id])
    const job = parseJSON<{
      id: string
      title: string
      description: string | null
      requirements: string[]
    }>(r)

    expect(job.id).toBe(id)
    expect(job.title.length).toBeGreaterThan(0)
    expect(job.title).not.toBe("(sin titulo)")
    expect(job.description).toBeTruthy()
    expect(job.description).not.toContain("<p>")
    expect(job.description).not.toContain("&#x")
  })

  test("an unknown id exits 1 with a JSON error rather than crashing", async () => {
    const r = await runCLI(["detail", "00000000000000000000000000000000"])
    expect(r.exitCode).toBe(1)
    expect(r.stdout).toBe("")
    expect(() => JSON.parse(r.stderr)).not.toThrow()
  })
})

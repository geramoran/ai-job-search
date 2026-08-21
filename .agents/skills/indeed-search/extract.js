/**
 * Indeed Mexico result extractor.
 *
 * Paste the body of this file into mcp__claude-in-chrome__javascript_tool
 * against a loaded mx.indeed.com/jobs page. Returns the portal-skill result
 * shape: { meta: { count, page }, results: [...] }.
 *
 * There is no CLI for Indeed: server-side requests are blocked by Cloudflare
 * (HTTP 503, "error code: 1201"). See SKILL.md.
 *
 * IMPORTANT: check `document.readyState === "complete"` before extracting.
 * Indeed hydrates its result list client-side, and running too early returns
 * cards whose title fields are still empty.
 */
function extractIndeedResults(page = 1) {
  const txt = (el) => el?.textContent?.trim().replace(/\s+/g, " ") || null;

  // `.job_seen_beacon` is the common wrapper; the `li:has(a[data-jk])` fallback
  // catches A/B variants that drop the beacon class.
  const cards = [...document.querySelectorAll(".job_seen_beacon, li:has(a[data-jk])")];

  const results = [];
  const seen = new Set();

  for (const card of cards) {
    const anchor = card.querySelector("a[data-jk]") || card.querySelector("[data-jk]");
    const id = anchor?.getAttribute("data-jk");
    if (!id || seen.has(id)) continue;

    // Indeed rotates its markup between experiments. Observed 2026-08-10:
    // one variant renders <h2 class="jobTitle"><span title="...">, another
    // drops the <h2> entirely and keeps only the titled span. Try each slot.
    const title =
      card.querySelector("span[title]")?.getAttribute("title") ||
      txt(card.querySelector("h2.jobTitle span[title]")) ||
      txt(card.querySelector("h2.jobTitle")) ||
      txt(anchor);
    if (!title) continue;

    seen.add(id);
    results.push({
      id,
      title,
      company: txt(card.querySelector('[data-testid="company-name"]')),
      location: txt(card.querySelector('[data-testid="text-location"]')),
      // Indeed does not render a per-card posting date in the Mexican results
      // list. Use the `fromage` URL parameter to bound recency instead.
      date: null,
      salary:
        txt(card.querySelector('[data-testid="attribute_snippet_testid"]')) ||
        txt(card.querySelector(".salary-snippet-container")),
      url: "https://mx.indeed.com/viewjob?jk=" + id,
    });
  }

  return { meta: { count: results.length, page }, results };
}

JSON.stringify(extractIndeedResults(), null, 1);

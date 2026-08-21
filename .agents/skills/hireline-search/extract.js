/**
 * Hireline (hireline.io) result extractor.
 *
 * Paste the body of this function into mcp__claude-in-chrome__javascript_tool
 * against a loaded hireline.io listing page. Returns the portal-skill shape:
 * { meta: { count, scanned, page }, results: [...] }.
 *
 * No CLI: offers are rendered client-side. No server-side keyword search
 * either — `?q=` is ignored (verified 2026-08-10), so filtering happens here.
 *
 * Roughly 12 offers render per page; walk pages with ?page=N.
 *
 * IMPORTANT: check `document.readyState === "complete"` before extracting.
 */
function extractHireline(keyword) {
  const clean = (el) => el?.textContent?.trim().replace(/\s+/g, " ") || null;
  const cards = [...document.querySelectorAll(".hl-vacancy-card, .vacancy-container")];
  const out = [];
  const seen = new Set();

  for (const card of cards) {
    const anchor =
      card.querySelector('a[href*="/empleos/"]') || card.closest('a[href*="/empleos/"]');
    const href = anchor?.getAttribute("href") || "";
    const m = href.match(/\/empleos\/([^/]+)\/(\d+)/);
    if (!m) continue;
    const [, slug, id] = m;
    if (seen.has(id)) continue;

    const raw = clean(card.querySelector(".vacancy-title"));
    if (!raw) continue;

    // Titles render as "<role> en <Company>". Split on the LAST " en " so a
    // role that itself contains " en " (e.g. "Ingeniero en Sistemas en Acme")
    // keeps its wording.
    const i = raw.lastIndexOf(" en ");
    const title = i > 0 ? raw.slice(0, i).trim() : raw;
    const company = i > 0 ? raw.slice(i + 4).trim() : null;

    // .vacancy-subtitle holds the SALARY, not the company — easy to misread.
    const subtitle = clean(card.querySelector(".vacancy-subtitle"));
    const salary = subtitle && /oculto/i.test(subtitle) ? null : subtitle;

    seen.add(id);
    out.push({
      id,
      title,
      company,
      location: clean(card.querySelector(".vacancy-location")),
      date: null,
      salary,
      slug,
      url: href.startsWith("http") ? href : "https://hireline.io" + href,
    });
  }

  const k = (keyword || "").toLowerCase();
  const results = k
    ? out.filter((j) => (j.title + " " + (j.company || "")).toLowerCase().includes(k))
    : out;

  const page = Number(new URL(location.href).searchParams.get("page") || 1);
  return { meta: { count: results.length, scanned: out.length, page }, results };
}

JSON.stringify(extractHireline(/* "php" */), null, 1);

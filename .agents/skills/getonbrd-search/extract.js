/**
 * Get on Board (getonbrd.com) result extractor.
 *
 * Paste the body of this function into mcp__claude-in-chrome__javascript_tool
 * against a loaded getonbrd.com category page. Returns the portal-skill result
 * shape: { meta: { count, scanned }, results: [...] }.
 *
 * There is no CLI for this portal: the server-rendered HTML contains only
 * navigation links, and the `?search=` query parameter does not filter — see
 * url-reference.md. Offers are rendered client-side, so a real browser is
 * required.
 *
 * Pass a keyword to filter client-side across title and company. Get on Board
 * has no working server-side keyword search, so filtering happens here.
 *
 * IMPORTANT: check `document.readyState === "complete"` before extracting.
 */
function extractGetOnBrd(keyword) {
  const clean = (s) => s?.trim().replace(/\s+/g, " ") || null;
  const items = [...document.querySelectorAll("a.results-item")];
  const out = [];
  const seen = new Set();

  for (const a of items) {
    const href = a.getAttribute("href") || "";
    // Offer links look like /jobs/<category>/<slug>; anything else is nav.
    const m = href.match(/\/jobs\/([^/]+)\/([^/?#]+)$/);
    if (!m) continue;
    const [, category, id] = m;
    if (seen.has(id)) continue;

    const heading = a.querySelector("h4.results-list-title, h3, h2");
    if (!heading) continue;

    // The heading embeds the employment type inside an .opacity-half span
    // ("Lead Full-Stack Engineer Full time"). Clone, lift the span out, and the
    // remaining text is the role title on its own.
    const clone = heading.cloneNode(true);
    const empEl = clone.querySelector(".opacity-half");
    const employment = empEl ? clean(empEl.textContent) : null;
    empEl?.remove();
    const title = clean(clone.textContent);
    if (!title) continue;

    const secondary = a.querySelector(".results-secondary.hide-on-mobile");
    const secLines = secondary
      ? secondary.innerText.split("\n").map((s) => s.trim()).filter(Boolean)
      : [];

    const main = a.querySelector(".flex.flex-grow2");
    const mainLines = main
      ? main.innerText.split("\n").map((s) => s.trim()).filter(Boolean)
      : [];

    const company =
      mainLines.find(
        (l) => l !== heading.innerText.trim() && l !== "·" && !/^remoto|^remote/i.test(l),
      ) || null;
    const remote = /remoto|remote/i.test(mainLines.join(" "));

    seen.add(id);
    out.push({
      id,
      title,
      company,
      location: remote ? "Remoto" : null,
      // Short English date label, e.g. "Aug 09".
      date: secLines.find((l) => /^[A-Z][a-z]{2} \d{1,2}$/.test(l)) || null,
      salary: secLines.find((l) => /USD|CLP|MXN|\$/.test(l)) || null,
      employment,
      category,
      url: href.startsWith("http") ? href : "https://www.getonbrd.com" + href,
    });
  }

  const k = (keyword || "").toLowerCase();
  const results = k
    ? out.filter((j) => (j.title + " " + (j.company || "")).toLowerCase().includes(k))
    : out;

  return { meta: { count: results.length, scanned: out.length }, results };
}

JSON.stringify(extractGetOnBrd(/* "php" */), null, 1);

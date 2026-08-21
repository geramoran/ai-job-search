# computrabajo-cli

Zero-dependency CLI for searching jobs on [Computrabajo Mexico](https://mx.computrabajo.com).
Runs on `bun` with no runtime dependencies — `bun install` only pulls dev types.

Personal use only. Keep request volume low.

## Install

```bash
cd .agents/skills/computrabajo-search/cli && bun install
```

## Usage

```bash
# Search
bun run src/cli.ts search -q "desarrollador php" --format table
bun run src/cli.ts search -q "desarrollador" -l "Torreon" --limit 10

# Detail
bun run src/cli.ts detail 2CD4A159C933355E61373E686DCF3405 --format plain
```

Run without arguments for full help.

## Development

```bash
bun run typecheck   # tsc --noEmit
bun run test        # bun test
```

### Test layout

| File | Network | Covers |
|------|---------|--------|
| `tests/parsing.test.ts` | none | slugify, entity decoding, detail-URL building, card parsing, detail parsing — all against fixtures |
| `tests/search.test.ts` | live | argument validation, live search, query relevance, location filtering, live detail |

Two guards worth keeping:

- **Relevance guard** (`search.test.ts`) runs two unrelated queries and asserts
  the result sets differ. The sibling `occ-search` skill exists because OCC's
  obvious query parameter silently ignores the search term and returns a fixed
  recommendation feed; that bug class is invisible without an explicit check.
- **Company-rating guard** (`parsing.test.ts` and `search.test.ts`) asserts the
  company name never starts with a `4.0`-style rating, which is what happens if
  the name is read from the wrapping paragraph instead of its anchor.

## Portal quirks

- `data-id` uses **single** quotes — a double-quote regex silently under-matches
- Offer IDs are 32-char hex, never truncate them in output
- The detail URL slug is arbitrary; only the trailing ID matters
- No JSON-LD on detail pages; parsing is HTML-anchored
- `robots.txt` disallows the posting-age, distance, salary and contract filters

See `../url-reference.md` for the full anchor table.

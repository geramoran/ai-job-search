# occ-cli

Zero-dependency CLI for searching jobs on [OCC Mundial](https://www.occ.com.mx),
Mexico's largest general job board. Runs on `bun` with no runtime dependencies —
`bun install` only pulls dev type definitions.

Personal use only. Keep request volume low.

## Install

```bash
cd .agents/skills/occ-search/cli && bun install
```

## Usage

```bash
# Search
bun run src/cli.ts search -q "desarrollador php" --format table
bun run src/cli.ts search -q "ingeniero de software" --page 2 --limit 10

# Detail
bun run src/cli.ts detail 21273972 --format plain
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
| `tests/parsing.test.ts` | none | `slugify`, entity decoding, HTML→text, card parsing, JSON-LD detail parsing — all against fixtures |
| `tests/search.test.ts` | live | argument validation, live search, result relevance, live detail |

Parser behaviour is covered **offline and deterministically** in
`parsing.test.ts`. That is deliberate: OCC rate limits detail pages, so the live
detail test accepts a cleanly-reported rate-limit as a pass and cannot be relied
on to catch parser regressions.

`search.test.ts` also carries a relevance guard: it runs two unrelated queries
and asserts the result sets differ. This exists because OCC's `?q=` parameter
silently returns the same recommendation feed regardless of the search term — a
CLI built on it would emit plausible-looking but wrong results. See
`../url-reference.md`.

## Portal quirks

- No working location or posting-age parameter
- Detail pages rate limit after ~3 requests
- Search results come from HTML cards; detail comes from schema.org JSON-LD
- Accented Spanish arrives as hex numeric character references and must be decoded

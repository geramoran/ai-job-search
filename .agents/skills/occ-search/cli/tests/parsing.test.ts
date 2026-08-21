import { describe, expect, test } from "bun:test"
import {
  slugify,
  decodeHtmlEntities,
  htmlToText,
  parseJobCards,
  parseJobDetail,
} from "../src/helpers.js"

describe("slugify", () => {
  test("lowercases and hyphenates multi-word queries", () => {
    expect(slugify("Desarrollador PHP")).toBe("desarrollador-php")
    expect(slugify("ingeniero de software")).toBe("ingeniero-de-software")
  })

  test("folds Spanish accents to ASCII", () => {
    expect(slugify("programación")).toBe("programacion")
    expect(slugify("diseño gráfico")).toBe("diseno-grafico")
  })

  test("drops punctuation and collapses separators", () => {
    expect(slugify("  Full-Stack   (React/Node)  ")).toBe("full-stack-reactnode")
  })

  test("returns an empty string when nothing usable remains", () => {
    expect(slugify("!!!")).toBe("")
  })
})

describe("decodeHtmlEntities", () => {
  test("decodes hex numeric references used for Spanish accents", () => {
    expect(decodeHtmlEntities("Quer&#xE9;taro")).toBe("Querétaro")
    expect(decodeHtmlEntities("Cuauht&#xE9;moc")).toBe("Cuauhtémoc")
  })

  test("decodes named entities", () => {
    expect(decodeHtmlEntities("Diseño &amp; Manufactura")).toBe("Diseño & Manufactura")
    expect(decodeHtmlEntities("comercializaci&oacute;n")).toBe("comercialización")
  })
})

describe("htmlToText", () => {
  test("keeps list items and paragraph breaks readable", () => {
    const html = "<p>Requisitos:</p><ul><li>Uno</li><li>Dos</li></ul>"
    const text = htmlToText(html)
    expect(text).toContain("Requisitos:")
    expect(text).toContain("- Uno")
    expect(text).toContain("- Dos")
    expect(text).not.toContain("<")
  })
})

describe("parseJobCards", () => {
  // Minimal fixture mirroring OCC's real card markup.
  const fixture = `
    <div class="card-job-offer" data-id='12345678' id="jobcard-12345678">
      <span class="mr-2 text-sm font-light">Hoy</span>
      <h2 class="text-grey-900 text-lg break-words">Desarrollador Sr TI</h2>
      <span class="mr-2 text-grey-900 font-base font-light mb-2 sm:mb-4">$ 40,000 - $ 50,000 Mensual</span>
      <span class="line-clamp-title">
        <a href="https://www.occ.com.mx/empleos/bolsa-de-trabajo-ACME/">ACME SA de CV</a>
      </span>
      <div class="no-alter-loc-text mt-1">
        <span class="text-grey-900 m-0 text-sm font-light"></span><p class="text-grey-900 m-0 text-sm font-light">Torre&#xF3;n, Coahuila</p>
      </div>
      <a href="/empleo/oferta/12345678-desarrollador-sr-ti">ver</a>
    </div>
    <div class="card-job-offer" data-id='87654321' id="jobcard-87654321">
      <span class="mr-2 text-sm font-light">Ayer</span>
      <h2 class="text-grey-900 text-lg break-words">Ingeniero de Software</h2>
      <span class="line-clamp-title">
        <a href="https://www.occ.com.mx/empleos/bolsa-de-trabajo-GLOBEX/">GLOBEX</a>
      </span>
      <div class="no-alter-loc-text mt-1">
        <span></span><p class="text-grey-900">Monterrey, Nuevo Le&#xF3;n</p>
      </div>
      <a href="/empleo/oferta/87654321-ingeniero-de-software">ver</a>
    </div>`

  test("extracts every card with its fields", () => {
    const cards = parseJobCards(fixture)
    expect(cards).toHaveLength(2)

    expect(cards[0].id).toBe("12345678")
    expect(cards[0].title).toBe("Desarrollador Sr TI")
    expect(cards[0].company).toBe("ACME SA de CV")
    expect(cards[0].location).toBe("Torreón, Coahuila")
    expect(cards[0].date).toBe("Hoy")
    expect(cards[0].salary).toContain("40,000")
    expect(cards[0].url).toContain("/empleo/oferta/12345678-desarrollador-sr-ti")

    expect(cards[1].id).toBe("87654321")
    expect(cards[1].salary).toBeNull()
  })

  test("skips a malformed card without losing the rest", () => {
    const broken = `<div data-id='999'>no title here</div>` + fixture
    const cards = parseJobCards(broken)
    expect(cards).toHaveLength(2)
    expect(cards.map((c) => c.id)).not.toContain("999")
  })

  test("deduplicates repeated ids", () => {
    const cards = parseJobCards(fixture + fixture)
    expect(cards).toHaveLength(2)
  })
})

describe("parseJobDetail", () => {
  // Mirrors OCC's real detail markup: schema.org JobPosting in PascalCase,
  // followed by a stray ";" that makes a naive JSON.parse of the script fail.
  const fixture = `
    <html><head><title>Trabajo de Almacenista - 21279118 | OCC</title></head>
    <body>
    <script type="application/ld+json">{
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "Url": "http://www.occ.com.mx/empleo/oferta/21279118-almacenista",
      "Title": "Almacenista",
      "Description": "<p>Solicitamos <strong>ALMACENISTA</strong></p><ul><li>Experiencia en almac&eacute;n</li><li>Inventarios f&iacute;sicos</li></ul>",
      "identifier": { "@type": "PropertyValue", "Name": "PSYTECH", "Value": 21279118 },
      "DatePosted": "2026-08-10",
      "ValidThrough": "2026-10-02",
      "EmploymentType": "Tiempo completo",
      "HiringOrganization": { "@type": "Organization", "Name": "PSYTECH SOLUCIONES" },
      "JobLocation": { "@type": "Place", "Address": { "@type": "PostalAddress",
        "AddressLocality": "Zapopan", "AddressRegion": "Jalisco", "AddressCountry": "MX" } },
      "BaseSalary": { "@type": "MonetaryAmount", "Currency": "MXN",
        "Value": { "@type": "QuantitativeValue", "MinValue": 15000, "MaxValue": 20000, "UnitText": "MONTH" } }
    };</script>
    </body></html>`

  test("reads every field from the JSON-LD block", () => {
    const job = parseJobDetail(fixture, "21279118")
    expect(job.id).toBe("21279118")
    expect(job.title).toBe("Almacenista")
    expect(job.company).toBe("PSYTECH SOLUCIONES")
    expect(job.location).toBe("Zapopan, Jalisco")
    expect(job.date).toBe("2026-08-10")
    expect(job.validThrough).toBe("2026-10-02")
    expect(job.employmentType).toBe("Tiempo completo")
    expect(job.salaryMin).toBe(15000)
    expect(job.salaryMax).toBe(20000)
    expect(job.salaryCurrency).toBe("MXN")
    expect(job.salaryPeriod).toBe("MONTH")
    // http: in the source is normalized to https:
    expect(job.url).toStartWith("https://")
  })

  test("renders the description as clean text", () => {
    const job = parseJobDetail(fixture, "21279118")
    expect(job.description).toContain("ALMACENISTA")
    expect(job.description).toContain("- Experiencia en almacén")
    expect(job.description).toContain("físicos")
    expect(job.description).not.toContain("<")
    expect(job.description).not.toContain("&eacute;")
  })

  test("reports a zero salary range as no salary", () => {
    const zeroed = fixture.replace('"MinValue": 15000, "MaxValue": 20000', '"MinValue": 0, "MaxValue": 0')
    expect(parseJobDetail(zeroed, "21279118").salary).toBeNull()
  })

  test("falls back to the <title> tag when JSON-LD is missing", () => {
    const noLd = `<html><head><title>Trabajo de Soldador - 999 | OCC</title></head><body></body></html>`
    const job = parseJobDetail(noLd, "999")
    expect(job.title).toBe("Soldador")
    expect(job.description).toBeNull()
  })
})

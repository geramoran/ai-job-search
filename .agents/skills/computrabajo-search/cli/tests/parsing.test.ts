import { describe, expect, test } from "bun:test"
import {
  slugify,
  decodeHtmlEntities,
  htmlToText,
  detailUrl,
  parseJobCards,
  parseJobDetail,
} from "../src/helpers.js"

describe("slugify", () => {
  test("lowercases and hyphenates", () => {
    expect(slugify("Desarrollador PHP")).toBe("desarrollador-php")
    expect(slugify("ingeniero de software")).toBe("ingeniero-de-software")
  })

  test("folds Spanish accents", () => {
    expect(slugify("Torreón")).toBe("torreon")
    expect(slugify("Ciudad de México")).toBe("ciudad-de-mexico")
  })

  test("returns empty when nothing usable remains", () => {
    expect(slugify("###")).toBe("")
  })
})

describe("detailUrl", () => {
  test("builds a resolvable URL from a bare id", () => {
    const url = detailUrl("2CD4A159C933355E61373E686DCF3405")
    expect(url).toContain("mx.computrabajo.com")
    expect(url).toEndWith("2CD4A159C933355E61373E686DCF3405")
  })
})

describe("decodeHtmlEntities", () => {
  test("decodes hex references used for Spanish", () => {
    expect(decodeHtmlEntities("Torre&#xF3;n")).toBe("Torreón")
    expect(decodeHtmlEntities("M&#xE9;xico")).toBe("México")
  })
})

describe("parseJobCards", () => {
  // Mirrors Computrabajo's real markup, including the single-quoted data-id
  // and the employer rating that precedes the company anchor.
  const fixture = `
    <article class="box_offer sel outstanding" data-id='2CD4A159C933355E61373E686DCF3405' id="2CD4A159C933355E61373E686DCF3405">
      <h2 class="fs18 fwB prB">
        <a class="js-o-link fc_base" href="/ofertas-de-trabajo/oferta-de-trabajo-de-soporte-erp-2CD4A159C933355E61373E686DCF3405#lc=ListOffers">
          Soporte en sistema ERP
        </a>
      </h2>
      <p class="dFlex vm_fx fs16 fc_base mt5">
        <span class="rating">4.0</span>
        <a class="fc_base t_ellipsis" href="https://mx.computrabajo.com/empresas/x" offer-grid-article-company-url>
          Grupo Nach
        </a>
      </p>
      <p class="fs16 fc_base mt5"><span class="mr10">Miguel Hidalgo, Ciudad de M&#xE9;xico DF</span></p>
      <div class="fs13 mt15"><span class="dIB mr10"><span class="icon i_salary"></span> $ 15,000.00 (Mensual) </span></div>
      <p class="fs13 fc_aux mt15"> Hace  3  horas </p>
    </article>
    <article class="box_offer" data-id='B04072F6C1AA00BB61373E686DCF3405' id="B04072F6C1AA00BB61373E686DCF3405">
      <h2 class="fs18 fwB prB">
        <a class="js-o-link fc_base" href="/ofertas-de-trabajo/oferta-de-trabajo-de-dev-B04072F6C1AA00BB61373E686DCF3405">
          Desarrollador Full Stack
        </a>
      </h2>
      <p class="dFlex vm_fx fs16 fc_base mt5">
Importante empresa del sector    </p>
      <p class="fs16 fc_base mt5"><span class="mr10">Torre&#xF3;n, Coahuila</span></p>
      <p class="fs13 fc_aux mt15">Ayer</p>
    </article>`

  test("extracts each offer with its fields", () => {
    const cards = parseJobCards(fixture)
    expect(cards).toHaveLength(2)

    expect(cards[0].id).toBe("2CD4A159C933355E61373E686DCF3405")
    expect(cards[0].title).toBe("Soporte en sistema ERP")
    expect(cards[0].location).toBe("Miguel Hidalgo, Ciudad de México DF")
    expect(cards[0].salary).toContain("15,000")
    expect(cards[0].date).toBe("Hace 3 horas")
    expect(cards[0].url).toStartWith("https://mx.computrabajo.com/ofertas-de-trabajo/")
  })

  test("strips the employer rating from the company name", () => {
    const cards = parseJobCards(fixture)
    // Would be "4.0 Grupo Nach" if the rating leaked into the name.
    expect(cards[0].company).toBe("Grupo Nach")
  })

  test("handles confidential offers that have no company anchor", () => {
    const cards = parseJobCards(fixture)
    expect(cards[1].company).toBe("Importante empresa del sector")
    expect(cards[1].salary).toBeNull()
  })

  test("skips malformed offers without losing the rest", () => {
    const broken = `<article class="box_offer" data-id='ZZZZ'>junk</article>` + fixture
    expect(parseJobCards(broken)).toHaveLength(2)
  })

  test("deduplicates repeated ids", () => {
    expect(parseJobCards(fixture + fixture)).toHaveLength(2)
  })
})

describe("parseJobDetail", () => {
  const fixture = `
    <h1 class="fwB fs24 mb5 box_detail w100_m">Desarrollador Web - .NET con C#</h1>
    <p class="fs16">ROWAN NETWORKS - Torre&#xF3;n, Coahuila</p>
    <div class="mb40 pb40 bb1" div-link="oferta">
      <h3 class="fwB fs18 mb20">Descripci&#xF3;n de la oferta</h3>
      <div class="mbB">
        <span class="tag base mb10">$ 18,000.00 (Mensual)</span>
        <span class="tag base mb10">Contrato por tiempo indeterminado</span>
        <span class="tag base mb10">Tiempo Completo</span>
      </div>
      <p class="mbB">Buscamos un Desarrollador Web.<br>Manejo de JavaScript<br>Dominio de SQL</p>
      <p class="fwB fs18 mtB mb10">Requerimientos</p>
      <ul class="disc mbB">
        <li class='mb10'>Educaci&#xF3;n m&#xED;nima: Licenciatura</li><li class='mb10'>2 a&#xF1;os de experiencia</li>
      </ul>
    </div>`

  test("reads title, company and location", () => {
    const job = parseJobDetail(fixture, "c0093d19ff18411561373e686dcf3405")
    expect(job.title).toBe("Desarrollador Web - .NET con C#")
    expect(job.company).toBe("ROWAN NETWORKS")
    expect(job.location).toBe("Torreón, Coahuila")
    // IDs are normalized to uppercase.
    expect(job.id).toBe("C0093D19FF18411561373E686DCF3405")
  })

  test("classifies the tag chips", () => {
    const job = parseJobDetail(fixture, "abc123def456abc123def456abc12345")
    expect(job.salary).toContain("18,000")
    expect(job.contractType).toContain("indeterminado")
    expect(job.workday).toBe("Tiempo Completo")
  })

  test("renders the description as clean text with line breaks", () => {
    const job = parseJobDetail(fixture, "abc123def456abc123def456abc12345")
    expect(job.description).toContain("Desarrollador Web")
    expect(job.description).toContain("Manejo de JavaScript")
    expect(job.description).not.toContain("<br>")
  })

  test("collects the requirements list", () => {
    const job = parseJobDetail(fixture, "abc123def456abc123def456abc12345")
    expect(job.requirements).toHaveLength(2)
    expect(job.requirements[0]).toContain("Licenciatura")
    expect(job.requirements[1]).toContain("años de experiencia")
  })

  test("degrades gracefully on an unrelated page", () => {
    const job = parseJobDetail("<html><body>nada</body></html>", "abc123def456abc123def456abc12345")
    expect(job.title).toBe("(sin titulo)")
    expect(job.description).toBeNull()
    expect(job.requirements).toEqual([])
  })
})

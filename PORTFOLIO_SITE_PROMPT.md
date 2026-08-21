# Prompt para generar el sitio web personal de Jose Gerardo Martínez Morán

> **Cómo usar este archivo:** copia todo lo que está debajo de la línea y pégalo como primer mensaje en un
> proyecto nuevo de Claude Code. Es autocontenido: el agente del otro lado no tiene acceso a este repo ni a
> ninguna conversación previa, así que toda la información necesaria viaja dentro del prompt.

---

Quiero que construyas mi sitio web personal y portafolio. Soy Jose Gerardo Martínez Morán, ingeniero en
informática con nueve años de experiencia. El objetivo del sitio es demostrar trabajo real a reclutadores y
CTOs, no ser un CV bonito: busco empleo activamente en roles de AI/agentic engineering y senior full-stack.

## Fase 0 — OBLIGATORIA antes de escribir una sola línea de código

**Conéctate al MCP de Pencil y genera varias propuestas de tema visual para el sitio.** No empieces a
programar hasta que yo elija una.

1. Llama a `get_app_state` con `include_schema: true`, `include_canvas_design: true` e
   `include_scripts_and_shaders: false` para conocer el esquema del archivo `.pen` antes de usar cualquier
   otra herramienta de Pencil.
2. Llama a `get_guidelines`.
3. Genera **3 o 4 direcciones visuales distintas entre sí**, no variaciones del mismo tema. Sugerencias de
   ejes para diferenciarlas, ajústalas con tu criterio:
   - una técnica y sobria, tipo documentación o terminal, que priorice densidad de información
   - una editorial con tipografía fuerte y mucho aire, que priorice la narrativa de cada proyecto
   - una oscura con acentos de color y microinteracciones, orientada a producto/startup
   - una minimalista casi sin cromo, donde el contenido sea todo
4. Para cada dirección, muéstrame captura con `get_screenshot`, y explica en dos líneas a qué tipo de lector
   le habla y qué sacrifica.
5. **Pregúntame cuál elijo.** Solo entonces pasas a la Fase 1.

Diseña las propuestas sobre contenido real de los que están más abajo, no sobre *lorem ipsum*. Necesito ver
cómo se lee mi información, no cómo se ve una plantilla.

## Fase 1 — El sitio (lo que construimos ahora)

### Restricciones técnicas duras

- **Sitio 100% estático.** Sin backend, sin base de datos, sin funciones serverless.
- **Se publica en GitHub Pages desde mi propio repositorio.** Toma esa decisión en cuenta para rutas base,
  `.nojekyll` si hace falta, y el workflow de despliegue.
- Stack a tu criterio entre HTML/CSS/JS puro o un generador estático simple (Astro, Eleventy). Justifica la
  elección en una línea. Prefiero poca maquinaria: este sitio lo voy a mantener yo por años.
- **Responsive de verdad** y accesible: contraste suficiente, navegación por teclado, `alt` en imágenes,
  HTML semántico.
- Modo claro y oscuro, respetando `prefers-color-scheme`.
- Rápido: sin fuentes pesadas innecesarias, sin librerías que no se usen, imágenes optimizadas.
- SEO básico: `<title>` y meta description por página, Open Graph para que el link se vea bien al
  compartirlo en LinkedIn, `sitemap.xml`, datos estructurados JSON-LD tipo `Person`.

### Estructura de contenido propuesta

Hero, sobre mí, experiencia, proyectos, habilidades, formación y contacto. Ajusta el orden según el tema que
elija, pero **los proyectos deben quedar arriba**: son el motivo del sitio.

### Arquitectura de datos (importante para la Fase 2)

Guarda proyectos y experiencia en **archivos de datos separados del markup** (JSON, YAML o similar). Cada
proyecto debe tener un campo `liveUrl` que hoy va en `null` y un `repoUrl` opcional. La plantilla debe
renderizar condicionalmente: si hay `liveUrl`, muestra botón "Ver en vivo"; si no, muestra solo el caso de
estudio. Así, en la Fase 2, publicar una demo será cambiar un `null` por una URL, no tocar el HTML.

---

## MIS DATOS

### Identidad y contacto

- **Nombre:** Jose Gerardo Martínez Morán
- **Ubicación:** Torreón, Coahuila, México (GMT-6, sin horario de verano)
- **Email:** geramtz100@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/geramoran/
- **GitHub:** https://github.com/geramoran
- **Cédula profesional:** 12320388 (SEP), expedida el 31 de mayo de 2021
- **Teléfono:** (+52) 871-310-7796 — **pregúntame antes de publicarlo.** Un teléfono en una página pública
  atrae spam; puede ir solo en el CV descargable. Es mi decisión, no la tomes tú.

### Posicionamiento

Ingeniero en informática con **nueve años** de experiencia en producción construyendo sistemas web de punta
a punta, especializado recientemente en llevar modelos de lenguaje a sistemas productivos reales. Trabajo
con TypeScript, React, Node.js, Prisma y PostgreSQL, con base profunda previa en PHP/Laravel y C#/ASP.NET.
Practico agentic engineering como método diario, con **Claude Code** y desarrollo guiado por especificación.

### Experiencia profesional

**Full-Stack Web & AI Developer Senior — MySourcing** (mayo 2022 – julio 2026), Acapulco de Juárez,
Guerrero, remoto.

Presenta este rol en dos etapas, porque el arco importa:

*Etapa 2025-2026 — Plataforma de Chat Interno:*
- Arquitecté un sistema de chat web centralizado que funciona como hub de API unificado conectando varios
  productos internos y externos, en entorno multitenant con aislamiento por empresa.
- Comunicación bidireccional en tiempo real con Socket.io: notificaciones en vivo, mensajería entre
  productos, acciones colaborativas.
- Compartición de archivos con cifrado extremo a extremo cruzando fronteras de tenant.
- Rate limiting y throttling sobre las APIs de la plataforma.
- **Desarrollé una capa de orquestación de IA que expone la suite de productos de la empresa como
  herramientas invocables por un LLM**, automatizando flujos entre sistemas que antes requerían coordinación
  manual.
- Integré flujos de autorización de compras del Portal de Requisiciones directo en la UI del chat,
  eliminando el cambio de contexto para los aprobadores.
- Stack: TypeScript, ReactJS, Node.js, Express, Socket.io, Prisma ORM, PostgreSQL, Tailwind, Axios, Docker,
  Claude API, Claude Code, Spec-kit.

*Etapa 2025-2026 — Portal de Requisiciones:*
- Diseñé y construí el ciclo completo de requisiciones de compra: creación, autorización multinivel, gestión
  de proveedores, seguimiento de pagos.
- Automaticé la comunicación con proveedores mediante flujos de correo transaccional, incluyendo generación
  de órdenes de compra y avisos de estatus de entrega.
- Dashboards en tiempo real con visibilidad de gasto y aprobaciones pendientes para finanzas y operaciones.
- Stack: TypeScript, ReactJS, Node.js, Express, Prisma ORM, PostgreSQL, Tailwind, Docker, Claude Code.

*Etapa 2022-2024 — Sistema de Gestión de Personal:*
- Análisis y desarrollo de módulos de RRHH para nómina y gestión de personal multiempresa.
- Correcciones y mejoras iterativas al motor de cálculo de nómina.
- Stack: JavaScript, Node.js, MySQL, AngularJS, RxJS, PHP, Laravel, Docker.

**Desarrollador Fullstack Mid TypeScript — BOZ IT Development** (enero – abril 2022), México.
- Módulos para un sistema de **proyección financiera** multicliente, con lógica transaccional compleja y
  exigencia estricta de exactitud en cálculos.
- Corrección de bugs críticos en flujos de cálculo y validación de datos.
- Stack: TypeScript, Node.js, SQL Server, DevExpress.

**Webmaster Developer — Básculas REVUELTA** (julio 2021 – enero 2022), Torreón.
- Administración y mejora de los sitios del grupo con ASP.NET MVC, Umbraco y AngularJS.
- Instalación y administración de Magento para la tienda ganadera; plugins propios en PHP.

**Freelance Full-Stack Developer — proyecto ATT / ProntoForms** (noviembre 2020 – junio 2021), remoto.
- **Desarrollador único**: diseñé, construí y desplegué una plataforma completa de gestión de almacén y
  entregas, desde la arquitectura hasta producción.
- Módulo de inventario: CRUD de productos, almacenes y áreas; conteos ciegos con reporte automático de
  discrepancias; rastreo por zona y rack.
- Módulo de logística: despacho, recepción y embarques; manifiestos de entrega en PDF (DomPDF); trazabilidad
  completa mediante catálogo de estatus y bitácora por unidad.
- Integración de webhooks de ProntoForms: procesamiento en tiempo real de coordenadas GPS, fotos de campo y
  motivos de rechazo desde formularios móviles, con bitácora automática.
- Reportes automáticos en Excel y PDF vía cron jobs y Laravel Queue con envío programado; control de acceso
  por roles; UI con modo oscuro.
- **Escala real en producción: entre 50 y 200 paquetes diarios, con 12 repartidores activos usando la
  plataforma todos los días.** Este dato es verificable y mío; úsalo, es de los pocos números concretos que
  tengo.
- Stack: PHP 8, Laravel 8, Vue.js, MySQL, Redis, Docker, AWS S3.

**Mid Analyst Developer — Grupo Batta Hermanos** (septiembre 2019 – octubre 2020), Torreón.
- Analicé, desarrollé y desplegué dos aplicaciones móviles (Ionic + AngularJS), un sitio web (Node.js +
  VueJS) y un servicio web (ASP.NET MVC Core + C#) para dar de alta distribuidores de vales y supervisar
  personal de campo; **aumentó la cuota de distribuidores y redujo tiempos de procesamiento**.
- Mantenimiento de sitio de soporte para reporte de incidencias en sucursal (HTML, CSS, JS, jQuery, PHP).
- Manejo de datos sensibles del área de crédito directo en SQL Server (T-SQL).
- Mantenimiento de plugins del ERP VisCoi escritos en Visual Basic 6.0.

**Desarrollador Web y .NET — Asta Software** (febrero 2017 – abril 2019), Torreón.
- Desarrollé, desplegué y mantuve sistemas de punto de venta con facturación electrónica e integraciones de
  recarga de tiempo aire, en C# y Windows Forms (.NET Framework 4.0) contra SQL Server LocalDB; **hoy es una
  de las principales líneas de ingreso de la empresa**.
- Empaquetado .exe con todos los programas e instalaciones de base de datos requeridos para despliegue.
- Sitios dinámicos en PHP y Laravel para varios clientes.
- E-commerce sobre el framework Aimeos (PHP/Laravel), integrando pasarelas PayPal y Conekta.

### Proyecto independiente

**Elvira Richards** (marzo – diciembre 2018) — www.elvirarichards.com.mx. Página de talento para la
promotora Elvira Richards. WordPress con tema PHP a la medida, módulos propios y plugins de terceros,
incluyendo mantenimiento de servidor. Corrió en paralelo al puesto en Asta Software.

### Pruebas técnicas entregadas — trátalas como casos de estudio, no como empleos

Son trabajo mío, auditable, y en dos casos es la única evidencia que tengo de una tecnología. Preséntalas
en su propia sección, claramente etiquetadas como pruebas técnicas y con la fecha. **No insinúes que
obtuve el puesto en ninguna de las dos**: no tengo retroalimentación del evaluador en ninguna.

**Agente conversacional por Telegram — CuatroD Studios** (entrevista 12 de junio de 2026; prueba construida
del 15 al 18 de junio de 2026). Rol evaluado: *Automation / AI Workflow Builder*. Un agente en **n8n** que
califica requisitos de servicio conversando por Telegram: 26 nodos, 4 tablas de persistencia, un catálogo de
requisitos editable como datos y 13 páginas de documentación de arquitectura.

Las tres decisiones que vale la pena contar, porque son las que un técnico va a querer discutir:

- **Agrupar ráfagas sin colas ni bloqueos.** Cuando alguien escribe tres mensajes seguidos, el agente
  responde una sola vez. Cada ejecución escribe su propio timestamp en una fila compartida por chat, espera
  unos segundos y vuelve a leer: solo continúa la ejecución cuyo timestamp sigue siendo el más reciente. Las
  ejecuciones paralelas se coordinan a través de los datos, sin infraestructura extra.
- **Un contrato para la salida del LLM, con camino de falla.** La respuesta del modelo se valida contra ocho
  campos obligatorios. Si el parseo falla o faltan campos, el flujo no se cae ni deja al usuario sin
  respuesta: emite un mensaje de respaldo y marca el caso para revisión humana con la razón exacta. Dos
  fallas típicas cerradas a propósito: el silencio, y que datos a medias lleguen a la memoria.
- **Endurecer el prompt a partir de un error observado.** El modelo inventaba nombres de campo que no
  existían en el catálogo. Se corrigió inyectando la lista exacta y cerrada de nombres válidos, derivada del
  propio catálogo, más un ejemplo correcto y uno incorrecto tomado del error real. Después del ajuste el
  modelo prefiere no registrar nada antes que adivinar.

Además: deduplicación de webhooks por `chat_id + message_id`, memoria persistente por usuario entre turnos,
integración con el LLM vía nodo HTTP genérico contra un endpoint compatible con OpenAI (cambiar de proveedor
es cambiar una URL y una credencial, no la lógica), y rama de escalamiento a revisión humana con tabla de
auditoría y alerta.

**Cuidado con el enunciado:** la prueba es propiedad de CuatroD Studios. Puedo describir el sistema y mis
decisiones; **no publiques el enunciado, el catálogo ni el export del workflow**, y no pongas capturas del
canvas de n8n.

**Prueba técnica de PHP/Laravel — LexCore / PoderJudicialVirtual** (agosto de 2026). Si construyes esta
sección, pregúntame por los detalles antes de escribirla: es la evidencia más reciente de mi profundidad en
Laravel y tiene matices que no quiero que resumas de memoria.

### Habilidades técnicas, agrupadas por fuerza de evidencia

Preséntalas con esta honestidad; no las aplanes en una nube de tags donde todo parece igual de fuerte.

- **Fuerte, uso prolongado en producción (5+ años):** PHP/Laravel, C#/ASP.NET MVC, JavaScript/jQuery,
  MySQL/MariaDB, SQL Server (T-SQL), VueJS (2/3), AngularJS, HTML/CSS/Bootstrap.
- **Fuerte, uso reciente en producción (2022-2026):** TypeScript, ReactJS, Node.js/Express, Prisma ORM,
  PostgreSQL, Socket.io, Tailwind, Docker.
- **En desarrollo, exposición real pero más estrecha:** LangChain, LangGraph, Claude API, Python, Next.js,
  Redis, AWS S3, RxJS.
- **Un proyecto completo, no años de uso — dilo así:** n8n. Un agente conversacional construido y
  documentado de extremo a extremo (prueba de CuatroD Studios, junio de 2026). No lo pongas al lado de
  PHP o TypeScript como si tuviera el mismo respaldo.
- **Metodología:** agentic engineering como práctica central de desarrollo (Claude Code a diario,
  desarrollo guiado por especificación con Spec-kit, orquestación multiagente); flujo Git profesional con
  ramas, pull requests y code review; entornos Linux/Ubuntu, servicios contenerizados.
- **Legacy / capaz de mantener:** Visual Basic 6.0, Firebird, Magento, Umbraco, WordPress, Ionic, DevExpress.
- **Dominios:** arquitectura SaaS multitenant, sistemas en tiempo real, orquestación de IA en producción,
  agentes conversacionales y automatización de flujos (debounce de ráfagas, idempotencia de webhooks, memoria
  persistente por usuario, contratos de salida estructurada para LLM, escalamiento a revisión humana),
  ERP/RRHH/nómina, flujos de aprobación y requisiciones, integración de pasarelas de pago (PayPal, Conekta,
  OpenPay), almacén/logística/inventario, punto de venta y facturación electrónica.

### Formación y certificaciones

- **Ingeniero en Informática** — Instituto Tecnológico Superior de Lerdo, Durango. Estudios 2010-2015, acto
  recepcional 16 de octubre de 2017, título expedido el 22 de marzo de 2018. **Mención Honorífica.**
- Curso completo de LangChain, LangGraph y Agentes IA con Python — Udemy, 18h, mayo 2026.
- Platzi: ~90 certificados. Los relevantes: Claude AI (×2), Herramientas de AI para Developers, Prompt
  Engineering, Introducción al Desarrollo Backend, Fundamentos de Node.js, Docker (×2), Patrones de Diseño y
  Buenas Prácticas en PHP.
- EF SET English Certificate — 41/100, B1 Intermedio, mayo 2025.

### Idiomas — trátalo con cuidado

- Español nativo.
- **Inglés B1 Intermedio**, certificado EF SET: lectura B2, habla B1, escritura A2, comprensión auditiva A2.

**Nunca escribas "fluent", "advanced" ni "full professional".** Si el sitio menciona idiomas, la línea
honesta es: *Spanish (native) · English B1 Intermediate, EF SET certified, technical reading at B2*. Estoy
mejorando activamente y prefiero que un reclutador lo sepa antes de una llamada, no durante.

---

## REGLAS DE HONESTIDAD — no negociables

Este sitio lo van a leer personas que después me van a entrevistar. Todo lo que diga tiene que sostenerse
en una conversación técnica.

1. **Nueve años de experiencia**, contados desde febrero de 2017. Ni cinco ni "6+".
2. **Mi experiencia con IA es orquestación e integración**: definir herramientas, invocarlas desde un LLM,
   diseñar prompts, manejar permisos y fallos. **Nunca** entrenamiento de modelos, fine-tuning, evaluación
   ni MLOps. No escribas "machine learning engineer" ni nada que lo insinúe.
3. **No inventes métricas.** Solo tengo tres números reales: los 50-200 paquetes diarios con 12
   repartidores del proyecto ProntoForms, el aumento de cuota de distribuidores en Batta Hermanos (sin
   porcentaje, no lo tengo), y que el POS de Asta es hoy una de las principales líneas de ingreso de la
   empresa. Si necesitas un dato que no está en este documento, **pregúntame**.
4. **No inventes proyectos ni repositorios.** Para la sección de proyectos, lee mi GitHub real en
   https://github.com/geramoran y usa únicamente lo que exista ahí. Si un repo está vacío o es un fork sin
   aportes míos, no lo presentes como trabajo propio.
5. **Sin gestión de personas.** No tengo experiencia documentada liderando equipos. Nada de "lideré un
   equipo de X".
7. **Las pruebas técnicas son trabajo entregado, no trabajo aprobado.** No tengo retroalimentación de
   ningún evaluador. Nunca escribas "seleccionado", "superé la prueba" ni nada que sugiera un
   resultado, y no las mezcles con la experiencia profesional: van en su propia sección, fechadas y
   etiquetadas como pruebas técnicas.
8. **n8n es un proyecto, no una trayectoria.** Es mi única evidencia en esa herramienta. Si el sitio
   muestra niveles de habilidad, n8n no va junto a PHP ni a TypeScript.
6. **Cuidado con el trabajo bajo NDA.** Los sistemas de MySourcing, BOZ IT, Batta y Asta son propiedad de
   esas empresas: puedo describir arquitectura, stack y mi responsabilidad, pero **no publicar código,
   capturas de pantalla ni nombres de clientes finales**. Preséntalos como casos de estudio narrados, no
   como demos.

## Decisiones que necesito que me consultes, no que asumas

1. **Idioma del sitio.** Mi mercado objetivo es doble: remoto internacional (inglés) y México/LatAm
   (español). Propón si conviene bilingüe con selector, inglés primero, o dos versiones. **Si el sitio va en
   inglés, dímelo explícitamente para que consiga revisión de un tercero:** mi escritura en inglés es A2 y
   un texto con errores en mi propio portafolio me haría más daño que no tenerlo.
2. **Teléfono público**, ver arriba.
3. **CV descargable:** tengo el CV en LaTeX y puedo generar el PDF. Dime dónde lo quieres y con qué nombre
   de archivo.
4. **Foto.** ¿La incluimos? Dependerá del tema visual que elija.

---

## Fase 2 — Lo que viene después (constrúyelo preparado, no lo hagas todavía)

Voy a ir publicando mis proyectos como demos en vivo, en un servidor aparte, tomando como referencia mis
repositorios de GitHub. Esto ocurrirá de forma gradual, un proyecto a la vez.

Lo que necesito de ti **ahora** para no rehacer el sitio después:

- El campo `liveUrl` por proyecto descrito arriba, con render condicional.
- Una plantilla de caso de estudio por proyecto que funcione **con o sin** demo: problema, decisiones de
  arquitectura, stack, mi responsabilidad concreta, resultado. Un proyecto sin demo debe verse completo, no
  mutilado.
- Un `README` en el repo del sitio que explique cómo agregar un proyecto nuevo y cómo enlazar su demo
  cuando exista, escrito para que yo lo siga dentro de seis meses sin recordar nada.
- Deja anotado en ese README qué haría falta si más adelante quiero subdominios por proyecto
  (por ejemplo `proyecto.midominio.com`), sin implementarlo ahora.

---

## Entregables de esta primera etapa

1. Las propuestas de tema en Pencil, y mi elección confirmada.
2. El sitio estático completo, listo para publicar en GitHub Pages desde mi repositorio.
3. Los archivos de datos separados (proyectos, experiencia) con `liveUrl` en `null`.
4. El workflow de despliegue.
5. El README de mantenimiento.

Empieza por la Fase 0. No escribas código del sitio hasta que yo elija tema.

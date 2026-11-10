# Correo para Valtre — andres.rojas@valtre.com

**Puesto:** Ingeniero de Agentes de IA Senior · San Pedro Garza García, N.L. · Presencial
**Publicado por:** Andrés Rojas Tristán
**Adjuntar:** `cv/main_valtre_ingeniero_agentes_ia.pdf` (2 páginas, verificado)

---

**Asunto:** CV — Jose Gerardo Martínez Morán · Ingeniero de Agentes de IA Senior

---

Estimado Andrés,

Le escribo por la vacante de Ingeniero de Agentes de IA Senior que publicó en
LinkedIn. Adjunto mi CV.

Soy Ingeniero en Informática con nueve años de desarrollo de software en
producción, desde febrero de 2017. En mis últimos cuatro años en MySourcing
construí la capa de orquestación de IA que expone el conjunto de productos de la
empresa como herramientas invocables por un LLM: definición de herramientas,
contratos de salida estructurada, permisos y aislamiento multitenant, y manejo
de fallas. Antes de eso arquitecté la plataforma de chat en tiempo real,
multitenant y cifrada extremo a extremo que funciona como hub de API entre esos
productos (TypeScript, Node.js, React, Socket.io, Prisma, PostgreSQL).

También desarrollé un agente conversacional completo de calificación de
requerimientos sobre Telegram: 26 nodos en n8n, debounce de ráfagas por
marca de tiempo, deduplicación de webhooks, memoria persistente por usuario y un
contrato de salida del LLM de ocho campos con escalamiento forzado a revisión
humana cuando la confianza no alcanza. La parte difícil de un agente en
producción no es la llamada al modelo, es lo que pasa alrededor: idempotencia,
estado, y qué hace el sistema cuando el modelo se equivoca.

De sus requisitos cubro con trabajo verificable: los 5+ años de desarrollo
(tengo nueve), SQL Server y T-SQL, Docker, Git y flujo profesional de ramas y
code review, CI/CD, y formación en Ingeniería en Informática con cédula
profesional. Trabajo con Claude Code todos los días y desarrollo con
especificación primero usando Spec-kit: mi proyecto actual para un cliente
privado es un SaaS de costeo multi-tenant construido así, con constitución de
proyecto escrita, 16 features documentadas y un motor de costeo determinista en
TypeScript, desplegado en VPS Ubuntu.

Donde soy menos fuerte y prefiero decirlo de entrada: mi lenguaje principal es
TypeScript y PHP, no Python —lo uso, pero no lo pondría como avanzado— y mi
experiencia con LLM ha sido de orquestación y tool-calling, no de RAG en
producción. Embeddings, bases vectoriales y recuperación híbrida los conozco de
formación (curso de LangChain y LangGraph, 18 horas, mayo de 2026), no de haber
sostenido un sistema RAG en operación. Tampoco he trabajado con Ollama ni con
modelos abiertos tipo Qwen; mi trabajo con modelos ha sido sobre API de Claude.

Si el puesto requiere alguien que ya haya operado RAG a escala, no soy ese
perfil hoy. Si lo que buscan es un ingeniero senior que ya sabe llevar sistemas
de IA a producción —con todo lo que eso implica en permisos, aislamiento de
datos y manejo de errores— y que aprende el stack específico sobre la marcha,
ahí es donde he trabajado los últimos años.

Mi inglés es B1 intermedio, con lectura B2.

Radico en Torreón, Coahuila. Entiendo que la posición es presencial en San Pedro
Garza García; estoy abierto a reubicarme dentro de México y con gusto lo
platicamos.

Quedo a sus órdenes.

Saludos cordiales,

**Jose Gerardo Martínez Morán**
Ingeniero en Informática · Cédula Profesional 12320388
(+52) 871-310-7796 · geramtz100@gmail.com
Torreón, Coahuila
LinkedIn: https://www.linkedin.com/in/geramoran/
GitHub: https://github.com/geramoran
Portafolio: https://geramoran.github.io

---

## Evaluación de fit

| Requisito | Estado |
|---|---|
| 5+ años desarrollo de software | ✅ Nueve años desde feb 2017 |
| 2+ años con LLM/RAG | ⚠️ Parcial — orquestación y tool-calling en producción desde ~2024; RAG no |
| Python avanzado | ❌ Brecha real — secundario en el perfil |
| Agentes de IA | ✅ Capa de orquestación MySourcing + agente n8n de CuatroD |
| Ollama / modelos abiertos (Qwen) | ❌ Sin evidencia |
| RAG, embeddings, vectoriales, híbrida | ❌ Solo formación (curso LangChain/LangGraph) |
| SQL Server / T-SQL | ✅ BOZ IT, Batta, Asta |
| Docker, Git, CI/CD, seguridad | ✅ |
| Formación en Sistemas/Computación | ✅ Ingeniero en Informática + cédula |
| Inglés intermedio | ✅ B1 (lectura B2) |

**Veredicto: fit medio-bajo en el núcleo técnico del puesto.** Los tres
requisitos centrales de IA —Python avanzado, RAG en producción, modelos abiertos
locales— son brechas reales. Lo que sí es fuerte es la seniority general y
agentes en producción. Vale el correo porque el mercado de agentes de IA en
México todavía tiene poca oferta senior real, pero no esperes que pase un filtro
que busque Python+RAG literal.

**Bloqueador de modalidad:** la vacante es **presencial en San Pedro Garza
García**. Tu perfil marca como deal-breaker el 100% presencial sin opción
híbrida, pero también marca reubicación dentro de México como abierta. Escribí
la carta asumiendo que estarías dispuesto a mudarte a Monterrey. **Si no lo
estás, no envíes este correo** — o cambia ese párrafo y pregunta primero por
híbrido.

## Verificar antes de enviar

1. **Antigüedad del post.** No pude confirmar la fecha de publicación; el link
   es un `urn:li:share` sin fecha visible. Si lleva meses, la vacante puede
   estar cerrada. Revisa el perfil de Andrés Rojas Tristán.
2. **Qué es Valtre.** Busqué y no encontré información pública de la empresa:
   ni sitio, ni giro, ni tamaño. No afirmé nada sobre ellos en la carta, a
   propósito. Antes de invertir en adaptar el CV, averigua a qué se dedican.
3. **El CV ya está generado** en `cv/main_valtre_ingeniero_agentes_ia.pdf`
   (2 páginas, capa de texto limpia). Revísalo antes de adjuntarlo.

## Qué NO afirmar si avanza

- Nada de RAG, embeddings o bases vectoriales en producción.
- Nada de Ollama, Qwen ni modelos auto-hospedados.
- Python no es nivel avanzado.
- Nada de entrenamiento, fine-tuning, evaluación de modelos ni MLOps.
- CostoPreciso: es de un cliente privado, no se nombra, y **está en desarrollo,
  sin entregar, sin usuarios y sin ingresos**.
- El agente de CuatroD fue entregado; **no hubo retroalimentación del
  evaluador**. No insinuar resultado.

---
framework_version: 1.0.0
---

# Behavioral Profile

<!-- Populated by /setup Path A on 2026-08-10 -->
<!-- No formal assessment (PI/DISC/MBTI) on file. This profile is synthesized from the -->
<!-- LinkedIn About section and from patterns visible in the documented work history. -->
<!-- Inferred items are labeled. Replace with a real assessment if one becomes available. -->

## Overview

No formal behavioral assessment on file. The pattern visible across nine years of work history is a **builder-generalist**: someone who takes a system from architecture to production alone or in a small team, absorbs unfamiliar stacks quickly, and treats tooling as a lever rather than a preference.

## Core Behavioral Drives

*[Inferred from LinkedIn About and work history — review before relying on this]*

| Drive | Level | Meaning |
|-------|-------|---------|
| Autonomy / ownership | High | Repeatedly sole or lead developer on complete systems (ProntoForms platform, Internal Chat Platform, Requisitions Portal). Works well without close supervision. |
| Learning drive | Very high | ~90 course certificates; moved from PHP/Laravel to TypeScript/React/Node and then into LLM orchestration inside a single employer, without changing jobs to do it. |
| Tool adoption | Very high | Adopted agentic engineering (Claude Code, Spec-kit) as a core methodology rather than an experiment; built an LLM tool-calling layer in production. |
| Breadth over depth | High | Six employers, ten-plus stacks, comfortable in both modern TS and VB6 legacy. Reads as adaptable; can read as unfocused if not framed. |
| Persistence in role | Moderate-high | 4 years 3 months at MySourcing with a visible growth arc; earlier roles shorter (4-8 months in 2021-2022 transition period). |

## Strongest Behaviors

- **End-to-end ownership.** Given a problem, delivers architecture through deployment. The ProntoForms platform was built solo: inventory, logistics, webhook integration, reporting, access control, deployment.
- **Stack-agnostic pragmatism.** Maintained a Visual Basic 6.0 ERP plugin in the same role where two Ionic/AngularJS mobile apps were shipped. Does not refuse unglamorous work.
- **Self-directed upskilling.** Moved into AI engineering by building it into the day job, not by waiting for a role that granted permission.
- **Systems thinking across product boundaries.** The Internal Chat Platform was designed as a unified API hub connecting separate products, with approval workflows pulled into the chat UI — an integration-minded rather than feature-minded design.

### Intellectual honesty under evaluation

*[Sourced from the LexCore assessment, August 2026 — see `01-candidate-profile.md` Verified Work Samples. Documented in artifacts, not inferred.]*

The strongest behavioral evidence in the profile, because it happened while he was being graded and nobody
required it of him:

- **He asked a second model for an independent diagnosis of the same repo**, without showing it the
  solution he had already built, specifically to find what he had missed.
- **It found something he had missed** — `UserFactory` declaring columns the migration never creates, and
  `User` missing `HasFactory`, so `User::factory()` threw. He verified it by running it before fixing,
  rather than accepting or dismissing the claim.
- **That prompted him to find a further gap of his own**: the job whose behaviour was his central argument
  had no test at all, so the requirement lived only in a comment. He wrote the test and **verified it by
  mutation**.
- **He recorded the cross-check inside the deliverable's AI logbook** by explicit choice, rather than
  quietly absorbing the finding as his own.
- He was also able to say where the second opinion was **weaker** than his own, on specific technical
  grounds, so this is calibrated deference rather than deference in general.

**What this supports claiming:** seeks disconfirmation on purpose, verifies before accepting, credits
sources, and separates a good critique from a shallow one. **What it does not support:** any claim about
collaboration with human colleagues, which the profile still has no direct evidence for.

### Third-party corroboration (the only one on file)

*[Sourced from the Asta Software constancia laboral, 08 April 2019 — see `01-candidate-profile.md` References. Verbatim, not inferred.]*

His manager at Asta, **Lic. José Antonio Vázquez Gómez (Gerente de Sistemas)**, wrote:

> "siempre observó una actitud de superación, iniciativa y responsabilidad, distinguiéndose de igual manera
> por sus valores de honestidad y respeto."

Everything else in this file is inferred from the LinkedIn About section and from the shape of the work
history — i.e. ultimately self-reported. This single line is the only assessment written by someone else,
and it independently names **iniciativa** and **responsabilidad**, which is the same initiative/ownership
drive the inferred profile above assigns as High. Treat it as weak but real external evidence: it is a
warm two-line character reference from 2019, not a performance review, and it says nothing about the
2022-2026 AI and architecture work.

**Where it is usable:** as a referee for the Asta period, and as the answer when an interviewer asks "what
would a former manager say about you?" — quoting a written line beats improvising. **Where it is not:**
it does not corroborate any technical claim, and it must never be paraphrased into something stronger than
it says.

## How You Work Best

*[Partly inferred — review]*

- Small teams or solo ownership of a defined system, with room to make architectural decisions
- Environments where modern tooling and AI-assisted workflows are welcomed, not restricted
- Greenfield or actively evolving products rather than pure maintenance
- Remote or hybrid; four years of remote delivery for an employer based in another state

## Growth Areas (frame positively in applications)

- **English listening and writing (A2).** Real constraint, not a framing problem. Frame as: technical reading at B2, actively training conversational listening. Do not apply to English-daily-standup roles without flagging it to the user first. See `01-candidate-profile.md` Language Evidence.
- **No documented formal team leadership.** Has owned systems, not people. Frame as technical ownership and mentoring-by-code-review; do not claim line management.
- **Breadth can read as unfocused.** Ten stacks across six employers needs a narrative. Frame as: consistent full-stack core (backend + relational data + frontend) with the surface technology changing, now converging on TypeScript and AI orchestration.
- **AI/ML depth is applied, not theoretical.** LangChain/LangGraph knowledge is course-plus-production-integration, not research. Claim orchestration and integration, never model training or MLOps.

## Mapping to Job Posting Language

**Strong behavioral fit** when a posting says:
- "ownership", "end-to-end", "autonomy", "you will own this system"
- "small team", "startup", "wear many hats", "generalist"
- "AI-assisted development", "LLM integration", "agentic workflows", "AI tooling encouraged"
- "greenfield", "you'll shape the architecture"
- "remote-first", "async"

**Flag as potential friction** (not deal-breaker) when a posting says:
- "daily standups in English", "client-facing in English", "US client communication" → listening A2
- "deep specialization in X", "you will be the world expert on X" → breadth profile
- "manage a team of N engineers" → no documented line management
- "maintain and support existing systems" with no development component → user's stated deal-breaker
- "on-call rotation", "24/7 support" → user's stated deal-breaker
- "5 days on-site" → user's stated deal-breaker
- Staffing / body-shop consultancies renting developers by the hour → user's stated deal-breaker

## Management Style Preferences

*[Inferred — confirm with the user]*

- Works well with managers who set outcomes and leave implementation open
- Likely friction with micromanagement or with organizations that restrict tooling choices, given the self-directed adoption pattern
- Needs a manager who treats continuous learning as productive time rather than a distraction

## Using This in Applications

- **Cover letters:** lead with the AI orchestration layer at MySourcing. It is the single most differentiating thing in the profile and most full-stack candidates cannot claim it. Follow with end-to-end ownership evidence (ProntoForms platform, solo build).
- **CV:** emphasize systems owned rather than tasks performed. Use the phased arc at MySourcing (payroll modules 2022-2024 → chat platform and requisitions portal 2025-2026) so a 4-year tenure reads as growth, not stagnation.
- **Interviews:** the ProntoForms solo build and the LLM tool-calling layer are the two strongest stories. See `07-interview-prep.md`.
- **Don't overstate:** English proficiency above B1; team/people management; ML model training or MLOps; production experience with any technology only present in a course certificate.

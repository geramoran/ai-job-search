---
framework_version: 1.0.0
---

# Interview Preparation Guide

<!-- Populated by /setup Path A on 2026-08-10 -->
<!-- Path A does NOT write full STAR answers - only the candidate knows the specifics. -->
<!-- The stubs below are seeded from real CV/LinkedIn material. Fill in S/T/A/R yourself. -->

## STAR Format

Structure answers as: **Situation** (context), **Task** (your responsibility), **Action** (what you did), **Result** (outcome).

Keep answers to 1-2 minutes. Be specific. End with what you learned or would do differently.

## STAR Candidates (Complete Manually)

### 1. AI orchestration layer exposing a product suite as LLM-callable tools
**Source:** CV + LinkedIn — MySourcing, 2025-2026
**What happened:** Built a layer that exposed the company's internal and external products as tools an LLM could call, automating workflows that previously crossed system boundaries by hand.
**Why it matters:** This is the strongest differentiator in the whole profile. Answers "tell me about your most technically interesting project", "how have you used AI in production", "describe a system you designed", "give an example of technical initiative".
**S/T/A/R stub:**
- Situation: *(What was manual or broken before? Which teams felt it?)*
- Task: *(Was this assigned or did you propose it? Who decided the scope?)*
- Action: *(How did you define the tool surface? How did you handle auth, permissions, and multitenancy in tool calls? What did you do about hallucinated or wrong tool invocations?)*
- Result: *(Adoption? Time saved? Number of workflows automated? What broke and how did you fix it?)*

### 2. Solo end-to-end build of the ProntoForms warehouse and delivery platform
**Source:** CV — Freelance / ATT-ProntoForms project, Nov 2020 - Jun 2021
**What happened:** As sole developer, designed, built and deployed a full warehouse, inventory and delivery-logistics platform, including third-party webhook integration and automated reporting.
**Why it matters:** Best evidence of end-to-end ownership and of delivering without a team. Answers "tell me about a project you owned", "how do you handle ambiguity", "describe a time you worked without support", "how do you prioritize when everything is yours".
**S/T/A/R stub:**
- Situation: *(Who was the client? What was the operation losing without this system?)*
- Task: *(Scope you committed to, timeline, what you owned versus what the client owned.)*
- Action: *(Architecture choices: why Laravel 8 + Vue? Why Redis? How did you design blind inventory counts and discrepancy reporting? How did you handle the ProntoForms webhook reliability?)*
- Result: *(Went live? How many users, racks, deliveries? Did discrepancies drop? Is it still running?)*

### 3. Multitenant end-to-end encrypted chat as a unified API hub
**Source:** CV + LinkedIn — MySourcing, 2025-2026
**What happened:** Architected a real-time chat platform that also functioned as an integration hub across separate products, with E2E encrypted file sharing and embedded purchase-approval workflows.
**Why it matters:** Answers "describe a complex architecture you designed", "how do you handle real-time systems", "tell me about a security-sensitive feature", "how do you design for multiple tenants".
**S/T/A/R stub:**
- Situation: *(Why did the company need chat to be a hub rather than just chat?)*
- Task: *(Your scope. Did you choose the multitenant isolation model?)*
- Action: *(Socket.io scaling approach? How is tenant isolation enforced? What is the E2E encryption scheme and where do keys live? How did approvals get embedded without coupling the products?)*
- Result: *(Adoption across products, message volume, what the approval integration removed in practice.)*

### 4. Two mobile apps plus web service that grew distributor onboarding
**Source:** CV + LinkedIn — Grupo Batta Hermanos, 2019-2020
**What happened:** Delivered two Ionic/AngularJS mobile apps, a Node/Vue website, and an ASP.NET MVC Core web service to onboard voucher distributors and supervise field staff. CV claims measurable increase in distributor quota and reduced processing time.
**Why it matters:** The only story in the profile with a business-outcome metric. Answers "tell me about work with measurable impact", "describe delivering across platforms", "how do you work with non-technical stakeholders".
**S/T/A/R stub:**
- Situation: *(How were distributors onboarded before? What was the bottleneck?)*
- Task: *(Your role versus the team's. Who else worked on it?)*
- Action: *(Why hybrid mobile? How did field staff actually use it?)*
- Result: **Get the real numbers.** *(Quota increased by how much? Processing time from X to Y?)* Currently the claim is unquantified in every CV — an interviewer will ask, and a vague answer damages the claim.

### 5. Maintaining a Visual Basic 6.0 ERP while shipping modern mobile apps
**Source:** LinkedIn — Grupo Batta Hermanos, 2019-2020
**What happened:** Maintained plugins for the VisCoi ERP written in VB6, in the same period as delivering Ionic/AngularJS apps.
**Why it matters:** Answers "how do you handle legacy code", "tell me about unglamorous work", "describe working in an unfamiliar or outdated technology". Shows pragmatism, which small teams value highly.
**S/T/A/R stub:**
- Situation: *(What did the business still depend on VB6 for?)*
- Task: *(What were you asked to keep alive or change?)*
- Action: *(How did you learn VB6? How did you avoid breaking a critical system?)*
- Result: *(What stayed stable? Was any part migrated?)*

### 6. Point-of-sale system that became a top revenue line
**Source:** CV + LinkedIn — Asta Software, 2017-2019
**What happened:** Built and maintained POS systems with electronic invoicing and airtime top-up integrations, described as now one of the company's top revenue streams. Also handled the .exe packaging and database install process.
**Why it matters:** Answers "what work of yours had the longest life", "tell me about something you built that outlasted you", "describe shipping to non-technical end users".
**S/T/A/R stub:**
- Situation: *(What did clients use before?)*
- Task: *(What you owned: which parts of the POS, the invoicing compliance, and the install packaging were yours end to end? This was years one and two of the career, but the scope was a shipped product, so describe the scope and let the date speak for itself.)*
- Action: *(Facturación electrónica compliance, LocalDB choice, install packaging.)*
- Result: *(Revenue claim — can you attribute it? Number of installs?)*

### 7. The LexCore assessment — finding the trap under the obvious fix
**Source:** LexCore technical assessment for PoderJudicialVirtual, delivered 2026-08-17 — see `01-candidate-profile.md` Verified Work Samples
**What happened:** Given a Laravel repo with a revenue bug, he rejected the one-line fix because it would have silently broken a second consumer whose requirement was recorded only in a comment inside an unrelated job, then found a test that was asserting the bug as correct behaviour, plus two latent defects nobody had asked about.
**Why it matters:** The single best story in the profile for "tell me about a bug that wasn't what it looked like", "how do you work in an unfamiliar codebase", "how do you use AI without turning your brain off", and "give me an example of not taking the first answer". It is also the only externally-set, artifact-backed work sample he has — everything else is self-described.
**S/T/A/R stub:**
- Situation: *(The ticket said the dashboard total was wrong. What did the repo look like on first read? How long before you suspected the obvious fix?)*
- Task: *(Three tasks in ~3 hours, plus an AI logbook. How did you budget it? What did the environment cost you — the local PHP that could not run it, moving to Docker?)*
- Action: *(How did you find the second consumer — what made you go looking? How did you decide to split the method rather than deprecate the old name? Why did you fix `ResendCoverageNotice` when nobody asked?)*
- Result: **You have real numbers here — use them.** *(5 → 35 tests green, 55 assertions, 11 commits, +1125/−77, two extra defects, one verified by mutation, zero setup changes.)* Then the honest close: no evaluator feedback yet.

### 8. Eight rejections in the AI logbook — judgment over the tool
**Source:** Same assessment. The README stated a logbook rich in justified rejections would count in his favour.
**Why it matters:** Answers the hardest question this profile faces — "you use Claude Code daily, so how much of the work is yours?" — with artifacts instead of assurances. Also answers "when do you not use your own methodology?", since he declined to apply spec-kit for this task and wrote down why.
**S/T/A/R stub:**
- Situation: *(You were told AI use was expected and would be reviewed. How did that change how you worked?)*
- Task: *(What made a suggestion worth rejecting in writing rather than just deleting?)*
- Action: *(Pick the two strongest of the eight. The `whereNull` that would have broken CONT-201 is the obvious one — which is the second?)*
- Result: *(What the logbook let you say in the interview that you could not otherwise have proven.)*
- **Prepared companion answer:** "El código lo escribió Claude Code... Lo que es mío es el criterio", then invite them to ask about any of the eight. **That invitation only works if you can answer all eight** — re-read them before any technical session.

## Common Tough Questions

### "Why did you leave MySourcing?" / "¿Por qué saliste de MySourcing?"
> **Prepare this — it is the first question in every interview.** The role ended July 2026 after 4 years 3 months. Whatever the actual reason (layoff, restructuring, project ended, resignation), decide the one-sentence version now and use it consistently. Rules: honest, brief, no criticism of the employer, and pivot immediately forward to what you want next. Do not improvise this one.

### "You have four years at one company but the CV shows work mainly from 2025-2026."
> Real risk — the MySourcing entry spans 2022-2026 while the flagship projects are 2025-2026. Answer in two parts: 2022-2024 was payroll and personnel modules on the legacy PHP/Laravel/AngularJS stack, including the payroll calculation engine, and 2025-2026 was greenfield ownership of the chat platform and requisitions portal on a modern stack. Frame it as the arc that earned the greenfield work, and have one concrete 2022-2024 accomplishment ready.

### "You don't have production ML / model training experience."
> Acknowledge directly and reframe on the true boundary: "Correct. My AI work is orchestration, not model development. I build the layer where an LLM gets safe, permissioned access to real systems and where its output has consequences: tool definitions, auth, multitenant isolation, error handling when the model calls the wrong thing. That is the part that broke most often and the part I got good at." Never pretend the gap isn't there.

### "How is your English?" / English-language screening
> Honest answer: B1 Intermediate, EF SET certified May 2025, with technical reading at B2. State plainly that reading documentation, code review and written async communication are comfortable, and that spoken and listening fluency is what you are actively working on. **Do not claim more.** If the role needs daily spoken English, better to surface it in the first call than to be found out in the third. Consider re-testing EF SET before a search push — the current certificate is from May 2025 and a newer score may be higher.

### "Your Batta constancia says 'Analista de Desarrollo Jr' but your CV says Analista de Desarrollo. Which is it?"
> Only comes up if the employer holds the document — a background check, or an onboarding form where you attached it. Answer briefly and without defensiveness: the constancia records the title he was **hired under in September 2019**; the CV states the title without a seniority suffix because the suffix stopped describing the work — by the end he was analysing, building and deploying two mobile apps, a website and a web service, plus maintaining the VB6 ERP and production credit data. Then stop. Do not claim Batta promoted him, because there is no document saying so. If pressed on why not "Jr": "because I'd be describing the first month of the role, not the thirteen."

**Scope of this rule — read it before applying it.** It governs the label on **one 2019-2020 line** and nothing else. He is a **senior engineer with nine years of production experience since February 2017**, and that is the framing everywhere else: the profile statement, the cover letters, the answer to "tell me about yourself". A junior title on a 2019 job is normal career history, not a statement about today. If an interviewer tries to use it to reprice the whole CV, the answer is the arc: "That was my third year. Since then I've owned production systems end to end as sole developer, and most recently architected a multitenant real-time platform and the LLM orchestration layer on top of it."

### "Where do you see yourself in 5 years?"
> Aim at the AI-engineering direction: deepening from integrating LLMs into products toward designing the agentic systems themselves, while staying hands-on. Match the specific company's growth path, do not recite this generically.

### "What's your biggest weakness?"
> Two genuine options with real mitigation. (a) Spoken English — with the concrete plan you are actually following. (b) Breadth over depth: many stacks across nine years, and the mitigation is the deliberate convergence on TypeScript plus AI orchestration since 2025. Pick one, do not offer both.

### "Why this company specifically?"
> Customize per company. Must reference specific projects, values, market position, or team structure. Never generic.

### "There's a gap between 2017 and 2020 in your CV." — asked live, PJV screening 2026-08-13
> **This actually happened**, so treat it as likely rather than hypothetical. It is not the four-month gap below; the interviewer read the CV as starting around 2020 because the version sent led with recent work and de-emphasised the early roles. Answer: nine years of career starting February 2017, and the 2017-2020 period is Asta Software (point-of-sale with facturación electrónica, e-commerce on Aimeos with PayPal/Conekta/OpenPay) followed by Batta Hermanos from September 2019. **The fix is upstream:** any CV that lets an interviewer believe the career starts in 2020 is underselling by three years. Check that Asta and Batta are legible on every CV before sending, however far down the page they sit.

### "Did you decide to leave, or did they make the decision?" — asked live, PJV screening 2026-08-13
> The direct follow-up to "why did that job end", and it closes the escape route from a vague answer. Use the agreed line without variation: the separation was the company's decision, July 2026, over a disagreement about priorities and delivery timing, with two developers covering several products. Then the concrete learning: agreeing scope in writing. **Do not add new detail because a different or more senior person is in the room** — the same version goes to everyone. See `01-candidate-profile.md` under MySourcing.

### "The multitenant encrypted chat — how did you solve the encryption?" — asked live, PJV screening 2026-08-13
> **This one went badly the first time** and it will come back, because interviewers who audit a CV line by line return to the most technical claim on it. The problem was ordering, not honesty: the written application says he designed the platform himself, and the spoken answer implied a Claude security audit produced the design. Both are true. The single version, from `01-candidate-profile.md`: architecture and initial design done unaided; Claude used later to audit security on an already-running production system; the observations from that audit, end-to-end encryption included, implemented by him. If it sounded otherwise: "me expliqué mal: decidí yo, revisé con herramienta." Be ready for the follow-up on the actual scheme and where keys live.

### "Why are there four months between Asta Software and Batta Hermanos in 2019?"
> Minor gap (May-Aug 2019). Have a one-line factual answer ready. Short gaps rarely matter unless you look uncomfortable about them.

## Questions You Should Ask Interviewers

### About the Role
- "What does a typical week look like in this role?"
- "What would success look like in the first 6 months?"
- "What's the biggest challenge the team is facing right now?"

### About the Team
- "How big is the team, and how do you divide work?"
- "What does the development lifecycle look like, from idea to production?"
- "How do you onboard new team members?"

### About Tech & Growth
- "What's your current stack, and what are you planning to change about it?"
- "How does the team use AI tooling day to day? Is there a policy on it?" *(high signal for this candidate — a restrictive answer is a genuine fit warning)*
- "Is there room to grow into more architectural or strategic decisions?"

### About Working Arrangement (ask these early)
- "Is this role remote, hybrid, or on-site? If hybrid, how many days?"
- "What are the core hours, and how much timezone overlap do you need?" *(GMT-6)*
- "How much of the day-to-day communication happens in English versus Spanish?"
- "Is this an employment contract or a contractor arrangement?" *(relevant for international remote)*
- "Is there an on-call rotation?"

### About Culture (use these to prevent disappointment)
- "How would you describe the team culture?"
- "What's the balance between new development and maintenance work?"
- "How would you describe the leadership style in this team?"
- "What do people who thrive here have in common?"

## Phone/Video Interview Tips
- Have STAR examples written out (use this file)
- **For English-language calls:** ask for the questions in writing beforehand if the format allows, request the interviewer slow down without apologizing for it, and prepare the "tell me about yourself" answer verbatim — the opening is the moment listening anxiety peaks
- Keep a glass of water nearby
- Smile when speaking (it changes your tone)
- Ask for clarification if a question is vague — in English, "could you rephrase that?" is completely normal and costs nothing
- It's OK to take 5 seconds to think before answering
- End with: "Is there anything else you'd like to know about my background?"

## After the Application (Best Practice)

### Follow-Up Etiquette
- **Don't call to "stand out"** post-submission - this risks a negative impression
- If the employer specified a timeline, respect it and wait
- If no timeline was given and 2+ weeks have passed, a brief status enquiry is acceptable
- If you have genuinely new, relevant information to share, a short follow-up is fine

### Thank-You Notes
- When you receive any update (interview invitation, rejection, or status update), send a brief thank-you message
- Express appreciation for their time and the process
- Keep it short (2-3 sentences)

## Roleplay Guidelines
When the user asks for interview practice:
1. Ask which role/company to simulate, and **which language** the interview will be in
2. Start with easy warm-up questions ("Tell me about yourself")
3. Progress to role-specific technical questions
4. Include 1-2 behavioral questions using the competencies from the job posting
5. End with a tough question or curveball
6. After each answer, give brief feedback: what worked, what to sharpen
7. Suggest which STAR example would work best for each question
8. If practising in English, also flag phrasing that would be hard to deliver at B1 and offer a simpler equivalent

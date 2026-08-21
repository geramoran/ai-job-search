---
framework_version: 1.0.2
---

# Cover Letter Templates and Tailoring Guide

## Template: Custom cover.cls (XeLaTeX)

Cover letters use a custom LaTeX document class (`cover.cls`) with Lato/Raleway fonts.

**Output file:** `cover_letters/cover_<company>_<role>.tex`
**Compile with:** XeLaTeX (cover.cls requires fontspec)
**Font directory:** `cover_letters/OpenFonts/fonts/`

### Compile command

```bash
cd cover_letters && xelatex -interaction=nonstopmode cover_<company>_<role>.tex
```

Expected output: `Output written on cover_<company>_<role>.pdf (1 page, ...)`. Any page count other than 1 is a failure that must be fixed before presenting to the user.

## Compile-and-Inspect Loop (MANDATORY)

After writing the cover letter and before presenting to the user, always compile and visually inspect the PDF. Iterate until the layout is clean:

1. Run `xelatex -interaction=nonstopmode cover_<company>_<role>.tex`
2. Confirm page count is exactly 1 and compile succeeded
3. Read the PDF via the Read tool and visually check: signature fits at the bottom, no text cut off, bullet font matches body

### Known template pitfall: itemize inside `\lettercontent{}`

The `\lettercontent{}` macro appends `\\` to its argument. This breaks when the argument ends in `\end{itemize}` because `\\` has no line to break after the environment closes, producing `! LaTeX Error: There's no line here to end.` and no PDF output.

**Wrong (breaks compile):**
```latex
\lettercontent{Here is how my experience maps:
\begin{itemize}
    \item ...
\end{itemize}}
```

**Correct — close `\lettercontent{}` before the list and wrap the list in the matching Raleway-Medium font so typography stays consistent:**
```latex
\lettercontent{Here is how my experience maps:}

{\raggedright\fontspec[Path = OpenFonts/fonts/raleway/]{Raleway-Medium}\fontsize{11pt}{13pt}\selectfont
\begin{itemize}
    \item ...
\end{itemize}\par}
\vspace{6pt}

\lettercontent{[next paragraph]}
```

The font wrapper is mandatory — if you just move `\begin{itemize}` outside `\lettercontent{}` without the `\fontspec` block, bullets render in the default body font (Lato) and visually mismatch the rest of the letter.

## Document Structure

```latex
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Cover Letter - [Company], [Role]
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\documentclass[]{cover}
\usepackage{fancyhdr}

\pagestyle{fancy}
\fancyhf{}

\rfoot{Page \thepage \hspace{0pt}}
\thispagestyle{empty}
\renewcommand{\headrulewidth}{0pt}
\begin{document}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     TITLE NAME
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\namesection{}{\Huge{Jose Gerardo Mart\'inez Mor\'an}}{  \href{mailto:geramtz100@gmail.com}{geramtz100@gmail.com} | (+52) 871-310-7796 |  \urlstyle{same}\href{https://www.linkedin.com/in/geramoran/}{LinkedIn}
}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     MAIN COVER LETTER CONTENT
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\currentdate{\today}
\lettercontent{Dear [Name/Team],}

\lettercontent{[Opening paragraph - role, connection to background, 2-3 sentences]}

\lettercontent{[Body paragraph - most relevant experience, introducing the bullet list]}

{\raggedright\fontspec[Path = OpenFonts/fonts/raleway/]{Raleway-Medium}\fontsize{11pt}{13pt}\selectfont
\begin{itemize}
    \item {[Concrete achievement/skill 1]}
    \item {[Concrete achievement/skill 2]}
    \item {[Concrete achievement/skill 3]}
\end{itemize}\par}

\lettercontent{[Connection to company - why this role, why this company specifically]}

\lettercontent{[Personal fit paragraph - behavioral strengths, team contribution, 2-3 sentences]}

\lettercontent{I look forward to hearing from you.}

\begin{flushright}
% No trailing \\ inside \closing{} - cover.cls appends its own \\, and a
% doubled break triggers "! LaTeX Error: There's no line here to end."
\closing{Kind regards,}

\signature{Jose Gerardo Mart\'inez Mor\'an}
\end{flushright}
\end{document}
```

## Key Commands Reference

| Command | Purpose |
|---------|---------|
| `\namesection{}{Name}{contact info}` | Header with name and contact |
| `\currentdate{date}` | Date field (use `\today` or explicit date) |
| `\lettercontent{text}` | Body paragraph (adds spacing after) |
| `\closing{text}` | Closing line |
| `\signature{name}` | Printed name below signature |

## Tailoring Guidelines

### Salutation
- If you know the hiring manager's name: "Dear [First Last],"
- If you know the team: "Dear [Company] hiring team,"
- Generic: "Dear [Company]," (avoid "To whom it may concern")

### Length - Hard 1-Page Limit
- Target: 1 page including signature block
- Maximum: **never exceed 1 page**
- **Word budget: 250-300 words** of body text (not counting LaTeX markup). This is the safe maximum. 350 words will overflow.
- **Always count**: opening paragraph + bullet list paragraph + closing paragraph = 3 blocks. Add a 4th only if the others are short.
- When adding company-specific content, trim other content to compensate rather than adding net length

### Line Spacing
- Add `\usepackage{setspace}` and `\setstretch{1.0}` if the letter is long and needs to fit on one page
- Use `\vspace{.5cm}` between major sections for readability (only if space permits)

### Bullet Lists
- Place `\begin{itemize}...\end{itemize}` **outside** a `\lettercontent{}` block (see "Known template pitfall" above), wrapped in the matching Raleway-Medium `\fontspec` so the bullet font matches the body
- 3-5 bullets is ideal
- Start each bullet with bold label or action verb
- Use `\textbf{Label:}` for category-style bullets
- A bullet whose text begins with a literal `[` must be braced: `\item {[text]}`. Unbraced, LaTeX parses `[text]` as `\item`'s optional label and renders it off the left page edge, missing from the PDF text layer entirely

### LaTeX Special Characters
Escape these wherever they appear in body text:
- Ampersand: `\&` (company names: Brüel \& Kjær, H\&M) - unescaped, the compile fails loudly
- Percent: `\%` ("grew revenue 30\%") - unescaped, it does **not** fail: everything after the `%` on that line is silently eaten as a LaTeX comment
- Dollar: `\$`, hash: `\#`, underscore: `\_`
- Tilde: `\textasciitilde{}`, caret: `\textasciicircum{}`, backslash: `\textbackslash{}`

### Non-English Cover Letters
- Same template structure, just write content in the posting's language
- Adjust date format to local convention
- Adjust closing to local convention

**Spanish (Mexico) conventions for this candidate** — most postings will be in Spanish:
- Salutation: `Estimado equipo de [Empresa],` or `Estimada [Nombre],` when the contact is known. Avoid `A quien corresponda`.
- Closing: `Saludos cordiales,` (neutral professional) or `Quedo atento a sus comentarios.` before the closing line. Avoid the stiff `Atentamente` unless the company's own tone is formal.
- Date: `\currentdate{10 de agosto de 2026}` — lowercase month, no comma before the year.
- Use `usted`, never `tú`, unless the company's careers page is visibly informal.
- Accents must be escaped or the file compiled with proper UTF-8 handling under XeLaTeX: `\'a \'e \'i \'o \'u \~n` are always safe.

## Checklist Before Finalizing
- [ ] No em-dashes (use commas or periods instead)
- [ ] No cliches or empty filler
- [ ] Every claim backed by specific example
- [ ] Forward-looking framing: focuses on tasks you'll solve, not just past duties
- [ ] Motivation section references this specific company's mission/values
- [ ] Company name and role are correct throughout
- [ ] Date is current
- [ ] Fits on one page
- [ ] Language matches the job posting language
- [ ] Salutation is appropriate (named person if possible)
- [ ] Headline is engaging and specific, not generic

## Submission Guidelines (Best Practice)
- Submit only the documents the employer requests
- Export as PDF to preserve formatting
- Name files clearly: "[Your Name] CV" and "[Your Name] Cover Letter"
- Follow all employer instructions regarding anonymity or specific materials

## Established Body Structure (extracted from archived letters)

<!-- Added by /setup Path A on 2026-08-21 from cover_letters/cover_prospera_ai_backend_engineer.tex, -->
<!-- cover_letters/cover_teradata_ai_data_engineer.tex, and the plain-text variant archived in -->
<!-- documents/applications/prospera_ai_ai_backend_engineer/application_form_2026-08-13.md -->

Three letters, one repeated skeleton. Follow it unless the posting demands otherwise. See
`03-writing-style.md` "Patterns Observed in Past Applications" for the voice-level detail.

```
1. Salutation
2. Opening      - role named in the first clause, then straight to the AI orchestration
                  layer at MySourcing, framed against THEIR product. Add the GMT-6 /
                  remote-delivery line if the role is remote.
3. Bridge       - "Here is what I would bring to the areas the role covers:"
4. Itemize      - exactly 3 bullets, bold labels lifted from the posting's own headings
5. GAP PARAGRAPH - see below. This is the signature move; do not drop it.
6. Company      - one independently verified, dated fact + why this role specifically
7. Method       - Claude Code + spec-driven development, tied to a need they stated
8. Close        - "I look forward to hearing from you." / "Kind regards,"
```

### The gap paragraph (mandatory for this candidate)

Every archived letter names what he does not meet, in its own paragraph, before the company paragraph.
The formula:

> "[One/Two] [must-have/requirement(s)] I do not meet, stated plainly. **[The gap, named exactly.]**
> [Why it is adjacent rather than absent - what he *does* have that borders it.] [Closing line that makes
> the disclosure a service to the reader.]"

Worked examples:

> "One must-have I do not meet, stated plainly. My four production years are in TypeScript and Node.js, not
> Python, so the Python bar is a language gap rather than an architecture one; my Python is agent
> development through LangChain and LangGraph. I have not shipped RAG or vector search either, though
> PostgreSQL is my strongest data skill and pgvector runs on ground I know. Better you hear both from me
> now than find them in the take-home."

> "Two requirements I do not meet, stated plainly. I have not run data processing at scale on parallel
> frameworks such as Spark or Kafka; my throughput work was queue-based asynchronous processing and query
> tuning. And my AI experience is orchestration, not MLOps: I have shipped LLM applications, never trained,
> fine-tuned or served models. Both are adjacent to what I do rather than repeats of it, and I would rather
> you knew now than found out in the first sprint."

**Why this earns its space on a one-page letter:** the rest of the letter makes strong claims, and this
paragraph is what makes them credible. It also pre-empts the exact objection a screener would raise, on his
terms rather than theirs. Cap it at two gaps: three starts reading as a disqualification, and a letter that
needs three is a signal to re-check the fit score before drafting at all.

**Do not soften it into a strengths paragraph.** "While I have limited exposure to X, I am a fast learner"
is the failure mode. Name the gap, draw its boundary, stop.

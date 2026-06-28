# Tremora — Cursor Prompt Sequence

A copy-paste, in-order prompt sequence for building the Tremora marketing website in Cursor. Feed prompts one at a time, in order. Review and accept each before moving to the next. Each prompt recaps just enough context so Cursor stays anchored.

**Stack assumption:** Next.js (App Router) + TypeScript + Tailwind CSS. Swap if you prefer something else.

---

## Brand & guardrails (read once, don't paste)

**Color system** — sampled from the logo, white background.

| Token | Hex | Role |
|---|---|---|
| `green-600` (primary) | `#3DA035` | Primary brand: headings accents, primary buttons, the "T" stem feel |
| `green-700` | `#2F8129` | Hover/pressed primary |
| `green-50` | `#EEF7EC` | Soft section tints |
| `red-500` (accent) | `#E5322A` | Reserved accent: logo, the tulip motif, ONE hero CTA, sparing highlights |
| `red-50` | `#FCEDEC` | Rare alert/highlight tint |
| `ink` (text) | `#16201A` | Body/heading text (warm near-black, slight green cast) |
| `slate-500` | `#5B6660` | Secondary text |
| `border` | `#E6EAE7` | Hairlines, card borders |
| `bg` | `#FFFFFF` | Page background (white, locked) |

Rule: **green is primary, red is a scalpel.** Don't paint buttons red by default — red is for the brand mark, the tulip, and at most one hero call-to-action. Everything stays on white with generous whitespace.

**Hard content guardrails (bake into every content prompt):**
- Model accuracy is stated **only** as "86.4% (cross-validated)." Never round up, never write "~90%," "high accuracy," or "industry-leading accuracy."
- **Never** claim or imply FDA clearance/approval. The device is investigational. If regulatory is mentioned at all, say it is in development. Prefer to omit.
- Do **not** publish internal-only material: bill of materials / COGS, the "hardware is the moat" strategy framing, exact ML node thresholds, pin maps, individual contact names, or firmware internals.
- Tone: clinical, calm, credible. Selling to **neurologists**, not consumers. No hype, no emojis, no fake testimonials or fabricated stats.

---

## Prompt 0 — Project setup & design foundation

```
You are helping me build the marketing website for Tremora, a medical-device + software
startup. Tremora is a wrist-worn device that continuously measures hand tremor for
Essential Tremor and Parkinson's Disease patients, and feeds a clinician-facing dashboard.
The audience for this site is neurologists and clinical/research partners — keep the tone
clinical, calm, and credible. No hype, no emojis.

Set up a Next.js (App Router) + TypeScript + Tailwind CSS project (skip if already set up).

Then establish the design system. Background is always white. Configure Tailwind theme
tokens exactly:
- green-600 #3DA035 (PRIMARY), green-700 #2F8129 (hover), green-50 #EEF7EC (tint)
- red-500 #E5322A (ACCENT only), red-50 #FCEDEC
- ink #16201A (text), slate-500 #5B6660 (secondary text), border #E6EAE7
- white #FFFFFF page background

Color usage rule: green is the primary brand color (primary buttons, accents, links).
Red is a reserved accent for the logo, a tulip motif, and at most one hero CTA — never
the default button color. Use lots of whitespace.

Typography: a clean, modern sans for body (Inter), and a slightly more characterful sans
for headings is fine. Set a clear type scale and comfortable line-heights. Set ink as
default text color.

Build the persistent layout shell only in this step:
- A sticky top nav: left = Tremora wordmark + logo placeholder (I'll drop in an SVG),
  right = anchor links (Problem, Product, Dashboard, For Practices, About) and one primary
  CTA button "Request a demo".
- A footer: short tagline, nav links, and a contact email placeholder. Keep it minimal.
- A responsive container width and consistent vertical section spacing utility.

Don't build page sections yet. Just the tokens, fonts, nav, footer, and a blank home page
that renders them.
```

---

## Prompt 1 — Hero

```
Build the hero section of the Tremora home page.

Headline concept: Tremora is the continuous, objective measurement layer for movement
disorder care. The core idea: neurologists today rate tremor for a few minutes per visit,
every few months, on a subjective scale — Tremora replaces that snapshot with a continuous
record. Lead with the SOFTWARE/data story; the wrist device is how the data is captured.

Write a strong, restrained headline and one-sentence subhead in this spirit (you may
refine the wording):
- Headline: "Continuous, objective tremor data for movement disorder care."
- Subhead: "Tremora turns day-to-day hand tremor into clinical-grade data your neurology
  practice can act on — mapped to the rating scales you already use."

Primary CTA: "Request a demo" (green primary button). Secondary CTA: "See how it works"
(text/ghost link that scrolls to the next section). You may use a single red accent here
(e.g., a small tulip-derived mark or an underline), but keep the CTA buttons green.

On the right, leave a clean placeholder card/frame for a product visual (the dashboard
screenshot or device render) — use a simple bordered rounded container with a subtle
green-50 background, no stock imagery. White background, generous spacing, fully responsive.
```

---

## Prompt 2 — The problem

```
Add a "The problem" section below the hero.

Content (paraphrase, keep it clinical and concise):
- Movement disorders like Essential Tremor and Parkinson's are defined by tremor that
  varies hour to hour and day to day.
- Today, that tremor is assessed for a few minutes per clinic visit, every few months,
  using a subjective rating scale.
- That snapshot misses the variation that determines whether a medication is actually
  working.

Present it as a short lead paragraph plus three compact supporting points (e.g.,
"Infrequent", "Subjective", "Snapshot, not signal"). Use restrained iconography (simple
line icons, green or ink — not red). White background, clear hierarchy. Do not invent
statistics or cite studies.
```

---

## Prompt 3 — How it works

```
Add a "How it works" section: a clean 3-step horizontal flow (stacks vertically on mobile).

Step 1 — Capture: A lightweight wrist-worn device records motion continuously and scores
tremor on-device (frequency, amplitude, severity). A button lets the patient mark when they
take medication.

Step 2 — Quantify: Tremora measures the tremor's frequency, amplitude, and severity over
time — not just whether tremor is present — and maps it to the clinical scales neurologists
already document (Tremora Severity Index (TSI) for Parkinson's, TETRAS for Essential Tremor).

Step 3 — Act: The data flows to a clinician dashboard showing how tremor moved over hours
and days, including around medication events, so treatment can be tuned with evidence.

Use a numbered step layout with the green as the connective/accent color. Keep copy tight.
Do NOT include firmware internals, pin maps, sample rates, or BOM details — this is a
public page.
```

---

## Prompt 4 — The dashboard (the product)

```
Add a "Dashboard" showcase section. The dashboard is the hero product, so give it room.

Lead line: "The continuous record, in the language clinicians already use."

Describe (as feature cards or an alternating feature/visual layout) what the dashboard
shows:
- Tremor frequency over time
- Amplitude / severity trend over time
- Tremora Severity Index (TSI) severity (0–4) as a clinician-facing summary line, not clinically validated
- Medication events overlaid as markers, so tremor change can be read against dose timing
- A guided spiral-tracing task that quantifies tremor during a controlled fine-motor task
  (familiar from clinic)

For each, a short clinical benefit line. Include a large placeholder frame for a dashboard
screenshot (bordered, rounded, subtle green-50 fill, labeled "Dashboard preview"). Charts
can be represented as simple placeholder SVGs using green as the line color and a single
red marker for medication events. White background. Keep it credible, not flashy.
```

---

## Prompt 5 — Differentiation

```
Add a "Why Tremora" / differentiation section contrasting Tremora with consumer wearables.

Core point (paraphrase): Consumer wearables can flag that a tremor exists — a binary
signal. Tremora measures how fast, how strong, and how severe the tremor is, over time,
and maps it to Tremora Severity Index (TSI) and TETRAS.

Present as a simple two-column comparison (Consumer wearable vs. Tremora) or a clean
"binary vs. quantified" visual. Use green checks for Tremora's column; keep red out of
this except possibly a single muted accent. Don't name or disparage specific competitor
brands beyond a generic "consumer wearables." No fabricated benchmarks.
```

---

## Prompt 6 — Credibility / validation strip

```
Add a compact credibility section.

Include, stated EXACTLY and conservatively:
- "Classifier validated at 86.4% accuracy (cross-validated on a public physiological
  dataset)." Use this figure verbatim. Never round up or restate it as higher.
- Tremora is built around remote patient monitoring, a reimbursable clinical service.
- Designed to map to Tremora Severity Index (TSI) and TETRAS.

Do NOT claim FDA clearance or approval. If you reference regulatory status at all, say it
is in development / investigational, or omit entirely. Present as a quiet, confident strip
of 3 short stat/claim cards on white. No logos of institutions we don't have permission
to show.
```

---

## Prompt 7 — For practices (business model)

```
Add a "For neurology practices" section aimed at the B2B buyer.

Content (paraphrase, professional tone):
- Tremora is sold to neurology practices. Patients wear the device at home; data flows to
  the practice's dashboard.
- Remote patient monitoring of these patients is a reimbursable, recurring clinical service
  under Medicare RPM.
- The practice gets both better between-visit care and a new reimbursable service line;
  the patient gets continuous monitoring and better-tuned treatment.

Do NOT publish exact internal pricing, COGS, margins, or fundraising numbers. You may
describe the model qualitatively (one-time device + recurring monitoring) without dollar
figures. End with a primary green CTA "Talk to our team". Clean, business-like layout.
```

---

## Prompt 8 — About / mission

```
Add a short "About" / mission section.

Mission (paraphrase): give every person with a movement disorder, and the neurologist
treating them, an objective, continuous record of tremor so treatment decisions are based
on data instead of a single clinic snapshot.

Vision line: become the default measurement layer for movement disorder care — the way
continuous glucose monitoring became the default for diabetes.

Keep it to a tight mission statement plus the vision analogy. Mention Tremora is a
founder-led startup if useful, but do NOT list individual team-member names, titles, or
contacts. White background, centered, restrained.
```

---

## Prompt 9 — Final CTA + contact

```
Add a closing call-to-action band and a contact block above the footer.

CTA band: a full-width section with a green-50 (or solid green-600 with white text)
background — this is a good place for the ONE bold use of color. Headline like "Bring
continuous tremor data into your practice." Primary CTA button "Request a demo".

Contact block: a simple form (Name, Email, Practice/Organization, Message) with a green
submit button. Wire it to a placeholder handler / mailto for now and leave a clear TODO
comment for backend integration. Include a contact email placeholder. No social proof or
testimonials unless I provide real ones.
```

---

## Prompt 10 — Polish, responsiveness, accessibility, SEO

```
Do a polish pass across the whole Tremora site:

1. Responsive: verify every section looks correct at mobile (375px), tablet, and desktop.
   Fix any overflow, cramped spacing, or broken stacking.
2. Accessibility: semantic landmarks, proper heading order, alt text on placeholders,
   visible keyboard focus states (green focus ring), and check color contrast — especially
   any white-on-green or red text meets WCAG AA.
3. Motion: add subtle, tasteful scroll-in fade/slide for sections (respect
   prefers-reduced-motion). Nothing flashy.
4. Nav: make anchor links smooth-scroll and highlight the active section.
5. SEO/meta: set page title, meta description, Open Graph tags, and a favicon placeholder
   (I'll supply the tulip-T logo SVG). Title concept: "Tremora — Continuous tremor data
   for movement disorder care."
6. Final color audit: confirm green is doing the primary work and red appears only as the
   logo, the tulip motif, and at most one or two intentional accents. Flag any place red
   crept in as a default.

Report what you changed.
```

---

## After the sequence

- **Drop in the real logo:** export the tulip-T as an SVG and replace the nav/footer/favicon placeholders. Ask Cursor: *"Replace the logo placeholders with this SVG and derive the favicon from it."*
- **Real visuals:** swap the dashboard and device placeholder frames for real screenshots/renders when you have them.
- **Reconcile the brand:** your master context doc still says magenta/teal. Update it to red/green/white so future AI retrieval doesn't reintroduce the old palette.
- **Backend:** the contact form is a placeholder — wire it to a form service (Formspree, Resend, or an API route) before launch.

> Tip: if Cursor ever drifts from the palette or inflates a claim, paste the relevant guardrail block back in. Reminding it of "green primary / red accent only" and "86.4% cross-validated, never inflated" keeps it on rails.

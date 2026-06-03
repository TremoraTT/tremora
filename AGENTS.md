# AGENTS.md — Tremora marketing site

Handoff context for any LLM/agent (Claude, Codex, Cursor, etc.) continuing this
project. Everything needed to build, run, deploy, and extend the site is here.

## What this is

Marketing/landing site for **Tremora** (a.k.a. TremoTrack): a wrist-worn sensor
that tracks Parkinson's tremor severity 24/7, scores it on-device with a trained
classifier, and surfaces the data to neurologists. Single-page scrolling site.

- **Live:** https://vishwasvijayabaskar-code.github.io/tremora/
- **Repo root:** `~/projects/tremora`

## Stack (IMPORTANT — do not assume otherwise)

- **React 19 + Vite 8**, plain **JSX** (NOT TypeScript).
- **Inline styles** everywhere. NO Tailwind, NO CSS Modules, NO shadcn/ui.
  Design tokens are CSS custom properties in `src/styles/variables.css`,
  referenced as `var(--token)` inside inline `style={{}}` objects.
- **GSAP + ScrollTrigger** for entrance/scroll animation.
- **Lenis** smooth scroll, wired to ScrollTrigger in `src/hooks/useLenis.js`
  (duration 1.0). **Do not change the Lenis↔ScrollTrigger wiring** — it's correct.
- **Swiper 12** for the Device card deck (EffectCards) and Roadmap carousel.
- **Three.js + @react-three/fiber + drei** — only `ChromeObjects.jsx` (hero
  floating chrome shapes).
- **@splinetool/react-spline** — optional hero 3D scene (`SplineScene.jsx`); see
  "Deferred / open tasks".

When adapting any shadcn/Tailwind/TS component snippet: strip the Card/`cn`/
Tailwind classes and rewrite as JSX + inline styles using the tokens below.

## Run / build / deploy

```bash
cd ~/projects/tremora
npm install          # if node_modules missing
npm run dev          # http://localhost:5173/tremora/   (base path is /tremora/)
npm run build        # production build -> dist/
npm run deploy       # builds + publishes dist/ to the gh-pages branch (gh-pages pkg)
git push origin main # push source
```

- Vite `base: '/tremora/'` (project Pages site). Routes/assets are under `/tremora/`.
- **GitHub Pages source MUST be the `gh-pages` branch** (Settings → Pages, or
  `gh api -X PUT repos/<owner>/tremora/pages -f 'source[branch]=gh-pages' -f 'source[path]=/'`).
  If Pages serves `main`, the site shows raw Vite source (`/src/main.jsx`) and is broken.
- After `npm run deploy`, Pages rebuilds in ~1 min.

## Design system — Industrial Brutalism / Swiss Tactical Telemetry

Tokens in `src/styles/variables.css`. Carbon ink on unbleached paper, ONE hazard
accent. Square corners (all `--radius-*` are 0). Hairline borders. Film grain
(`body::after` in `src/index.css`).

- Substrate: `--paper #F4F4F0`, `--paper-2 #EAE8E3`, ink `--ink #0A0A0A`,
  `--ink-2 #161616`, `--ink-3 #242424`.
- Accent (only one): `--hazard #E61919`, `--hazard-2 #FF2A2A`.
- Hairlines: `--line`, `--line-strong`, `--line-light` (on dark).
- Fonts: `--font-display 'Archivo Black'` (macro headers, uppercase, tight),
  `--font-sans 'Space Grotesk'` (body), `--font-mono 'JetBrains Mono'` (telemetry
  labels — use `className="mono-label"`), `--font-serif 'Playfair Display'` (rare).
- Motion: `--ease cubic-bezier(0.625,0.05,0,1)` (house ease).
- Legacy aliases (`--coral`, `--cream`, `--dark`, etc.) are remapped onto the new
  palette so older code never renders pastel. Prefer the new tokens for new code.

Section rhythm: light sections (`--paper`/`--paper-2`) alternate with solid ink
sections (HowItWorks, Features, CTA, Marquee) as deliberate blackout panels.
Each section opens with a `[ NN / LABEL ]` mono eyebrow (numbered 01→08 in DOM order).

## File map

```
src/
  main.jsx            entry; imports swiper css + index.css
  index.css           global base, font imports, grain, mono-label, responsive
  App.jsx             section order + global layers (CustomCursor, Navbar, BendScroll)
  styles/variables.css  design tokens
  hooks/
    useLenis.js       Lenis + ScrollTrigger wiring (DO NOT alter the wiring)
    useCountUp.js     IntersectionObserver count-up for stats (parses prefix/suffix/commas)
  components/
    Navbar.jsx        fixed top bar; CSS navIn keyframe (no gsap flash). Mobile: .nav-text-links hidden <768px
    CustomCursor.jsx  sensor-reticle cursor (spins, locks on hover). Hidden on touch.
    Button.jsx        H&K-style hover: label flips to a duplicate + sliding arrow. Class .tm-btn, variants primary/secondary/dark
    Reveal.jsx        IntersectionObserver entrance (variant: fade | mask | lines). NOT ScrollTrigger (won't touch pins)
    Slider.jsx        shared Swiper arrows (drive via onSwiper instance) + injectSliderCSS()
    Placeholder.jsx   brutalist media slot "[ LABEL ]" — swap for <img> when assets exist
    Marquee.jsx       mono ticker strip (ink)
    ChromeObjects.jsx Three.js floating chrome shapes (hero ambient 3D)
    SplineScene.jsx   lazy Spline 3D (see Deferred tasks)
    LedGrid.jsx       SAVED, currently UNUSED. Sitewide fixed LED dot-matrix bg with
                      gliding shapes (O/T/X/triangle/square, max 3, drift + respawn).
                      To re-enable: import + render <LedGrid/> in App.jsx AND set the
                      light sections' background to 'transparent' (Hero/Problem/Device/
                      Team/Roadmap/Privacy). It's kept for background experiments.
    BendScroll.jsx    scroll-driven convex "bend toward you": center section = full
                      scale, edges recede (DEPTH = 0.09). Transform-only. Excludes
                      #top (hero) and #features (pinned/sticky) so it can't break layout.
    PerspectiveHighlight.jsx  Perspective (cursor tilt) + Highlight (lifting pill). Used in Hero subtitle.
    PerspectiveTilt.jsx        legacy card tilt (currently unused).
  sections/
    Hero.jsx          chrome sliced-letter wordmark (assets/title/l0-l6.webp) + flip/float
                      entrance + ChromeObjects + count-up proof strip + CTAs. No scroll icon.
    Problem.jsx       01 — telemetry stat grid (count-up) + animated waveform compare (canvas)
    HowItWorks.jsx    02 — 3 bordered steps + DASHBOARD Placeholder + SVG visuals
    Features.jsx      03 — "Six systems" = CSS position:sticky flashcard stack (6 panels).
                      NOTE: deliberately CSS sticky, NOT a GSAP pin — the GSAP pinned
                      version kept rendering cards off-screen. Do not "upgrade" it back to a pin.
    Device.jsx        04 — Swiper EffectCards component deck + DEVICE RENDER Placeholder + price cells
    Team.jsx          05 — narrative + mono proof-point list + TEAM PHOTO Placeholder
    Roadmap.jsx       06 — Swiper carousel of milestones + hazard progress scrollbar (no global counter)
    Privacy.jsx       07 — 4-cell privacy grid
    CTA.jsx           08 — waitlist email form + traction trust row + footer
  assets/title/l0..l6.webp   the 7 sliced chrome "Tremora" letters
research/             site teardown docs (Hildén & Kaira reference)
```

## Hero chrome wordmark (how the letters are made)

The hero title is a glossy-chrome "Tremora" render sliced into 7 contiguous letter
PNGs→WebP (`src/assets/title/l0..l6.webp`), laid in a gap-0 flex row so they
reconstruct the word while each animates independently. To regenerate from a new
chrome render: key the off-white background to transparent via color-distance
(preserves specular highlights), find content bbox, cut at letter boundaries
(coverage-profile valleys for T·r·e·m·o·r·a), export 7 contiguous WebP at ~560px
tall. (Done previously with Python + Pillow.)

## Gotchas / hard-won lessons

- **Screenshots of the running site hang** (the Chrome extension waits for
  `document_idle`, which never fires because Lenis (gsap.ticker rAF) + Three.js
  run continuously). Verify via DOM/computed-style probes (`javascript_tool`),
  not screenshots. The gstack `browse` headless binary also failed to connect here.
- **Don't reintroduce a GSAP `pin` for the Features panels.** CSS `position:sticky`
  is the working solution; the pin version put cards off-screen 3×.
- **Don't transform an ancestor of a pinned/fixed element** — that's why BendScroll
  excludes #features and #top.
- **gh-pages Pages source** must be the `gh-pages` branch (see Deploy).
- npm registry was intermittently unreachable in the build environment; if
  `npm install` fails with TLS/network errors, retry.

## Deferred / open tasks

1. **Enable Spline hero 3D** (if not already done): `npm install
   @splinetool/react-spline @splinetool/runtime`, then in `Hero.jsx` import
   `{ SplineScene }` from `../components/SplineScene` and render it in place of (or
   beside) `<ChromeObjects/>`, e.g. an absolute right-side accent:
   `<SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" style={{width:'100%',height:'100%'}} />`.
   The demo scene is a robot — consider a scene that fits a clinical brand.
2. **Verify factual claims before any public/clinical use:** "Saez et al. ELENA
   methodology", "86.4% classifier accuracy", "Pilot study in discussion with UNC
   Chapel Hill neurology". These are in `Team.jsx` / `Device.jsx` / `Hero.jsx`.
   Tremora is pre-clinical, not FDA-cleared — keep that disclaimer (CTA/Privacy).
3. **Real assets** to replace `Placeholder` blocks: neurologist dashboard
   screenshot (HowItWorks step 3), device render (Device), team photo (Team).
4. Optional polish: tune bend strength (`BendScroll.jsx` DEPTH), sticky panel
   pacing (Features panel heights), background experiments (re-enable/replace LedGrid).

## Commit / deploy conventions

- Conventional-ish commit subjects; co-author trailer:
  `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>` (adjust model as needed).
- Ship loop: `npm run build` (must be clean) → commit → `npm run deploy` →
  `git push origin main`.

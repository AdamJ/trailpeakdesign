# Trail Peak Design System

An outdoor-themed design system for portfolio, marketing and app surfaces by Adam Jolicoeur. Clean, editorial layouts with a warm earthen palette, subtle animations, and a quiet reverence for type.

> **Tagline vibe:** "Follow the trail. Pitch the tent. Ship the work."

## Who / what it covers

Trail Peak supports a small family of surfaces built and maintained by Adam Jolicoeur (AdamJolicoeur.com):

- **Portfolio & marketing site** — long-form case studies, blog, and links.
  - [marketing](/ui_kits/marketing_site/index.html)
  - [previews](/PREVIEWS.md)
- **Companion iOS apps** — Time Tracker Pro, The Magic Collection, etc. Same color / type foundations, native controls.
  - [iOS](/ui_kits/ios_app/index.html)
- **Social / share cards** — 1600×1200 posters using display type and product screenshots.

## Index

- `colors_and_type.css` — all tokens (colors, type, spacing, radii, shadows, easing)
- `fonts/` — Playfair Display, Inter, Fira Code, Pirata One (all local TTF, variable where applicable)
- `assets/` — logo, icons, placeholder imagery
- `preview/` — per-token preview cards (rendered in the Design System tab)
- `ui_kits/marketing_site/` — click-thru recreation of the portfolio / marketing site
- `SKILL.md` — agent entry point

## Sources

- **Figma** — _Trail Peak Design Library_ (mounted virtual FS). Pages: Cover, Badge, Buttons, Cards, Code, Divider, Footer, Icons, Link, List, Navigation, Page, Sections, Texts, Social.
- **GitHub** — `AdamJ/trailpeakdesign` (private; App install was prompted but not completed this session — I worked from Figma + uploaded assets).
- **Uploads** — `uploads/Jolicoeur_Icon-App-iTunes.png` (the triangular mark, now at `assets/logo-app-icon.png`).

The Figma pseudocode was the source of truth for colors, type, spacing, and component structure. Phosphor (the "v7-icon free" family) is the icon set used in Figma — I reference it from the Phosphor CDN rather than re-drawing SVGs.

---

## Content fundamentals

**Voice: grounded, practical, a little wry.** Writes like someone who has packed the bag, set the tent, and shipped the thing. Short clauses. Occasional dry metaphors borrowed from the outdoors. Not precious.

- **Pronouns:** "I" when it's Adam's work, "you" to the reader. Avoid corporate "we" unless describing a team.
- **Casing:** Sentence case for UI ("Read more", "Get in touch"). Title Case for proper nouns and product names only.
- **Emoji:** None in product UI. Occasional in casual writing or social posts, but the design system itself is emoji-free.
- **Punctuation:** Em dashes are encouraged. Oxford commas always. Avoid exclamation marks.
- **Numbers:** Spell out one-to-nine in prose; figures for 10+ and for stats.
- **Links:** Verbs, not "click here" — "_Read the case study_", "_Download the PDF_".
- **Headlines:** Serif, declarative, short — "Design for the field." "Built for long seasons." Not hype-laden.
- **Microcopy examples:**
  - Primary CTA: _Start a project_, _Read the case study_, _See the work_
  - Empty state: _Nothing here yet — pitch your first note above._
  - Error: _That didn't take. Try again in a moment._

---

## Visual foundations

**Palette — earth and trail.**
Every screen sits on a cream (`#F5F1E8 / earth-sand`) with deeper browns for text and borders and a single burnt-orange accent (`#D35F3D / trail-clay`) for interaction. Green (`#5A6B4F / trail-moss`) is a secondary accent reserved for subdued navigation elements, code outlines, and secondary-button shadows. Black is avoided — the darkest ink is `#2D1F12 / earth-soil`, a near-black brown that feels warmer on cream.

**Backgrounds.**

- Primary: flat cream (`--bg-page`), never pure white.
- Secondary pages and hero moments: vertical gradient `earth-sand → earth-dune` (top-to-bottom).
- Dark examples: solid `earth-soil`, with cream text on top.
- No noise / grain applied globally. No photographic hero backgrounds.
- Imagery, when present, is warm-toned (sunrise / dusk / campfire casts) — never cool or b&w.

**Typography.**

- **Display** — `Pirata One` at 80–96px for oversized poster moments (social cards, landing hero headlines). Letter-spacing +2px.is the desired display face or swap.\*
- **Serif** — `Playfair Display` (SemiBold, Bold) for H1–H3. Warm, editorial.
- **Sans** — `Inter` 400/600/700 for body, H4–H6, UI.
- **Code** — `Fira Code` 400 for inline and block code.

**Spacing.** 4px base. Most used: 4, 8, 12, 16, 20, 24, 32, 48, 80. Generous vertical rhythm — sections breathe, lists don't cram.

**Borders.** Everything uses a 1px `earth-bark` hairline; dashed purple borders in Figma are layout-only (never render). Cards and buttons have crisp 1px strokes.

**Corner radii.**

- Buttons `12px` (`--radius-lg`)
- Cards & surfaces `20px` (`--radius-xl`)
- Small chips/code `8px` (`--radius-md`)
- Badges `pill / 999px`

**Shadow system — offset "sticker" drops, not blur.**
The signature visual move: flat, offset box-shadows that look like stacked paper. Two variants:

- `4px 4px 0 0 earth-bark` — resting buttons / small cards
- `8px 8px 0 0 rgba(45,31,18,0.25)` — default card resting
- `12px 12px 0 0 rgba(45,31,18,0.25)` — card hover (shadow _grows_ instead of lifts)
- Layered moss + bark double-drop for the "Open Source" hero card (`12px 12px 0 5px bark, 12px 12px 0 0 moss`)

Never use blurry elevation shadows — they fight the paper-sticker aesthetic.

**Hover / press states.**

- **Hover:** accent color swaps (primary button keeps fill, text tints to `earth-dune`; secondary button swaps `sand → tan`; nav link underlines `trail-clay`; card grows its shadow by 4px).
- **Press:** shadow collapses to `2px 2px 0 0` — the surface "settles into the paper".
- Never opacity-fade; always a deliberate color or offset change.

**Motion.** Short, unhurried. 120–360ms with `cubic-bezier(.22, .61, .36, 1)`. Fade + small translate, no bounces. The experience should feel like pages in a field notebook — turned, not flipped.

**Transparency / blur.** Only on `btn-outline` — `backdrop-filter: blur(24px)` for a light, tactile outline pill. Otherwise opaque.

**Layout rules.**

- Desktop canvas 1728px wide in Figma; design against 1200px content width with 160px side gutters on landing pages.
- Centered, single-column hero with caption + display type + primary card.
- Footer is full-width on `earth-soil`.

---

## Iconography

- **System:** [Phosphor Icons](https://phosphoricons.com/) — the Figma library's "v7-icon (free)" component is the Phosphor set. Preferred weights: **Regular** for reading/UI, **Fill** for solid emphasis (badges, nav accents).
- **Delivery:** CDN — `<script src="https://unpkg.com/@phosphor-icons/web"></script>`, then `<i class="ph ph-compass"></i>` or `<i class="ph-fill ph-tent"></i>`.
  - If substitution flagged: the Figma set is custom-named (`Name=tent`, `Name=compass`, `Name=map`, `Name=fire`, `Name=user`, `Name=arrow-*`) but the glyphs match Phosphor 1:1.
- **Logo / brand mark:** `assets/logo-app-icon.png` — the triangular monogram. Use at ≥48px.
- **Unicode chars:** avoid. Prefer Phosphor glyphs for caret, arrow, check, close.
- **Emoji:** not used in product UI.
- **Size scale:** 16, 20 (default), 24, 32, 48. Stroke color always matches text.

---

## Repository index

```mermaid
/
├── README.md                        ← you are here
├── PREVIEWS.md                      ← preview index
├── SKILL.md                         ← Agent Skills entry (user-invocable)
├── colors_and_type.css              ← tokens + semantic type classes
├── assets/
│   └── logo-app-icon.png            ← triangular monogram
├── preview/                         ← design-system token previews
│   ├── preview.html                 ← index
│   ├── colors-primary.html          ← earth / trail swatches
│   ├── colors-neutral.html
│   ├── colors-semantic.html
│   ├── type-display.html
│   ├── type-headings.html
│   ├── type-body.html
│   ├── type-code.html
│   ├── spacing-scale.html
│   ├── radii.html
│   ├── shadows.html
│   ├── buttons.html
│   ├── badges.html
│   ├── card.html
│   ├── form-fields.html
│   ├── navigation.html
│   ├── footer.html
│   ├── icons.html
│   └── logo.html
├── social/                          ← 1600×1200 share / OG cards
│   └── index.html                   ← brand, app, and case-study card templates
└── ui_kits/
    ├── marketing_site/
    │   ├── README.md
    │   └── index.html               ← click-thru of the portfolio site (JSX inline)
    └── ios_app/
        ├── README.md
        ├── index.html               ← click-thru of Time Tracker Pro
        ├── ios-frame.jsx            ← device bezel, status bar, keyboard
        ├── screens.jsx              ← Projects, Timer, New Entry, Reports, Settings
        └── controls.jsx             ← native iOS control showcase
```

## Caveats & substitutions

- **Pirata One, Playfair Display, Inter, Fira Code** — all loaded locally from `fonts/` (variable fonts where available).
- **Icon font** substituted to Phosphor CDN (same family as the Figma "v7-icon free" component).

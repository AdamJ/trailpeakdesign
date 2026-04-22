---
name: trail-peak-design
description: Use this skill to generate well-branded interfaces and assets for Trail Peak (Adam Jolicoeur's portfolio + iOS + design system surfaces), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key files:

- `README.md` — brand context, content fundamentals, visual foundations, iconography
- `colors_and_type.css` — CSS variables for colors, type, spacing, radii, shadows, easing
- `fonts/` — webfonts (Inter, Playfair Display, Fira Code, Pirata One)
- `assets/` — logo + imagery
- `preview/` — small component/token specimens
- `ui_kits/marketing_site/` — JSX recreation of the portfolio site

Signature moves: earthen warm palette, flat 4–12px offset shadows (NO blur), 1px bark borders, rounded 12–20px corners, Playfair serif headings + Inter body + Fira Code mono + Pirata One display, centered eyebrow-with-diamond section headers, subtle `cubic-bezier(.22,.61,.36,1)` transitions. Phosphor Icons (Regular + Fill) via CDN.

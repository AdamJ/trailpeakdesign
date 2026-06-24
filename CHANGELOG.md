# Changelog

This file tracks build history for Trail Peak Design. Versions here are **not semantic** — they're a build identifier in the form `YYYY.MM.DD-N`, where `N` is the total commit count on `main` at the time of the build. A new entry is added automatically by the `version` workflow on every push to `main`.

## 2026.06.24-11

- feat: update inconsistencies and create CLAUDE.md file


- fix: `--radius-pill` corrected from `100%` to `9999px` — `100%` produces an ellipse on non-square elements (`colors_and_type.css`)
- fix: Remove duplicate Google Fonts `@import` — local `@font-face` blocks already serve all four fonts (`colors_and_type.css`)
- fix: README corner radii table corrected — buttons map to `--radius-md` (12px), not `--radius-lg` (16px); chips map to `--radius-sm` (8px); pill updated to `9999px`; `--radius-xs` (4px) documented (`README.md`)
- fix: Broken sentence in Typography › Display entry cleaned up (`README.md`)
- fix: Repository index code fence changed from `mermaid` to `text` — tree syntax is not a valid Mermaid diagram (`README.md`)
- fix: `scraps/` and `uploads/` directories documented in repository index (`README.md`)
- docs: add `CLAUDE.md` — agent-facing context for tokens, CI workflows, design constraints, and documentation rules

- Promote shadcn-only colors into the core design system

- Fix pa11y contrast failures and migrate hardcoded colors to design tokens

- ci: add automated checks for versioning, design tokens, and quality
- feat: Add shadcn/ui theme generated from Trail Peak design tokens (#3)
- Add preview and social share card pages
- Add design system foundations and previews
- Initial commit

- Initial changelog baseline.

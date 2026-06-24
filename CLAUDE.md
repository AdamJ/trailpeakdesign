# Trail Peak Design System — Agent Context

This is a **CSS-only, no-build design system**. There is no package.json, no bundler, and no framework. All tokens live in a single CSS file. Agents working here are either authoring tokens/previews, updating documentation, or generating brand-compliant UI artifacts.

## Repository structure

```text
/
├── colors_and_type.css   ← single source of truth for all tokens
├── fonts/                ← local variable TTF files (do not modify filenames)
├── assets/               ← logo mark only
├── preview/              ← one HTML file per token/component category
├── shadcn/               ← Tailwind v4 / OKLCH theme derived from tokens
├── social/               ← 1600×1200 OG share card templates
├── ui_kits/              ← click-thru HTML/JSX prototypes
│   ├── marketing_site/
│   └── ios_app/
├── scripts/              ← CI quality scripts (Node, no install required)
├── scraps/               ← reference imagery, not shipped
└── uploads/              ← original asset drop folder, not consumed directly
```

## Token source of truth

**`colors_and_type.css` is the only place tokens are defined.** The shadcn theme (`shadcn/theme.css`) is derived from it and documents the mapping — do not add new palette values there without also adding them to `colors_and_type.css` first.

Token categories and their locations within the file:

| Category              | CSS custom properties                                          |
| --------------------- | -------------------------------------------------------------- |
| Brand palette         | `--earth-*`, `--trail-*`, `--ink-*`, `--paper-*`               |
| Shadows               | `--shadow-*`, `--overlay-*`                                    |
| Semantic colors       | `--fg-*`, `--bg-*`, `--accent*`, `--border*`, `--danger*`      |
| Typography families   | `--font-sans`, `--font-serif`, `--font-display`, `--font-code` |
| Type scale            | `--fs-12` through `--fs-96`                                    |
| Spacing               | `--space-1` through `--space-20` (4px base)                    |
| Radii                 | `--radius-xs` through `--radius-pill`                          |
| Motion                | `--ease-trail`, `--dur-fast`, `--dur-med`, `--dur-slow`        |
| Semantic text aliases | `--text-primary`, `--text-secondary`, `--text-muted`           |

Dark mode is a `.dark` class block in `colors_and_type.css` — it remaps semantic tokens only, never palette tokens.

## Design constraints (enforce these in every artifact)

- **No blurred shadows.** All `box-shadow` values are offset-only: `X Y 0 0 color`. The CI token check will fail PRs that introduce a non-zero blur value.
- **No hardcoded colors.** Use `var(--token)` from `colors_and_type.css`. Suppress a known exception with `/* design-allow */` on that line.
- **No pure black or white.** Darkest ink is `--earth-soil` (`rgb(45,31,18)`); lightest surface is `--earth-sand` (`rgb(245,241,232)`).
- **1px borders only**, using `--border` or `--border-subtle`.
- **Radii:** buttons → `--radius-md` (12px); cards/surfaces → `--radius-xl` (20px); chips/code → `--radius-sm` (8px); badges → `--radius-pill` (9999px); fine detail → `--radius-xs` (4px).
- **Icons:** Phosphor Icons via CDN (`https://unpkg.com/@phosphor-icons/web`). No inline SVGs, no Unicode substitutes.
- **Fonts:** always loaded from `fonts/` locally via the `@font-face` blocks in `colors_and_type.css`. Do not add a Google Fonts `@import`.

## Preview files

Every token category and component has a corresponding `preview/*.html` file. When adding a new preview page:

1. Create `preview/your-page.html` — link to `../colors_and_type.css` with a relative path.
2. Add it to `PREVIEWS.md` under the appropriate section.
3. Add its URL to `.pa11yci.json`.

The `check-previews-index.mjs` CI script will fail if a preview file exists but is not listed in `PREVIEWS.md`.

## CI workflows

| Workflow                  | Trigger                                                | What it checks                                                                                        |
| ------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `accessibility-check.yml` | PR touching `preview/`, `ui_kits/`, `social/`, CSS     | pa11y-ci against WCAG2AA on all pages in `.pa11yci.json`                                              |
| `design-tokens-check.yml` | PR touching `preview/`, `ui_kits/`, `social/`, any CSS | `scripts/check-design-tokens.mjs` — flags hardcoded hex/rgb colors and blurred shadows in added lines |
| `html-validate.yml`       | PR touching `preview/**/*.html`, `social/**/*.html`    | html-validate with recommended rules                                                                  |
| `markdown-lint.yml`       | PR touching `**/*.md`, `preview/**`                    | markdownlint-cli2 + cspell + PREVIEWS.md sync check                                                   |
| `version.yml`             | Push to `main`                                         | Writes `VERSION`, prepends entry to `CHANGELOG.md`, updates build badge in `README.md`                |

The version workflow commits with `[skip ci]` to avoid loops. Do not manually edit `VERSION` or the `<!-- version:start/end -->` block in `README.md` — they are owned by the workflow.

## Documentation rules

All three files must be updated together when content changes:

- **`README.md`** — brand context, visual foundations, component guidelines, iconography. Audience: designers and consumers of the system.
- **`CLAUDE.md`** — agent conventions, token structure, CI behavior, design constraints. Audience: future agent instances.
- **`CHANGELOG.md`** — append entries under `## Unreleased`; the version workflow will date and commit them on the next push to main.

When adding a new preview page, also update `PREVIEWS.md` and `.pa11yci.json`.
When changing a token name or value, update `shadcn/theme.css` and `shadcn/README.md` if the token appears there.

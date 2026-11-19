# Trail Peak Design System — Agent Context

This is a **CSS-only, no-build design system**. There is no package.json, no bundler, and no framework. All tokens live in a single CSS file. Agents working here are either authoring tokens/previews, updating documentation, or generating brand-compliant UI artifacts.

## Repository structure

```text
/
├── colors_and_type.css   ← single source of truth for all tokens
├── components.css        ← .tp-* component classes built only from tokens
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

| Category              | CSS custom properties                                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Brand palette         | `--earth-*`, `--trail-*`, `--ink-*`, `--paper-*`                                                                                   |
| Shadows               | `--shadow-*`, `--overlay-*`                                                                                                        |
| Semantic colors       | `--fg-*`, `--bg-*`, `--accent*`, `--border*`, `--danger*`, `--focus-ring`, `--accent-foreground`, `--shadow-ink`, `--input-border` |
| Typography families   | `--font-sans`, `--font-serif`, `--font-display`, `--font-code`                                                                     |
| Type scale            | `--fs-12` through `--fs-96`                                                                                                        |
| Spacing               | `--space-1` through `--space-20` (4px base)                                                                                        |
| Radii                 | `--radius-xs` through `--radius-pill`                                                                                              |
| Motion                | `--ease-trail`, `--dur-fast`, `--dur-med`, `--dur-slow`                                                                            |
| Semantic text aliases | `--text-primary`, `--text-secondary`, `--text-muted`                                                                               |

Dark mode is a `.dark` class block in `colors_and_type.css` — it remaps semantic tokens only, never palette tokens.

## Design constraints (enforce these in every artifact)

- **No blurred shadows.** All `box-shadow` values are offset-only: `X Y 0 0 color`. The CI token check will fail PRs that introduce a non-zero blur value.
- **No hardcoded colors.** Use `var(--token)` from `colors_and_type.css`. Suppress a known exception with `/* design-allow */` on that line.
- **No pure black or white** on brand surfaces. Darkest ink is `--earth-soil` (`rgb(45,31,18)`); lightest surface is `--earth-sand` (`rgb(245,241,232)`). Documented exceptions: `--ink-pure` / `--paper-pure` remain defined for legacy use (`preview/colors-neutral.html`, `preview/colors-primary.html`, `preview/logo.html`, `ui_kits/marketing_site/index.html`); do not use them in new work. Also, `ui_kits/ios_app/ios-frame.jsx` uses literal black/white to mimic iOS device chrome.
- **Borders are 1px** (`--border` or `--border-subtle`) on every surface except buttons. Buttons (primary, secondary, danger, social, icon) use a 4px border; see Components.
- **Radii** (code uses `--radius-sm`): buttons → `--radius-md` (12px); cards/surfaces → `--radius-xl` (20px); chips/code → `--radius-sm` (8px); badges → `--radius-pill` (9999px); fine detail → `--radius-xs` (4px).
- **Icons:** Phosphor Icons via CDN (`https://unpkg.com/@phosphor-icons/web`). No inline SVGs, no Unicode substitutes. Documented exception: `ui_kits/ios_app/ios-frame.jsx` draws iOS status-bar glyphs inline.
- **Blur:** only `backdrop-filter` on `.tp-btn--outline`, and the blurred/inset shadows in `ui_kits/ios_app/ios-frame.jsx` that mimic the device bezel. Nothing else.
- **Contrast pairing rules (AA, verified for both themes):**
  - `--fg-muted` is not allowed on `--bg-3` in light mode (3.26:1). Use `--fg-secondary`.
  - `--danger` text is not allowed on `--bg-3` in dark mode (3.61:1).
  - `--accent` (clay) is for fills, large text and non-text only (3.40:1 on sand). Use `--accent-strong` for body text.
  - 12–14px accent-alt text uses `--accent-alt-text`, not `--accent-alt`.
  - Dark `--border` (1.78:1 on soil) is decorative. Do not use it as the only boundary of an input.
- **Focus and motion:** a global `:focus-visible` ring uses `--focus-ring`; do not set `outline: none` without a replacement. `colors_and_type.css` includes a `prefers-reduced-motion` block.
- **Fonts:** always loaded from `fonts/` locally via the `@font-face` blocks in `colors_and_type.css`. Do not add a Google Fonts `@import`.

## Components

`components.css` is the source of truth for component styles; `components.json` and the table below are generated from it (`node scripts/build-components-json.mjs`). Load it after `colors_and_type.css`. Do not re-implement these in product CSS; extend the classes. Specimens: `preview/components.html`.

<!-- components:start -->
| Class                                                                                 | Use                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.tp-page`                                                                            | On the body element: page background, text color, sans font                                                                                                                                         |
| `.tp-container` + `--narrow`                                                          | 1200px centered column with --space-6 gutters; --narrow is 720px for form pages                                                                                                                     |
| `.tp-stack`                                                                           | Vertical layout with --space-4 gap                                                                                                                                                                  |
| `.tp-row`                                                                             | Wrapping horizontal layout with --space-4 gap                                                                                                                                                       |
| `.tp-btn` + `--danger`, `--icon`, `--outline`, `--primary`, `--secondary`, `--social` | Buttons: 4px border and offset shadow; hover and press collapse the shadow and move 2px. Variants: primary, secondary, danger, outline, icon, social. .is-hover forces the hover look for specimens |
| `.tp-card`                                                                            | Surface: 1px border, --radius-xl, 8px offset shadow (12px on hover); pair with .tp-stack for content                                                                                                |
| `.tp-field`                                                                           | Wraps a label and one control; .tp-hint for helper text, .tp-error for the error message                                                                                                            |
| `.tp-hint`                                                                            | Helper text below a control                                                                                                                                                                         |
| `.tp-input`                                                                           | Text input, textarea, select; aria-invalid="true" shows the error state                                                                                                                             |
| `.tp-error`                                                                           | Error message inside a .tp-field; role="alert", leads with a ph-warning-circle icon                                                                                                                 |
| `.tp-check`                                                                           | Checkbox or radio wrapped in its label                                                                                                                                                              |
<!-- components:end -->

Markup rules:

- Zip consumers: `preview/`, `ui_kits/`, `scripts/`, `PREVIEWS.md` and `scraps/` exist only in the repo; the release zip holds `colors_and_type.css`, `components.css`, `tokens.json`, `llms.txt`, `fonts/` (keep it beside the CSS), `assets/`, `shadcn/` and the docs.
- Put `.tp-error` inside its `.tp-field`. Wrap each `.tp-check` input in the `<label class="tp-check">`. Stack several `.tp-card`s in a `.tp-stack`; the card title is a `.tp-h4` inside the card.
- Native `<select>` uses the browser arrow and popup; `color-scheme` follows the theme class.
- Theme persistence, a `change` listener for "System", and a pre-paint script to avoid a flash are left to the app.
- `.tp-btn--secondary` uses palette tokens in light mode and semantic tokens in `.dark` on purpose; extend it with the same pair.
- Error field: `aria-invalid="true"` and `aria-describedby` pointing at the `.tp-error` id; the message has `role="alert"` and starts with `<i class="ph ph-warning-circle" aria-hidden="true"></i>`.
- Primary text uses `--accent-foreground` (stays light in dark mode; `--fg-inverse` flips to soil and fails on ember).
- Offset shadows and button borders use `--shadow-ink` (bark in light, bark-raise in dark). Control borders use `--input-border` (dark `--border` is too faint).
- Do not place `--danger` text on `--bg-3` in dark mode. Put error fields on `--bg-page` or `--bg-secondary`.
- Headings on form pages: `.tp-h3` for the page title and `.tp-h4` for card sections; `.tp-h1` (48px) is for marketing pages.
- Global element styles: `p`, `small`, `code`, `pre` are styled by `colors_and_type.css` without a class.
- Phosphor loads from unpkg; pin a version, for example `https://unpkg.com/@phosphor-icons/web@2.1.1`, and add `integrity` and `crossorigin="anonymous"` if your CSP needs it (no hash is maintained here).
- Theme switching: toggle `class="dark"` on `<html>`. The system does not follow `prefers-color-scheme` on its own. For Light / Dark / System: `document.documentElement.classList.toggle("dark", choice === "dark" || (choice === "system" && matchMedia("(prefers-color-scheme: dark)").matches))`.
- Radius naming: in `shadcn/theme.css`, `--radius-md` is 14px (Tailwind scale from `--radius: 1rem`). In `colors_and_type.css`, `--radius-md` is 12px. Do not mix the two files in one stylesheet.

## Naming rules

- Palette tokens: `--earth-*` (neutrals, browns) and `--trail-*` (accents), named by material/hue. Lightened/darkened variants are `-light` / `-deep` suffixes; `--earth-mist` and `--earth-bark-raise` are existing exceptions, do not add more one-off modifiers.
- Semantic tokens are named by role: `--fg-*`, `--bg-*`, `--accent*`, `--border*`, `--danger*`, `--focus-*`. New background tiers extend the existing set; `--bg-3` is the legacy numeric name, prefer descriptive names for new tokens.
- `--text-*` are aliases of `--fg-*`. Prefer `--fg-*` in new work.
- Scale tokens are value-named (`--fs-16`, `--space-4`).
- Renaming or removing a token is breaking: use a `BREAKING:` commit subject (see `CONTRIBUTING.md`).

## Machine-readable layer

- `tokens.json` is generated: run `node scripts/build-tokens-json.mjs` after any token change and commit the result.
- `components.json` and the class table in the Components section are generated from `components.css`: run `node scripts/build-components-json.mjs` after editing it. The script also lints (no hardcoded colors, no undefined tokens, every base class needs a `/** @use ... */` comment); CI fails if the generated files are stale.
- `llms.txt` is the agent index; keep it in sync when files are added or renamed.
- `scripts/check-token-contrast.mjs` checks semantic contrast in both themes. `scripts/scan-token-adoption.mjs <dir>` reports token vs hardcoded color use in a consumer project.

## Preview files

Every token category and component has a corresponding `preview/*.html` file. When adding a new preview page:

1. Create `preview/your-page.html` — link to `../colors_and_type.css` with a relative path.
2. Add it to `PREVIEWS.md` under the appropriate section.
3. Add its URL to `.pa11yci.json`.

The `check-previews-index.mjs` CI script will fail if a preview file exists but is not listed in `PREVIEWS.md`.

## CI workflows

| Workflow                  | Trigger                                                | What it checks                                                                                                                                   |
| ------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accessibility-check.yml` | Every PR                                               | pa11y-ci against WCAG2AA on all pages in `.pa11yci.json`                                                                                         |
| `design-tokens-check.yml` | Every PR                                               | `scripts/check-design-tokens.mjs` — flags hardcoded hex/rgb colors and blurred shadows in added lines                                            |
| `html-validate.yml`       | Every PR                                               | html-validate with recommended rules                                                                                                             |
| `markdown-lint.yml`       | Every PR                                               | markdownlint-cli2 + cspell + PREVIEWS.md sync check                                                                                              |
| `release.yml`             | Tag push `20*` or manual dispatch                      | Builds `trail-peak-<tag>.zip` (tokens CSS, `tokens.json`, fonts, assets, shadcn theme, docs) and publishes a GitHub Release with generated notes |

The four PR workflows run on every PR with no path filter: the ruleset requires them, and a path-filtered check that never runs blocks merging forever. There is no version-bump workflow: `main` is protected, so versions are not committed back. A version is a build id (`YYYY.MM.DD-N`, `N` = commit count on `main`) set by the Git tag when a release is cut; see `CONTRIBUTING.md`.

## Documentation rules

All three files must be updated together when content changes:

- **`README.md`** — brand context, visual foundations, component guidelines, iconography. Audience: designers and consumers of the system.
- **`CLAUDE.md`** — agent conventions, token structure, CI behavior, design constraints. Audience: future agent instances.
- **`CHANGELOG.md`** — frozen history up to `2026.06.24-11`. Newer changes live in the GitHub Release notes, generated from PR titles and commit subjects. Prefix token renames/removals with `BREAKING:`.

When adding a new preview page, also update `PREVIEWS.md` and `.pa11yci.json`.
When changing a token name or value, update `shadcn/theme.css` and `shadcn/README.md` if the token appears there.

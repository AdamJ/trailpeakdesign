# Multi-Point Inspection Report — Trail Peak Design System

_Inspected: 2026-11-18 · Technician: Claude (Sonnet 5.5) · Previous inspection: first inspection_
_Vehicle profile: `ds-inspection/GARAGE.md` (checked in 2026-11-18)_

## The short version

Trail Peak has a clean, well-structured token file and unusually good CI for a solo system, but the rules it states are not the rules its own artifacts follow. The iOS kit carries a hand-copied palette that has already drifted from the tokens, previews break the "1px borders / no pure white / no inline SVG" rules, and several token pairs fail WCAG AA (notably dark-mode muted text on `--bg-3`, and moss eyebrow text). Nothing is red; every station is yellow. The design (Figma) side was not reachable, so design/code parity is unverified. Most important next step: fix the failing contrast pairs at the token level and add a dark-mode contrast gate.

**Overall: 51/100** — a conversation starter, not a grade. Fix the reds, schedule the yellows, re-run on a cadence.

## Inspection sheet

|  # | Station                         | Quality      | Light |      Score |
|---:|:--------------------------------|:-------------|:-----:|-----------:|
|  1 | Coverage & gaps                 | Complete     |  🟡   |       5/10 |
|  2 | Best practices                  | Sound        |  🟡   |       5/10 |
|  3 | Accessibility                   | Sound        |  🟡   |       5/10 |
|  4 | Shared language                 | Sound        |  🟡   |       6/10 |
|  5 | Testing & validation            | Sound        |  🟡   |       6/10 |
|  6 | Orchestration                   | Synchronized |  🟡   |       4/10 |
|  7 | Governance & version control    | Extensible   |  🟡   |       6/10 |
|  8 | Feedback & adoption             | Extensible   |  🟡   |       4/10 |
|  9 | Machine-readable docs & context | AI-Ready     |  🟡   |       6/10 |
| 10 | Agent access                    | AI-Ready     |  🟡   |       4/10 |
|    | **Overall**                     |              |       | **51/100** |

**Lights:** 🟢 0 green · 🟡 10 yellow · 🔴 0 red · 0 not inspected

**Key:** 🔴 Red (0–3) — broken or missing; the light is ON · 🟡 Yellow (4–7) — drift or gaps; schedule a fix · 🟢 Green (8–10) — healthy, no action needed · **N/I** — not inspected (no evidence access; never guessed)

## Evidence basis

- Access used this pass: code, docs, process files live from the repo; design library not reachable (Figma MCP unauthenticated, user chose to skip); no GitHub API, no consumer repos, no generation/live agent test.
- Findings tagged `[verified]`: 38 · `[reported]`: 2 (README claims about Figma)
- Every design-side claim (Stations 1, 2, 3, 6) is scoped to the repo only. Connecting Figma would sharpen 4 stations. Stations 8, 10 are thin: no usage data or agent test was available.

## Station records

### Station 1 — Coverage & gaps: YELLOW (5/10)
- Inventory: design not inspected · code: 0 components (CSS-only) + 8 preview specimens (badges, buttons, card, footer, form-fields, icons, logo, navigation) + shadcn preview (buttons, badges, cards, form fields, alerts, tabs) · 20 preview pages, all in PREVIEWS.md (sampled: full `preview/`)
- Evidence level: code live · design interview/none
- Findings:
  - [verified] Tokens cover color, type, spacing, radii, shadow-color, motion in `colors_and_type.css` — breadth is good. Two tiers only (palette → semantic); no component tier; no weight, line-height, or letter-spacing tokens (`letter-spacing: 2px`, `0.14em` hardcoded in the file).
  - [verified] Staples missing from specimens: table, modal/dialog, tooltip, toast, avatar, pagination, breadcrumb, accordion, checkbox/radio/select/switch (switch/stepper exist only in the iOS kit). Tabs/alerts exist only in the shadcn preview. Benchmark from my own knowledge (no knowledge MCP).
  - [verified] No distributed artifact: no package.json, no npm, copy-paste only. VERSION/tags exist but are build ids. `.code-inline`/`.code-block` are the only component-like CSS classes shipped.
  - [verified] Dark mode remaps semantic tokens only; `--accent*`, `--bg-dark`, `--accent-alt` have no dark values.
  - [reported] README says Figma has Badge, Buttons, Cards, Code, Divider, Footer, Icons, Link, List, Navigation, Sections pages; no Table/Modal/Tabs pages listed. Parity with code unchecked.
- Not inspected: Figma library; consumer product needs.
- Deviations noted: CSS-only/no-build is intentional, so "no package" is a distribution choice, not a bug. Still limits reuse.
- First move: Decide the distribution story (CSS file via CDN/GitHub release/tiny npm package) and list the next 5 components (table, dialog, tabs, checkbox/radio, tooltip) in the order your products need them.

### Station 2 — Best practices: YELLOW (5/10)
- Sampled: `colors_and_type.css`, 20 `preview/*.html`, `ui_kits/ios_app/*`, `ui_kits/marketing_site/index.html`, `social/index.html` (grep sweeps) · Design side: not reachable
- Evidence level: code live · design not reachable
- Findings:
  - [verified, org] CLAUDE.md "1px borders only" is broken: `preview/buttons.html` `.btn-primary`/`.btn-secondary` use `border:4px solid` (5 occurrences of 4px across previews/kits), and the comment says so deliberately.
  - [verified, org] CLAUDE.md "No pure black or white" is contradicted by the tokens themselves: `--ink-pure: rgb(0,0,0)`, `--paper-pure: rgb(255,255,255)` exist and are used in `preview/buttons.html`, `preview/colors-neutral.html`, `preview/logo.html`; `ios-frame.jsx` uses `#fff`/`#000`/`#1C1C1E`.
  - [verified, org] CLAUDE.md "No inline SVGs": `preview/buttons.html` (4 `<svg>`), `ui_kits/ios_app/ios-frame.jsx` (9).
  - [verified, org] CLAUDE.md "No blurred shadows": `ui_kits/ios_app/ios-frame.jsx:55-70` uses blurred and inset shadows (device bezel mimic — arguably exempt, but undocumented). Token CI only checks added lines, so it never flagged them.
  - [verified, org] Hardcoded values: ui_kits 36 hex + 43 `rgb(` hits (ios-frame.jsx 33, screens.jsx 16, ios index.html 3, controls.jsx 2); font sizes in previews are px literals (59 in `preview/`, 0 use `var(--fs-*)`); preview radii are `12px`/`8px`/`999px` literals instead of `--radius-*`.
  - [verified, org] Radii drift: CLAUDE.md says code → `--radius-sm`, but `.code-inline`/`.code-block` use `--radius-md`; `.code-block` border is `--trail-moss`, not `--border`; both use `--earth-tan` instead of `--bg-3`.
  - [verified, industry] No logical properties: 23 physical `margin/padding-left|right`/`left:`/`right:` uses, 0 logical.
  - [verified, format] Credit: tokens file is tidy, `font-display: swap`, local variable fonts, no Google Fonts import (verified none remain), offset-only `box-shadow` values in previews (all 0 blur).
- Not inspected: Figma craft (auto-layout, layer names); docs page quality beyond README.
- Deviations noted: 4px button border and `ios-frame` shadows may be intentional; neither is written down as an exception.
- First move: Reconcile CLAUDE.md with reality — for each broken rule, either fix the artifact or write the exception into CLAUDE.md/README.

### Station 3 — Accessibility: YELLOW (5/10)
- Sampled: contrast for 31 token pairs, both themes (computed from code tokens); `preview/form-fields.html`, `buttons.html`, marketing site for focus/ARIA · Design side: not reachable
- Evidence level: code live · design not reachable
- Findings (source: code tokens in `colors_and_type.css`):
  - [verified, WCAG 1.4.3] `--fg-muted` (stone) on `--bg-3` (tan): 3.26:1 — fails 4.5:1; `.caption` text on chips/code backgrounds hits this. Stone on dune 4.68 passes.
  - [verified, 1.4.3] Dark: `--fg-muted` (mist) on `--bg-3` (bark-raise): 3.84:1 — fails. Danger (rust-light) on `--bg-secondary` (bark): 3.57:1 — fails. README only cites mist on soil (6.85) and bark (4.98), both pass.
  - [verified, 1.4.3] `.eyebrow` moss on sand 5.10 passes, on dune 4.25 fails; in dark mode moss on soil is 2.77:1 and `.eyebrow` has no dark override — fails at 12px.
  - [verified, 1.4.3/1.4.11] `--accent` (clay) on sand 3.40:1 and sand on clay 3.40:1 — fails as text; passes as large/non-text only. Primary (sand on ember) 4.74 passes.
  - [verified, 1.4.11] Dark `--border` (bark-raise) on soil: 1.78:1 — fails 3:1 if used on inputs (shadcn `--input` uses it).
  - [verified] No `prefers-reduced-motion` handling anywhere despite motion tokens and hover translate transitions.
  - [verified] `:focus`/`:focus-visible` appears in only 3 files (marketing site, form-fields, shadcn-theme); none in `buttons.html`, `navigation.html`, `badges.html`. ARIA/role only in 4 files. No per-component a11y notes in docs.
  - [verified] Credit: pa11y-ci WCAG2AA on all 23 pages in CI; a prior commit ("Fix pa11y contrast failures") shows the loop works; light-mode core text pairs are strong (14.15, 10.29, 5.62).
- Not inspected: screen reader behavior; Figma variable contrast; actual usage of each failing pair in surfaces.
- Deviations noted: none.
- First move: Fix the token pairs above at the token level (e.g. a darker `--fg-muted` on tan, an AA dark `--bg-3`/`--eyebrow`), then add a dark-mode pa11y pass.

### Station 4 — Shared language: YELLOW (6/10)
- Swept: all tokens in `colors_and_type.css`, shadcn mapping, CLAUDE.md/README vocabulary · design names not reachable
- Evidence level: code live
- Findings:
  - [verified] Semantic tier is role-named (`--fg-*`, `--bg-*`, `--danger`); palette is material/hue-named (`earth-*`, `trail-*`) — a clear, coherent scheme.
  - [verified] Inconsistent modifiers: `--bg-secondary` vs `--bg-3` (named vs numeric); `-light` (`trail-rust-light`, `earth-stone-light`) vs `-raise` (`earth-bark-raise`) vs a separate name (`earth-mist`) for the same "lightened" idea; `--fg-secondary` vs `--bg-secondary` OK.
  - [verified] Duplicate vocabularies: `--text-primary/secondary/muted` alias `--fg-*`; `--font-family-code` aliases `--font-code`; `.h1`/`.tp-h1` double classes — three names to maintain for one concept.
  - [verified] `--shadow-soft/card/deep/deepest` are colors, not shadows, so the name implies a different thing than the value. Scale tokens (`--fs-12`, `--space-4`) are value-named (reasonable for scale, noted).
  - [verified] Docs drift on names/values: CLAUDE.md lists `--ink-*`, `--paper-*` as brand palette while also forbidding pure black/white; iOS kit uses `TP.sand/dune/…` JS names for a parallel palette.
  - [verified] No naming validator or written naming algorithm.
- Not inspected: Figma variable/component names, so design↔code naming match is untested.
- Deviations noted: none.
- First move: Write a 10-line naming rule in CLAUDE.md (modifier vocabulary, `bg-N` vs named) and pick one of `--text-*`/`--fg-*`.

### Station 5 — Testing & validation: YELLOW (6/10)
- Inspected: `.github/workflows/*` (5), `scripts/*` (2), `.pa11yci.json`, `.htmlvalidate.json`. I did not run any check (per your rule).
- Evidence level: code live · CI results not inspected
- Findings:
  - [verified] Real CI exists on PRs: pa11y WCAG2AA over 23 pages, html-validate, markdownlint+cspell, design-token check, PREVIEWS index sync. Strong for a solo system.
  - [verified] Checks run only on pull requests; git history shows 0 merge commits and the last 5 feature commits look pushed straight to main — if so, CI is bypassed. Branch protection not checked.
  - [verified] `check-design-tokens.mjs` inspects only *added* lines, so the 36 hex/43 rgb in ui_kits and the 4px borders were never caught.
  - [verified] No visual regression, no behavior tests (no components), no dark-mode a11y run, no contrast-ratio check of the token file, no evals for AI-generated output.
  - [verified] `scripts/` use single quotes (repo style differs from your global style; cosmetic).
- Not inspected: whether workflows currently pass; branch protection settings.
- Deviations noted: n/a.
- First move: Enable branch protection requiring the 4 PR checks on main, and add a script that computes contrast for the semantic pairs in both themes.

### Station 6 — Orchestration: YELLOW (4/10)
- Diffed: `colors_and_type.css` ↔ `shadcn/theme.css` (mapping, not numeric), tokens ↔ `ui_kits/ios_app/screens.jsx` `TP` object, README ↔ CSS
- Token diff: design vars not reachable → "not run — no design-side access". Code-side parity (tokens vs iOS `TP` copy) below.
- Evidence level: code live · design not reachable
- Findings:
  - [verified] iOS kit holds a hand-copied palette that has drifted from tokens: `tan '#D4C4A8'` vs `--earth-tan rgb(201,184,154)` = `#C9B89A`; `sage '#8FA085'` vs `--trail-sage rgb(134,169,148)` = `#86A994`. `emberDark '#9C3920'` has no token at all. Values match for sand, dune, bark, soil, stone, clay, ember, moss.
  - [verified] `shadcn/theme.css` says "generated from colors_and_type.css" but no generator script exists; OKLCH values are hand-maintained (not numerically re-verified this pass).
  - [verified] Hex values appear in three places per color: tokens, preview labels (`preview/colors-*.html`), README prose — three copies (some marked `design-allow`).
  - [verified] CLAUDE.md requires README, CLAUDE.md, CHANGELOG to be updated together; CHANGELOG has no `## Unreleased` section as CLAUDE.md instructs, and its latest entry is malformed (blank lines, mixed bullet formats).
  - [reported] README says Figma was the source of truth for tokens; whether Figma variables still match the CSS is unknown.
  - [verified] Credit: values match on 8 of 10 palette colors in the iOS copy, so the hand-maintenance is mostly careful.
- Not inspected: Figma ↔ code parity, Figma component names/variants.
- Deviations noted: none.
- First move: Delete the iOS `TP` copy and read tokens via CSS variables (or generate it from `colors_and_type.css`); add a script that diffs hex literals against tokens.

### Station 7 — Governance & version control: YELLOW (6/10)
- Inspected: CODEOWNERS, PR template, 2 issue templates, version workflow, CHANGELOG, git log (12 commits), 3 build tags on origin
- Evidence level: repo live · GitHub tracker not queried
- Findings:
  - [verified] CODEOWNERS (`@AdamJ`), PR template with a design-system checklist, bug and design_change issue templates, automated build-id changelog and `VERSION` — more process than most solo systems.
  - [verified] No CONTRIBUTING.md; no deprecation or breaking-change policy; build-id versions don't signal token renames/removals (a rename in `colors_and_type.css` is invisible to consumers).
  - [verified] CHANGELOG format drift: no `## Unreleased` block though CLAUDE.md prescribes one; manual notes and auto entries interleave.
  - [verified] Untracked `Claude outputs/` folder holds `MIGRATION.md`, `theme.css`, a zip. `MIGRATION.md` describes a different Figma file (68 pages, shared production file) and does not look like Trail Peak content — check before committing.
  - [reported] Branch protection and PR practice unknown (see Station 5).
- Not inspected: issue backlog health, branch protection.
- Deviations noted: Non-semver build-id versioning is documented and deliberate.
- First move: Add a short CONTRIBUTING.md with token-rename/removal rule (mark as breaking in CHANGELOG), and decide what to do with `Claude outputs/`.

### Station 8 — Feedback & adoption: YELLOW (4/10)
- Measured: repo only (no consumer repos scanned, no analytics)
- Evidence level: code live · consumers interview/none
- Findings:
  - [verified] No usage or adoption data in the repo; no consumer repos were scanned; `design_change.md` issue template is the only feedback path.
  - [verified] Coverage vs. adoption can't be separated: the consuming sites/apps live outside this repo. The iOS kit's parallel palette (Station 6) is itself a detachment signal.
  - [reported] User says this is for a wider share; no external consumers yet to ask.
- Not inspected: consumer repos, GitHub issues, npm/CDN stats.
- Deviations noted: Solo system — feedback is the maintainer's own use.
- First move: Grep your own sites/apps for hardcoded hex vs `var(--…)` and record the count; repeat quarterly.

### Station 9 — Machine-readable docs & context: YELLOW (6/10)
- Inventoried: tokens as CSS custom properties; CLAUDE.md (rules, token table, CI); SKILL.md; shadcn/README mapping · Generation test: not run
- Evidence level: code live
- Findings:
  - [verified] Tokens as CSS vars are directly machine-consumable; CLAUDE.md gives a clear, well-structured rule set for agents — a deliberate AI-facing surface, ahead of most systems.
  - [verified] But rules are partly wrong (pure black/white, 1px borders, code radius — see Station 2), so an agent following CLAUDE.md will reproduce the contradictions.
  - [verified] No llms.txt, no DTCG/JSON token export, no component metadata (purpose, anti-patterns, a11y contract), no per-component usage rules; previews are HTML not structured docs. SKILL.md lacks an index of the previews.
  - [verified] Tokens aren't generated into any other format, so any machine-readable layer you add would be hand-maintained.
- Not inspected: generation test (no confirmed green regardless).
- Deviations noted: none.
- First move: Fix CLAUDE.md contradictions, then run the generation test: ask an agent to build a settings form from CLAUDE.md alone and log every stumble.

### Station 10 — Agent access: YELLOW (4/10)
- Surfaces mapped: SKILL.md (Agent Skill), CLAUDE.md. No MCP, no Code Connect, Figma MCP present but unauthenticated · Live test: not run
- Evidence level: code live
- Findings:
  - [verified] The skill route works for agents in Claude Code; it is the only access surface. No MCP/knowledge-graph for tokens/components; no Code Connect mapping Figma → CSS.
  - [verified] No integration docs telling others how to wire the skill/CSS into their agent tools.
  - [reported] Brimfield tooling (`design_generate_tokens`) exists locally but is not tied to this system.
- Not inspected: output quality from a real agent build.
- Deviations noted: none.
- First move: Authenticate Figma MCP, then add Code Connect for the 6 core components so design → code lands on `colors_and_type.css` tokens.

## What changed since last inspection

First inspection — n/a.

## Related course lessons

Lesson lookup was unavailable this run (the catalog fetch returned only a truncated page), so no lessons are recommended.

## Next service

- Work order: `ds-inspection/work-orders/2026-11-18-work-order.md`
- Recommended cadence: deep inspection quarterly; everyday checks to wire into CI now: stations 3 (token contrast, both themes), 4 (naming rule), 6 (hex-literal drift)
- Re-inspect by: 2027-02-18

# Multi-Point Re-Inspection Report — Trail Peak Design System

_Inspected: 2026-11-18 (second pass) · Technician: Claude (Sonnet 5.5) · Previous inspection: 2026-11-18 (51/100)_
_Vehicle profile: `ds-inspection/GARAGE.md` (checked in 2026-11-18; re-confirmed: branch protection now on, nothing else changed)_

## The short version

The system moved from 51 to 61. The token, component and machine-readable layers are now generated from a single source and checked in CI, and an agent can build an on-system page from the shipped files with almost no guessing. The weak spots are all in the new PR itself: PR #9 is red on three checks (html-validate, markdown lint, pa11y), and the branch ruleset requires a pull request but not passing status checks, so a red PR can still merge. The next move is to fix the three CI failures and add required status checks to the ruleset.

**Overall: 61/100** — a conversation starter, not a grade. Fix the reds, schedule the yellows, re-run on a cadence.

Scoring note: this is a re-inspection, but I had seen the previous scores in this session. Each station below was re-scored from its anchors against fresh evidence (CI logs, GitHub API, repo sweeps), not by adjusting the old numbers.

## Inspection sheet

|  # | Station                         | Quality      | Light |      Score |
|---:|:--------------------------------|:-------------|:-----:|-----------:|
|  1 | Coverage & gaps                 | Complete     |  🟡   |       6/10 |
|  2 | Best practices                  | Sound        |  🟡   |       6/10 |
|  3 | Accessibility                   | Sound        |  🟡   |       6/10 |
|  4 | Shared language                 | Sound        |  🟡   |       6/10 |
|  5 | Testing & validation            | Sound        |  🟡   |       6/10 |
|  6 | Orchestration                   | Synchronized |  🟡   |       6/10 |
|  7 | Governance & version control    | Extensible   |  🟡   |       7/10 |
|  8 | Feedback & adoption             | Extensible   |  🟡   |       5/10 |
|  9 | Machine-readable docs & context | AI-Ready     |  🟢   |       8/10 |
| 10 | Agent access                    | AI-Ready     |  🟡   |       5/10 |
|    | **Overall**                     |              |       | **61/100** |

**Lights:** 🟢 1 green · 🟡 9 yellow · 🔴 0 red · 0 not inspected

**Key:** 🔴 Red (0–3) — broken or missing; the light is ON · 🟡 Yellow (4–7) — drift or gaps; schedule a fix · 🟢 Green (8–10) — healthy, no action needed · **N/I** — not inspected (no evidence access; never guessed)

## Evidence basis

- Access used this pass: repo live (working tree on `ds-inspection-fixes`), GitHub API and `gh` live (PR #9 check results and logs, rulesets, releases, issues), four cold-agent generation tests run earlier in this session. Design library not reachable (Figma MCP unauthenticated, skipped by choice).
- Findings tagged `[verified]`: 41 · `[reported]`: 2.
- Design-side claims remain out of reach for Stations 1, 2, 3 and 6. I did not run the repo scripts myself; CI results stand in for them.

## Station records

### Station 1 — Coverage & gaps: YELLOW (6/10)

- Inventory: design not inspected · code: 11 `.tp-*` classes in `components.css` plus 21 preview specimens · documented: 21 preview pages listed in `PREVIEWS.md`, class table in `CLAUDE.md` (sampled: full repo)
- Evidence level: code live · design not reachable
- Findings:
  - [verified] Tokens now have a third, component-local tier: `--tp-card-shadow` in `components.css`, plus new semantic tokens `--shadow-ink`, `--input-border`, `--accent-foreground`. Still no weight, line-height or letter-spacing tokens.
  - [verified] Shipped component classes: page shell, button (6 variants), card, field, input, error, hint, check. Badges, navigation, footer, logo exist only as preview specimens with inline CSS.
  - [verified] Staples still missing: table, dialog, tabs (shadcn preview only), tooltip, toast, avatar, pagination, breadcrumb, accordion. Benchmark from my own knowledge (no knowledge MCP).
  - [verified] Distribution exists: GitHub Releases (latest `2026.06.11-7`, three total, cut manually) and `release.yml` now packages `components.css`, `components.json` and `tokens.json`. No release has been cut since the new layer.
  - [verified] Dark mode now has `color-scheme`; accent tokens still have no dark values.
- Not inspected: Figma library; consumer product needs.
- Deviations noted: CSS-only, no-build is intentional.
- First move: Cut a release after PR #9 merges, then pick the next component (table or dialog).

### Station 2 — Best practices: YELLOW (6/10)

- Sampled: `components.css`, `colors_and_type.css`, 21 previews, `ui_kits/`, `social/` (grep sweeps)
- Evidence level: code live · design not reachable
- Findings:
  - [verified, org] `components.css` is clean: 0 hex or `rgb()`, only offset shadows, tokens throughout, logical `margin-inline` and `padding-inline`, `color-scheme` per theme.
  - [verified, org] The documented exceptions now match reality: inline SVG only in `ui_kits/ios_app/ios-frame.jsx` (1 file), 4px borders only on buttons (4 occurrences), blur only on `.tp-btn--outline` and `ios-frame.jsx`.
  - [verified, org] Hardcoded values remain outside the new classes: `ui_kits/` has 19 hex and 40 `rgb()` (mostly `ios-frame.jsx`); previews carry 10 hex in colour-label pages. Previews still use px font sizes (46 vs 5 token uses) and 23 physical left/right properties against 2 logical.
  - [verified, org] Most previews (18 of 21) still carry their own inline CSS rather than `components.css`.
- Not inspected: Figma craft (auto-layout, layer names).
- Deviations noted: iOS device-chrome literals and 4px sticker buttons, both documented in `CLAUDE.md`.
- First move: Migrate the remaining specimens (badges, navigation, footer) into `components.css` classes and delete their inline copies.

### Station 3 — Accessibility: YELLOW (6/10)

- Sampled: token contrast via the CI `check` job (both themes), `components.css` focus and motion rules, pa11y run on 24 pages · Design side: not reachable
- Evidence level: code live · CI live
- Findings (source: code tokens):
  - [verified] The contrast check (`scripts/check-token-contrast.mjs`) passed in CI for 17 light and 15 dark pairs. The pair list is hand-chosen: dark `--accent-alt-text` (sage) on `--bg-secondary` is 4.48:1 and is not in it.
  - [verified] pa11y (WCAG2AA) failed on PR #9 with 3 errors on 2 pages, `preview/components.html` (2) and `preview/form-fields.html` (1): forms with no submit button (H32). The other 22 pages report 0 errors.
  - [verified] A global `:focus-visible` ring and a `prefers-reduced-motion` block now exist; `components.html` renders a dark section, so pa11y covers dark mode for the new classes.
  - [verified] No per-component keyboard or screen-reader notes yet beyond the error-markup rule in `CLAUDE.md`.
- Not inspected: screen reader behavior; Figma variable contrast.
- Deviations noted: none.
- First move: Add a submit button to the three preview forms (or mark them non-submitting), then add dark `--accent-alt-text` on `--bg-secondary` to the pair list.

### Station 4 — Shared language: YELLOW (6/10)

- Swept: tokens, 11 component classes, `CLAUDE.md` naming rules
- Evidence level: code live · design names not reachable
- Findings:
  - [verified] A written naming rule now exists in `CLAUDE.md`. Components follow one scheme: `.tp-<name>` with `--<variant>` modifiers, and the generator derives variants from it.
  - [verified] Legacy inconsistencies are documented but unresolved: `--bg-3` vs `--bg-secondary`, `-light` vs `-raise` vs `mist`, `--text-*` aliases of `--fg-*`.
  - [verified] No naming validator. The generator lint catches undefined tokens and missing `@use` comments, not naming drift.
- Not inspected: Figma names; whether design variants match `.tp-btn--*`.
- Deviations noted: legacy names kept to avoid breaking consumers.
- First move: Decide the rename of `--bg-3` and `--text-*` and ship it as a `BREAKING:` change with a migration note.

### Station 5 — Testing & validation: YELLOW (6/10)

- Inspected: 6 workflows, PR #9 check results and logs, rulesets API
- Evidence level: code live · CI live
- Findings:
  - [verified] CI runs on PRs and catches real problems: on PR #9, the design-token job passed (hardcoded values, contrast, generated-file drift); html-validate failed (3 errors, form needs a submit button); markdown lint failed (71 errors); pa11y failed (3 errors).
  - [verified] 68 of the 71 markdown errors are in the new `ds-inspection/` files (headings and lists without blank lines, table pipes); 2 are table alignment in `CLAUDE.md` (the lines I added); 1 is a double blank in `CHANGELOG.md` line 9 from the auto-generated entry.
  - [verified] The ruleset on the default branch requires a pull request and blocks deletion, but has no required status checks. A red PR can merge.
  - [verified] Still no visual regression, behavior tests or automated evals; the generation tests were run by hand.
- Not inspected: whether the failing checks also fail on `main`.
- Deviations noted: none.
- First move: Add required status checks (design-tokens, html-validate, markdown, pa11y) to the ruleset after the PR is green.

### Station 6 — Orchestration: YELLOW (6/10)

- Diffed: `colors_and_type.css` to `tokens.json`, `components.css` to `components.json` and `CLAUDE.md` (via CI drift check), iOS kit to tokens, README hex values to tokens
- Token diff: design variables not reachable, so "not run — no design-side access"
- Evidence level: code live · design not reachable
- Findings:
  - [verified] Generated layers with a drift check: `tokens.json`, `components.json` and the `CLAUDE.md` class table; the CI job that runs `git diff --exit-code` on them passed on PR #9.
  - [verified] The iOS kit's parallel palette is gone; `screens.jsx` now reads `var(--token)` with one `design-allow` literal (`emberDark`).
  - [verified] Still hand-maintained: `shadcn/theme.css` OKLCH values (no generator), hex labels in `preview/colors-*.html` and README prose.
  - [verified] Preview migration is partial: 4 of 21 pages use `components.css` (`buttons`, `card`, `form-fields`, `components`).
  - [reported] README says Figma was the original source of truth; parity with CSS is unknown.
- Not inspected: Figma to code parity.
- Deviations noted: none.
- First move: Generate `shadcn/theme.css` token values from `colors_and_type.css` so the OKLCH mapping cannot drift.

### Station 7 — Governance & version control: YELLOW (7/10)

- Inspected: ruleset, PR history, releases, issue list, `CONTRIBUTING.md`, templates, `CODEOWNERS`
- Evidence level: repo live · GitHub API live
- Findings:
  - [verified] A ruleset ("Basic") is active on the default branch: pull request required, deletion blocked. PR history shows work lands through PRs (#1 to #8 merged, #9 open).
  - [verified] `CONTRIBUTING.md` now documents the PR flow, the `BREAKING:` commit rule and releases; PR template, two issue templates and `CODEOWNERS` (one owner) exist.
  - [verified] The changelog is generated from commit subjects and the guidance is corrected; its auto-generated entry still trips markdown lint (MD012).
  - [verified] Issue tracker is small and clean: 1 issue, closed. The `BREAKING:` rule has not been exercised.
  - [verified] No required approvals and no required checks in the ruleset (single maintainer).
- Not inspected: how a breaking change would actually flow through a release.
- Deviations noted: non-semver build-id versions, documented.
- First move: Add required status checks to the ruleset, and exclude the auto-generated CHANGELOG entry from MD012 or format it in the workflow.

### Station 8 — Feedback & adoption: YELLOW (5/10)

- Measured: this repo only, with `scripts/scan-token-adoption.mjs`
- Evidence level: code live · consumers not reachable
- Findings:
  - [verified] Baseline token use: `preview/` 96%, `ui_kits/` 67%, `social/` 100%.
  - [verified] No consumer repos scanned (portfolio site, iOS apps); no usage analytics; the only feedback path is the issue templates.
  - [reported] User states this is for a wider share; no external consumers yet.
- Not inspected: consumer repos, release download counts.
- Deviations noted: solo system; the maintainer is the consumer.
- First move: Run the scanner against your portfolio and iOS app repos and record the counts in the next report.

### Station 9 — Machine-readable docs & context: GREEN (8/10)

- Inventoried: `llms.txt`, generated `tokens.json` and `components.json`, `CLAUDE.md` (rules, class table, naming, contrast pairing), `SKILL.md` · Generation test: run four times earlier this session (cold agent, settings page)
- Evidence level: code live
- Findings:
  - [verified] Machine-readable layer is generated from source (`colors_and_type.css`, `components.css`) with a CI drift check, which passed.
  - [verified] The fourth cold-agent run used only classes that exist, 0 undefined tokens, 0 hex or inline SVG, and about 4 lines of its own CSS; its 15 stumbles were minor. That test is the proof this station requires.
  - [verified] `components.css` itself is hand-written (the source), so the layer is derived, not hand-maintained.
  - [verified] No DTCG-format token export and no per-component anti-pattern metadata beyond the `@use` line.
- Not inspected: generation test against the migrated previews and a different task shape.
- Deviations noted: none.
- First move: Re-run the generation test on a different page (a card grid) after the next component is added.

### Station 10 — Agent access: YELLOW (5/10)

- Surfaces mapped: `SKILL.md` (Agent Skill), `llms.txt`, `CLAUDE.md`, generated JSON; no MCP, no Code Connect · Live test: cold agents read the files directly (four runs); no MCP path tested
- Evidence level: code live
- Findings:
  - [verified] Agents reach the system through files and the skill; this works well (Station 9 test), but it is the only surface.
  - [verified] No MCP or knowledge-graph surface; Figma MCP present but unauthenticated, so no Code Connect.
  - [verified] No integration doc for other teams' agents on wiring the release zip in.
- Not inspected: reachability from Cursor or Copilot.
- Deviations noted: none.
- First move: Authenticate the Figma MCP and add Code Connect for the button and input, or publish a small MCP over `tokens.json` and `components.json`.

## What changed since last inspection

|  # | Station                         | Before |  Now | Change |
|---:|:--------------------------------|-------:|-----:|-------:|
|  1 | Coverage & gaps                 |      5 |    6 |     +1 |
|  2 | Best practices                  |      5 |    6 |     +1 |
|  3 | Accessibility                   |      5 |    6 |     +1 |
|  4 | Shared language                 |      6 |    6 |      0 |
|  5 | Testing & validation            |      6 |    6 |      0 |
|  6 | Orchestration                   |      4 |    6 |     +2 |
|  7 | Governance & version control    |      6 |    7 |     +1 |
|  8 | Feedback & adoption             |      4 |    5 |     +1 |
|  9 | Machine-readable docs & context |      6 |    8 |     +2 |
| 10 | Agent access                    |      4 |    5 |     +1 |
|    | **Overall**                     | **51** |**61**|**+10** |

- Lights turned off: Station 9 is now green. Contrast, focus and reduced-motion, iOS palette copy, CONTRIBUTING, the release path, and the failed-to-document exceptions are closed.
- New lights: PR #9 introduces three CI failures (form submit button, markdown lint, pa11y), none of which existed on `main`.
- Corrections to my first report, found this pass: I said `main` looked pushed to directly and had no distributed artifact. PR history shows work lands through PRs (squash merges hide the merge commits), and GitHub Releases already existed (three, latest `2026.06.11-7`). Both findings were wrong and are corrected above.
- Still open from the last work order: #7 first release cut, #8 token renames, #10 Figma/Code Connect/MCP, #11 consumer adoption scan.

## Related course lessons

Lesson lookup was unavailable this run (the earlier catalog fetch returned only a truncated page), so no lessons are recommended.

## Next service

- Work order: `ds-inspection/work-orders/2026-11-18-work-order-2.md`
- Recommended cadence: deep inspection quarterly; everyday checks already in CI: stations 3, 5, 6; to add: required status checks (5, 7)
- Re-inspect by: 2027-02-18

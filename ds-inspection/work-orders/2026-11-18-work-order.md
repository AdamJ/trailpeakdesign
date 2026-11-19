# Work Order — Trail Peak Design System

_From inspection: `reports/2026-11-18-inspection.md` · Written: 2026-11-18_

Reds get fixed now. Yellows get scheduled. Greens get left alone (and celebrated). Every item cites its station and evidence. The team owns prioritization; this is the technician's recommendation.

## 🔴 Fix now (reds)

None. No station scored red. Items 1–3 below are the highest-leverage yellows because you are about to share the system.

## 🟡 Schedule (yellows)

### 1. Fix failing contrast pairs at the token level
- **Station:** 3 · **Evidence:** [verified] computed from tokens: stone/tan 3.26, dark mist/bark-raise 3.84, dark rust-light/bark 3.57, moss/dune 4.25, dark moss/soil 2.77, clay on sand 3.40, dark border 1.78
- **First move:** Adjust `--fg-muted`, dark `--bg-3`, `.eyebrow` (add dark override), and decide where `--accent` may be text. · **Done when:** all semantic text pairs ≥4.5:1 and non-text ≥3:1 in both themes
- **Suggested timing:** this sprint · **Effort:** S

### 2. Reconcile CLAUDE.md/README with the artifacts
- **Station:** 2, 9 · **Evidence:** [verified] `--ink-pure`/`--paper-pure` vs "no pure black/white"; 4px button borders vs "1px only"; code radius md vs sm; inline SVGs
- **First move:** For each rule, fix the artifact or write the exception into CLAUDE.md. · **Done when:** no documented rule has a known violation
- **Suggested timing:** this sprint · **Effort:** S

### 3. Branch protection + CI that can't be bypassed
- **Station:** 5, 7 · **Evidence:** [verified] 0 merge commits; checks are PR-only
- **First move:** Require the 4 PR checks on main. · **Done when:** a direct push to main is rejected · **Effort:** S
- **Suggested timing:** this sprint

### 4. Remove the iOS kit palette copy
- **Station:** 6, 2 · **Evidence:** [verified] `screens.jsx` TP: tan `#D4C4A8` ≠ `#C9B89A`, sage `#8FA085` ≠ `#86A994`; 33+16 hex/rgb hits
- **First move:** Read CSS variables instead of the `TP` object; add a token for `emberDark` if needed. · **Done when:** ui_kits has 0 hex literals outside `design-allow` · **Effort:** M
- **Suggested timing:** this quarter

### 5. Make the token CI check the whole tree, plus add a contrast script
- **Station:** 5 · **Evidence:** [verified] `check-design-tokens.mjs` inspects added lines only
- **First move:** Add a `--all` mode and a Node contrast checker for both themes. · **Done when:** CI fails on a contrast regression · **Effort:** M
- **Suggested timing:** this quarter

### 6. Add focus styles and `prefers-reduced-motion`
- **Station:** 3 · **Evidence:** [verified] focus rules in 3 files; 0 reduced-motion
- **First move:** Global `:focus-visible` ring token and a reduced-motion block in `colors_and_type.css`. · **Done when:** all previews show a visible focus ring · **Effort:** S
- **Suggested timing:** this sprint

### 7. Decide distribution and the next components
- **Station:** 1 · **Evidence:** [verified] no package; missing table/dialog/tabs/checkbox/tooltip
- **First move:** Pick the delivery route (GitHub release / CDN / npm) and the next five components. · **Done when:** a consumer can install a versioned artifact · **Effort:** M–L
- **Suggested timing:** before sharing

### 8. Naming cleanup + written naming rule
- **Station:** 4 · **Evidence:** [verified] `bg-3` vs `bg-secondary`; `-light`/`-raise`/`mist`; `text-*` vs `fg-*` duplicates
- **First move:** Write the rule in CLAUDE.md, deprecate duplicates, record as breaking in CHANGELOG. · **Done when:** one name per concept · **Effort:** S–M
- **Suggested timing:** this quarter

### 9. Governance basics: CONTRIBUTING, breaking-change rule, CHANGELOG `Unreleased`
- **Station:** 7 · **Evidence:** [verified] no CONTRIBUTING; no `## Unreleased`; malformed latest entry
- **First move:** Add CONTRIBUTING.md; mark token renames/removals as breaking. · **Done when:** a rename produces a visible migration note · **Effort:** S
- **Suggested timing:** this quarter

### 10. Machine-readable layer and generation test
- **Station:** 9, 10 · **Evidence:** [verified] no llms.txt/DTCG/metadata; test not run
- **First move:** After item 2, run the "build a settings form" test and log stumbles; then generate `tokens.json` from the CSS. · **Done when:** test passes with minor stumbles · **Effort:** M
- **Suggested timing:** before sharing

### 11. Establish adoption tracking
- **Station:** 8 · **Evidence:** [verified] no data
- **First move:** Grep your own sites/apps for hex vs `var(--…)`; log the count. · **Done when:** a number exists each quarter · **Effort:** S
- **Suggested timing:** this quarter

### 12. Triage `Claude outputs/`
- **Station:** 7 · **Evidence:** [verified] untracked; `MIGRATION.md` describes a different, shared production Figma file
- **First move:** Review the content; delete or move it out of this repo before any commit. · **Done when:** folder is gone or ignored · **Effort:** S
- **Suggested timing:** now

## 🔧 Access upgrades (sharper next inspection)

- Authenticate the Figma MCP (you run the auth in your client) so Stations 1, 2, 3, 6 can diff the real library: variables ↔ tokens, component names ↔ previews, design-side contrast.
- Provide GitHub issues/PR/branch-protection data (`gh` access) for Stations 7, 8.
- Grant a consumer repo (portfolio site or iOS app) for adoption scanning.

## 🟢 Keeping the greens green

No greens yet. Credits to protect: the pa11y/html-validate/markdownlint CI set, the offset-only shadow discipline, and the tidy token file.

## Cadence

- Re-inspect (deep, all stations): 2027-02-18
- Everyday checks to wire into CI now: token contrast (both themes), full-tree hex scan, naming rule
- Owner of this work order: Adam Jolicoeur · Review: your own monthly design-system review

## Progress (2026-11-18, uncommitted)

- 1 Contrast: done except dark `--border` (1.78:1, needs a decision on a new input-border token) and light `--fg-muted` on `--bg-3` (handled by pairing rule). Changed `--earth-mist`, `--trail-rust-light`; added `--trail-moss-deep`, `--accent-alt-text`, `--focus-ring`. shadcn theme, READMEs, previews updated.
- 2 Docs reconcile: done. Exceptions written into CLAUDE.md; inline SVGs in `preview/buttons.html` replaced with Phosphor; code radius fixed to `--radius-sm`.
- 4 iOS kit: done. `TP` now uses `var(--token)`; one literal left (`emberDark`, design-allow).
- 5 CI: contrast script added (`scripts/check-token-contrast.mjs`) and wired into `design-tokens-check.yml`. Full-tree hex scan not done.
- 6 Focus + reduced motion: done in `colors_and_type.css`.
- 9 Governance: `CONTRIBUTING.md` added; CHANGELOG guidance corrected (generated from commit subjects, `BREAKING:` prefix).
- Not started: 3 (GitHub branch protection, your settings), 7 (distribution decision), 8 (naming renames are breaking), 10, 11, 12 (needs your call on `Claude outputs/`).

## Progress, round 2 (2026-11-18, uncommitted)

- 8 Naming: written rule in CLAUDE.md; no renames made (breaking). Open decisions: rename `--bg-3`, retire `--text-*`, unify `-light`/`-raise`/`mist`.
- 10 Machine-readable: `llms.txt`, generated `tokens.json` (82 tokens), pointers in CLAUDE.md and SKILL.md. Generation test NOT run, so no green yet.
- 11 Adoption: `scripts/scan-token-adoption.mjs`. Baseline this repo: preview 96% tokenized, ui_kits 67%, social 100%. Consumer sites/apps not scanned (paths unknown).
- 10 Generation test RUN (cold agent, settings page): 0 hex/rgb, 0 svg, 0 blur, 0 undefined tokens, 1px borders, no pure black/white. 15 stumbles logged, mostly missing component specs; fixed in CLAUDE.md "Component recipes". Re-run the test to confirm.
- 10 Re-run: 14 stumbles (down from 15), mostly dark-mode specs and page shell. Patched in CLAUDE.md recipes (dark button/card/secondary, page shell, hover conflict resolved in README, a11y markup, theme snippet). Third run still needed to confirm.
- 10 Third run: 0 hex/rgb/svg/blur/undefined tokens, agent rated docs "mostly sufficient"; remaining stumbles are minor recipe gaps (danger/secondary border colors, labels, hints, headings on form pages, dark `--shadow-card`, unversioned Phosphor URL). README 1px-button contradiction fixed. Station 9 suggested score 7/10; not green because recipes are hand-maintained, not generated.
- 10 components.css added (shipped, token-only) to remove recipe drift: `.tp-btn*`, `.tp-card`, `.tp-field/.tp-input/.tp-check`, page shell. New tokens `--accent-foreground`, `--shadow-ink`, `--input-border` (also closes the dark input-border item from #1). New `preview/components.html` registered in PREVIEWS.md and .pa11yci.json; included in release zip. Needs a fourth cold run against the classes to confirm.
- 10 Fourth run (against components.css): 0 hex/rgb/svg, 0 undefined tokens, 0 missing classes, 4 lines of page CSS (1 dead). 15 stumbles, none about core component styling; fixed: `color-scheme` per theme, zip-vs-repo files, markup placement notes. Station 9 suggested 8/10 (green) with the caveat that components.css is hand-written.
- 10 Generated layer: `scripts/build-components-json.mjs` derives `components.json` + the CLAUDE.md class table from `components.css` (`@use` doc comments) and lints it; CI step fails on stale generated files. Previews `buttons`, `card`, `form-fields` now use `components.css`; added `.tp-btn--outline/--icon/--social`. Not migrated (no matching classes): badges, navigation, footer, shadcn-theme, logo, colors pages, ui_kits, social.
- 3 branch protection: done by user. 12: ignored by user's choice.
- 7 Distribution: GitHub Releases chosen. Added `.github/workflows/release.yml` (tag push `20*` or manual dispatch), documented in CLAUDE.md and CONTRIBUTING.md. First release not cut.

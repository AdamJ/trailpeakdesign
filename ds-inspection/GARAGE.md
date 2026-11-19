# GARAGE.md — Trail Peak Design System
_Checked in: 2026-11-18 · Re-confirm at next inspection_

## Vehicle
- System: Trail Peak, serving Adam Jolicoeur's portfolio/marketing site, companion iOS apps (Time Tracker Pro, The Magic Collection), social cards, shadcn/ui web apps
- Team: 1 (solo founding designer, side-of-desk) · Consumers: ~3-4 own surfaces, none in this repo
- Age: first commit 2026-04-21 (~7 months), 12 commits on main, no major rebuilds
- Reason for service: pre-launch/share — preparing to share the system more widely

## Assets
- Design library: Figma "Trail Peak Design Library" (pages: Cover, Badge, Buttons, Cards, Code, Divider, Footer, Icons, Link, List, Navigation, Page, Sections, Texts, Social) — per README, not read
- Code library: CSS-only, no build. `colors_and_type.css` tokens + `shadcn/theme.css` (Tailwind v4 / OKLCH). Repo AdamJ/trailpeakdesign. No package, no npm distribution
- Docs: README.md, PREVIEWS.md, `preview/*.html` specimens, ui_kits (marketing site, iOS), shadcn/README.md. No Storybook/docs site
- Process: GitHub issue templates (bug, design_change), PR template, CODEOWNERS, auto build-id CHANGELOG, 5 GitHub workflows
- AI surface: CLAUDE.md, SKILL.md (Agent Skill entry). No MCP, llms.txt, or Code Connect

## Evidence access map
| Asset | Access | Verified how |
|---|---|---|
| Design library | interview/none | Figma MCP (plugin_figma_figma) present but unauthenticated; user chose to skip design side. No bridge call possible |
| Code library | live | Read colors_and_type.css, shadcn/theme.css, scripts, preview/ui_kits via grep |
| Docs | live | Read README, PREVIEWS, CLAUDE.md, READMEs in repo |
| Process | live (repo only) | Read workflows, templates, CODEOWNERS, git log. GitHub issues/PRs/branch protection not queried |

## Known symptoms
- None supplied by user.

## Probable greens
- None supplied.

## Intentional deviations
- Build-id versions (`YYYY.MM.DD-N`), not semver — documented in CHANGELOG.md
- CSS-only, no build — documented in CLAUDE.md
- Offset-only shadows, no blur — documented

## Scope & frame
- Stations this pass: all 10 · Scoring frame: solo
- Out of scope: Figma library contents (not reachable)

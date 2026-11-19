# Contributing to Trail Peak

Read `CLAUDE.md` first for tokens, design constraints, and CI. Short version:

1. Branch from `main` and open a pull request. Do not push to `main` directly.
2. Define tokens only in `colors_and_type.css`. If a token appears in `shadcn/theme.css`, update it and `shadcn/README.md` too.
3. Use `var(--token)` values. No hardcoded colors, no blurred shadows (see exceptions in `CLAUDE.md`).
4. Add or update a `preview/*.html` page for any new component or token. List it in `PREVIEWS.md` and `.pa11yci.json`.
5. Check contrast for both light and `.dark` themes against the pairing rules in `CLAUDE.md`.
6. Update `README.md` and `CLAUDE.md` when content changes. `CHANGELOG.md` is generated.

## Breaking changes

Renaming or removing a token, class, or changing a token's value in a way that shifts color or size is breaking. Start the commit subject with `BREAKING:` and describe the migration in the PR body, for example: `BREAKING: rename --bg-3 to --bg-tertiary (replace all uses)`.

## Releases

Consumers install from [GitHub Releases](https://github.com/AdamJ/trailpeakdesign/releases). To publish one, tag a `main` commit with its build id and push the tag (for example `git tag 2026.11.18-14 && git push origin 2026.11.18-14`), or run the Release workflow manually. The release holds `colors_and_type.css`, `tokens.json`, and a zip with fonts, assets, the shadcn theme, and docs. Notes come from commit subjects, so `BREAKING:` subjects surface there.

## Issues

Use the bug report or design change template.

# Trail Peak — Shadcn/ui Theme

A [shadcn/ui](https://ui.shadcn.com/) theme (Tailwind v4, `@theme inline` /
OKLCH) generated from the Trail Peak Design System tokens in
`../colors_and_type.css`.

## Setup

1. Install shadcn/ui in your project (`npx shadcn@latest init`) if you
   haven't already — this theme assumes the standard `new-york` component
   set and Tailwind v4.
2. Copy `theme.css` over your project's `app/globals.css` (or `@import` it
   from there). Keep any project-specific `@import "tailwindcss"` /
   `tw-animate-css` lines you already have — `theme.css` includes both.
3. Copy `../fonts/*.ttf` into your project's `public/fonts/` directory (or
   adjust the `url()` paths in the `@font-face` blocks at the top of
   `theme.css` to wherever you serve static fonts).
4. Run the app and toggle `.dark` on `<html>` to confirm both themes.

## Token mapping

Every shadcn variable below traces back to a Trail Peak token in
`colors_and_type.css`. "New" rows are colors invented for this theme because
shadcn requires roles the design system doesn't define yet (destructive
state, a lighter dark-mode neutral, an extra dark-mode surface step) — they
were chosen to stay inside the earth/trail palette and pass contrast
checks (see below).

| Shadcn variable | Light value | Dark value | Trail Peak source |
| --- | --- | --- | --- |
| `--background` | earth-sand | earth-soil | `--earth-sand` / `--earth-soil` |
| `--foreground` | earth-soil | earth-sand | `--fg-primary` / `--fg-inverse` |
| `--card`, `--popover` | earth-sand | earth-bark | flat cream surface; bark for dark "raised" panels |
| `--primary` | trail-ember | trail-ember | `--accent-strong` (primary button fill) |
| `--primary-foreground` | earth-sand | earth-sand | cream text on the primary button |
| `--secondary`, `--muted` | earth-dune | earth-bark | `--bg-secondary` |
| `--muted-foreground` | earth-bark | earth-mist *(new)* | needs ≥4.5:1 on muted bg |
| `--accent` | earth-tan | earth-bark-raise *(new)* | `--bg-3`; subtle hover/selected surface |
| `--accent-foreground` | earth-soil | earth-sand | |
| `--destructive` | trail-rust *(new)* | trail-rust, lightened | brick red in the same warm family as trail-clay/ember |
| `--destructive-foreground` | earth-sand | earth-soil | |
| `--border`, `--input` | earth-bark | earth-bark-raise *(new)* | brand's signature 1px hairline |
| `--ring` | trail-clay | trail-clay | `--accent` (interaction color) |
| `--chart-1..5` | clay / moss / ember / sage / stone | clay / sage / ember / moss / mist | full trail palette |
| `--sidebar-primary` | trail-moss | trail-moss | `--accent-alt`, reserved for nav per brand |

### New colors

| Name | Hex (approx) | Used for | Why |
| --- | --- | --- | --- |
| `trail-rust` | `#9B2A20` | `--destructive` (light) | The system has no error/danger color. This sits in the same warm-red family as trail-clay/trail-ember but is desaturated and dark enough to hit AA on cream (6.78:1) and with white/cream text on it (7.65:1 / 6.78:1). |
| `trail-rust` (dark) | `#E06C5A` | `--destructive` (dark) | Lightened so it reads on `earth-soil`; pairs with `earth-soil` text at 4.91:1. |
| `earth-mist` | `#B4A89C` | `--muted-foreground` (dark) | `earth-stone` only hits 2.5:1 on dark surfaces. This lighter warm neutral hits 6.85:1 on `earth-soil` and 4.98:1 on `earth-bark`. |
| `earth-bark-raise` | `#5E4432` | `--accent`, `--border`, `--input`, `--card` borders (dark) | A half-step lighter than `earth-bark`, used to give dark-mode surfaces a visible elevation step without introducing a new hue. |

## Accessibility notes

Contrast ratios were checked against WCAG 2.1 AA (4.5:1 normal text, 3:1
large text / UI components):

- **Body text** (`foreground` on `background`, `card-foreground` on `card`,
  `secondary-foreground` on `secondary`, `muted-foreground` on `muted`) —
  all ≥ 6.8:1 in both themes.
- **Primary button** (`primary-foreground` on `primary`, earth-sand on
  trail-ember) — 4.74:1, passes AA for normal text in both themes.
- **Destructive button** — 6.78:1 (light) / 4.91:1 (dark), passes AA.
- **Focus ring** (`ring`, trail-clay) — 3.40:1 against both `background`
  values, meeting the 3:1 requirement for non-text UI/focus indicators
  (WCAG 2.4.11 / 1.4.11). Don't use trail-clay as a *text* color on cream
  or soil — at ~3.4–4.2:1 it fails AA for normal-size text.

### Deliberate departure from the design system's `--accent`

`colors_and_type.css` defines `--accent: var(--trail-clay)` for "links,
hover" — but trail-clay only reaches ~3.4:1 against the cream background,
which fails AA for normal body text. Shadcn's `--accent` role is typically
used as a hover/selected *surface* behind body-sized text (menu items,
dropdown rows, etc.), so this theme maps `--accent` to `earth-tan` /
`earth-bark-raise` instead — both pass AA with `earth-soil` / `earth-sand`
text.

Trail-clay is preserved as `--ring` (focus rings, 3:1 is sufficient for
non-text indicators) and remains the right choice for *large* text, icons,
underlined links, or borders where the brand's signature "trail marker"
color should show through.

### Usability notes

- `--border` and `--input` use full-strength `earth-bark` (light) /
  `earth-bark-raise` (dark) rather than a faint gray — this matches the
  brand's "crisp 1px hairline" language but reads slightly heavier than a
  typical shadcn theme. If a UI feels too "boxy" with dense tables, consider
  a `border-border/40` utility for internal dividers while keeping
  full-strength borders on cards and buttons.
- Never rely on `--accent` / `--ring` color alone to convey state — pair
  with the existing underline/shadow-shift patterns from
  `../preview/buttons.html` for hover/press feedback, consistent with the
  "never opacity-fade" rule in the main README.

## Radius

`--radius: 1rem` (16px), so `--radius-xl` (used by the shadcn `Card`
component) resolves to **20px** — exactly the brand's card radius. shadcn's
`Button` defaults to `rounded-md` (`--radius-md` = 14px here), 2px off the
brand's 12px button radius; if pixel-exact buttons matter, override with
`rounded-sm` (12px) on the `Button` component.

## Fonts

- `--font-sans` → Inter (body, UI)
- `--font-serif` → Playfair Display (H1–H3, applied automatically to
  `h1`/`h2`/`h3` via `@layer base`)
- `--font-mono` → Fira Code (code)
- `--font-display` → Pirata One (poster/display moments — opt in per
  element, not applied globally)

## Preview

A static HTML preview of common shadcn components styled with this theme
(light + dark) is at
[`../preview/shadcn-theme.html`](../preview/shadcn-theme.html).

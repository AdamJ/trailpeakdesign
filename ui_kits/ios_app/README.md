# Trail Peak — iOS App UI Kit

A click-thru iOS app recreation applying Trail Peak's visual language to native iOS patterns. Based on **Time Tracker Pro** — the solo-consultant timer + invoicing app referenced on the marketing site.

## Preview

**Requires a local server** — `index.html` loads the `.jsx` files via XHR (Babel standalone), which Chrome and Safari block on `file://`. Two options:

- **VS Code Live Server** — right-click `index.html` → "Open with Live Server"
- **Terminal** — run `npx serve .` from the repo root, then open `http://localhost:3000/ui_kits/ios_app/`

Firefox works with `file://` directly and needs no server.

## Screens

Five app screens + native controls showcase:

- **Projects** — list of active projects with weekly totals and bottom tab bar
- **Timer** — active timer with large display type and project picker (no tab bar; pushed view)
- **New Entry** — manual time entry form with keyboard (no tab bar; modal sheet)
- **Reports** — weekly bar chart, daily breakdown, project percentage breakdown
- **Settings** — profile card, billing prefs, timer options, export actions

Plus a **Controls** tab showcasing all native iOS controls in Trail Peak brand style.

Uses the `ios_frame.jsx` starter (device bezel, status bar, dynamic island, home indicator) and overrides the content with Trail Peak's earthen palette, Playfair serif headings, and signature offset shadow cards.

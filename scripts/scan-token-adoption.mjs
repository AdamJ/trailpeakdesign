#!/usr/bin/env node
// Counts token use vs hardcoded colors in one or more project directories.
// Usage: node scripts/scan-token-adoption.mjs <dir> [<dir> ...]

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const EXT = new Set([".css", ".html", ".jsx", ".tsx", ".ts", ".js", ".astro", ".vue", ".svelte"]);
const SKIP = new Set(["node_modules", ".git", "dist", "build", ".next", "fonts"]);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (EXT.has(extname(p))) yield p;
  }
}

const dirs = process.argv.slice(2);
if (dirs.length === 0) {
  console.error("Usage: node scripts/scan-token-adoption.mjs <dir> [<dir> ...]");
  process.exit(2);
}

for (const dir of dirs) {
  let tokens = 0, hex = 0, rgb = 0, files = 0;
  for (const file of walk(dir)) {
    files++;
    for (const line of readFileSync(file, "utf8").split("\n")) {
      if (line.includes("design-allow")) continue;
      tokens += (line.match(/var\(--(earth|trail|fg|bg|accent|border|danger|focus|space|radius|fs|font|shadow|overlay)[\w-]*\)/g) || []).length;
      hex += (line.match(/#[0-9a-fA-F]{3,8}\b/g) || []).length;
      rgb += (line.match(/\brgba?\(/g) || []).length;
    }
  }
  const total = tokens + hex + rgb;
  const pct = total ? Math.round((tokens / total) * 100) : 0;
  console.log(`${dir}: ${files} files · ${tokens} token refs · ${hex} hex · ${rgb} rgb() · ${pct}% tokenized`);
}

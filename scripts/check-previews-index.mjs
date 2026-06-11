#!/usr/bin/env node
// Verifies every preview/*.html page is linked from PREVIEWS.md so new
// component/token previews don't go undocumented.

import { readFileSync, readdirSync } from 'node:fs';

// preview.html is the hub page itself, not an entry within it.
const EXCLUDED = new Set(['preview.html']);

const previewsMd = readFileSync('PREVIEWS.md', 'utf8');
const previewFiles = readdirSync('preview')
  .filter((f) => f.endsWith('.html'))
  .filter((f) => !EXCLUDED.has(f));

const missing = previewFiles.filter((f) => !previewsMd.includes(`/preview/${f}`));

if (missing.length === 0) {
  console.log('All preview pages are listed in PREVIEWS.md.');
  process.exit(0);
}

console.log(`## PREVIEWS.md is missing ${missing.length} page(s)\n`);
for (const f of missing) {
  console.log(`::error file=PREVIEWS.md::Missing link to /preview/${f} — add it to PREVIEWS.md`);
  console.log(`- preview/${f}`);
}
process.exitCode = 1;

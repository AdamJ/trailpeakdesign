#!/usr/bin/env node
// Generates tokens.json from colors_and_type.css so machine consumers
// (agents, design tools) read the same values as the CSS. Run: node scripts/build-tokens-json.mjs

import { readFileSync, writeFileSync } from "node:fs";

const css = readFileSync("colors_and_type.css", "utf8");

function parseBlock(selector) {
  const start = css.indexOf(`${selector} {`);
  const end = css.indexOf("\n}", start);
  const vars = {};
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g;
  const body = css.slice(start, end);
  let m;
  while ((m = re.exec(body))) vars[m[1]] = m[2].replace(/\/\*.*?\*\//g, "").trim();
  return vars;
}

function group(name) {
  if (/^--(earth|trail|ink|paper)-/.test(name)) return "palette";
  if (/^--(shadow|overlay)-/.test(name)) return "shadow-color";
  if (/^--(fg|bg|accent|border|danger|focus|text)/.test(name)) return "semantic";
  if (/^--font-/.test(name)) return "font";
  if (/^--fs-/.test(name)) return "font-size";
  if (/^--space-/.test(name)) return "space";
  if (/^--radius-/.test(name)) return "radius";
  return "motion";
}

const light = parseBlock(":root");
const dark = parseBlock(".dark");
const out = { $description: "Generated from colors_and_type.css. Do not edit by hand.", tokens: {} };
for (const [name, value] of Object.entries(light)) {
  const entry = { group: group(name), value };
  if (dark[name]) entry.dark = dark[name];
  out.tokens[name] = entry;
}
writeFileSync("tokens.json", JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote tokens.json (${Object.keys(out.tokens).length} tokens).`);

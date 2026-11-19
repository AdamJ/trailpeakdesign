#!/usr/bin/env node
// Computes WCAG contrast for the semantic token pairs in colors_and_type.css,
// in light (:root) and dark (.dark). Fails if a pair drops below its minimum.
// Pairs listed in CLAUDE.md as "not allowed" are intentionally not checked.

import { readFileSync } from "node:fs";

const css = readFileSync("colors_and_type.css", "utf8");

function parseBlock(selector) {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`Block not found: ${selector}`);
  const end = css.indexOf("\n}", start);
  const vars = {};
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g;
  const body = css.slice(start, end);
  let m;
  while ((m = re.exec(body))) vars[m[1]] = m[2].replace(/\/\*.*?\*\//g, "").trim();
  return vars;
}

const light = parseBlock(":root");
const dark = { ...light, ...parseBlock(".dark") };

function resolve(vars, name, depth = 0) {
  const value = vars[name];
  if (value === undefined || depth > 10) throw new Error(`Cannot resolve ${name}`);
  const ref = /^var\((--[\w-]+)\)$/.exec(value);
  if (ref) return resolve(vars, ref[1], depth + 1);
  const rgb = /^rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/.exec(value);
  if (!rgb) throw new Error(`${name} is not an opaque rgb() value: ${value}`);
  return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
}

function luminance([r, g, b]) {
  const [R, G, B] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const TEXT = 4.5;
const NON_TEXT = 3;

const PAIRS = {
  light: [
    ["--fg-primary", "--bg-page", TEXT],
    ["--fg-primary", "--bg-secondary", TEXT],
    ["--fg-primary", "--bg-3", TEXT],
    ["--fg-secondary", "--bg-page", TEXT],
    ["--fg-secondary", "--bg-secondary", TEXT],
    ["--fg-secondary", "--bg-3", TEXT],
    ["--fg-muted", "--bg-page", TEXT],
    ["--fg-muted", "--bg-secondary", TEXT],
    ["--accent-strong", "--bg-page", TEXT],
    ["--accent-alt-text", "--bg-page", TEXT],
    ["--accent-alt-text", "--bg-secondary", TEXT],
    ["--danger", "--bg-page", TEXT],
    ["--danger-foreground", "--danger", TEXT],
    ["--fg-inverse", "--bg-dark", TEXT],
    ["--fg-muted-inverse", "--bg-dark", TEXT],
    ["--focus-ring", "--bg-page", NON_TEXT],
    ["--border", "--bg-page", NON_TEXT],
    ["--input-border", "--bg-page", NON_TEXT],
    ["--accent-foreground", "--accent-strong", TEXT],
  ],
  dark: [
    ["--fg-primary", "--bg-page", TEXT],
    ["--fg-primary", "--bg-secondary", TEXT],
    ["--fg-primary", "--bg-3", TEXT],
    ["--fg-secondary", "--bg-page", TEXT],
    ["--fg-secondary", "--bg-secondary", TEXT],
    ["--fg-secondary", "--bg-3", TEXT],
    ["--fg-muted", "--bg-page", TEXT],
    ["--fg-muted", "--bg-secondary", TEXT],
    ["--fg-muted", "--bg-3", TEXT],
    ["--accent-alt-text", "--bg-page", TEXT],
    ["--danger", "--bg-page", TEXT],
    ["--danger", "--bg-secondary", TEXT],
    ["--danger-foreground", "--danger", TEXT],
    ["--focus-ring", "--bg-page", NON_TEXT],
    ["--input-border", "--bg-page", NON_TEXT],
    ["--input-border", "--bg-secondary", NON_TEXT],
    ["--accent-foreground", "--accent-strong", TEXT],
  ],
};

let failures = 0;
for (const [theme, vars] of [["light", light], ["dark", dark]]) {
  for (const [fg, bg, min] of PAIRS[theme]) {
    const r = ratio(resolve(vars, fg), resolve(vars, bg));
    const pass = r >= min;
    if (!pass) {
      failures++;
      console.log(`::error file=colors_and_type.css::${theme}: ${fg} on ${bg} is ${r.toFixed(2)}:1, needs ${min}:1`);
    }
    console.log(`${pass ? "ok  " : "FAIL"} ${theme.padEnd(5)} ${fg} on ${bg}: ${r.toFixed(2)}:1 (min ${min})`);
  }
}

if (failures > 0) process.exitCode = 1;
else console.log("All token contrast pairs pass.");

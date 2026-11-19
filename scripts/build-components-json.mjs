#!/usr/bin/env node
// Derives components.json and the class table in CLAUDE.md from components.css,
// and lints components.css. Run: node scripts/build-components-json.mjs
// Exits 1 on lint errors (hardcoded colors, undefined tokens, missing @use).

import { readFileSync, writeFileSync } from "node:fs";

const css = readFileSync("components.css", "utf8");
const tokenCss = readFileSync("colors_and_type.css", "utf8");

const defined = new Set([...tokenCss.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
const errors = [];

// Parse "@use" doc comments, then strip comments for rule parsing.
const uses = {};
const docRe = /\/\*\*\s*@use\s+([\s\S]*?)\*\/\s*([^{]+)\{/g;
let d;
while ((d = docRe.exec(css))) {
  const cls = /\.(tp-[\w-]+)/.exec(d[2]);
  if (cls) uses[cls[1]] = d[1].trim().replace(/\s+/g, " ");
}
const bare = css.replace(/\/\*[\s\S]*?\*\//g, "");

for (const m of bare.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(/g)) {
  errors.push(`Hardcoded color ${m[0]} in components.css`);
}

const components = {};
const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
let r;
while ((r = ruleRe.exec(bare))) {
  const selectors = r[1].split(",").map((s) => s.trim()).filter(Boolean);
  const body = r[2];
  const local = new Set([...body.matchAll(/(--tp-[\w-]+)\s*:/g)].map((m) => m[1]));
  const tokens = [...body.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]);
  for (const t of tokens) {
    if (!defined.has(t) && !local.has(t) && !t.startsWith("--tp-")) errors.push(`Undefined token ${t}`);
  }
  for (const sel of selectors) {
    const classes = [...sel.matchAll(/\.(tp-[\w-]+)/g)].map((m) => m[1]);
    if (classes.length === 0) continue;
    const subject = classes[classes.length - 1];
    const base = subject.split("--")[0];
    const c = (components[base] ??= { use: uses[base] ?? null, variants: new Set(), states: new Set(), tokens: new Set(), darkTokens: new Set() });
    if (subject.includes("--")) c.variants.add(subject);
    for (const s of sel.matchAll(/:(hover|active|focus|disabled)|\[aria-[\w-]+="[^"]*"\]|\.is-hover/g)) c.states.add(s[0]);
    const target = /\.dark\b/.test(sel) ? c.darkTokens : c.tokens;
    for (const t of tokens) target.add(t);
  }
}

for (const [name, c] of Object.entries(components)) {
  if (!c.use) errors.push(`.${name} has no "/** @use ... */" doc comment`);
}

const out = { $description: "Generated from components.css. Do not edit by hand.", components: {} };
for (const [name, c] of Object.entries(components)) {
  out.components[name] = {
    use: c.use,
    variants: [...c.variants].sort(),
    states: [...c.states].sort(),
    tokens: [...c.tokens].sort(),
    darkTokens: [...c.darkTokens].sort(),
  };
}
writeFileSync("components.json", JSON.stringify(out, null, 2) + "\n");

const cells = Object.entries(out.components).map(([name, c]) => {
  const variants = c.variants.length ? ` + ${c.variants.map((v) => `\`${v.replace(name, "")}\``).join(", ")}` : "";
  return [`\`.${name}\`${variants}`, c.use ?? ""];
});
const header = ["Class", "Use"];
const widths = [0, 1].map((i) => Math.max(header[i].length, ...cells.map((r) => r[i].length)));
const fmt = (r) => `| ${r.map((c, i) => c.padEnd(widths[i])).join(" | ")} |`;
const table = [fmt(header), `| ${widths.map((w) => "-".repeat(w)).join(" | ")} |`, ...cells.map(fmt)].join("\n");
const md = readFileSync("CLAUDE.md", "utf8");
const start = "<!-- components:start -->";
const end = "<!-- components:end -->";
const i = md.indexOf(start), j = md.indexOf(end);
if (i === -1 || j === -1) errors.push("CLAUDE.md is missing the components:start/end markers");
else writeFileSync("CLAUDE.md", `${md.slice(0, i + start.length)}\n${table}\n${md.slice(j)}`);

for (const e of errors) console.log(`::error file=components.css::${e}`);
console.log(`Wrote components.json (${Object.keys(out.components).length} components).`);
if (errors.length) process.exitCode = 1;

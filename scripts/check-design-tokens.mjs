#!/usr/bin/env node
// Flags newly added hardcoded colors / blurred shadows in design surface files,
// so PRs don't quietly drift away from the tokens in colors_and_type.css and
// shadcn/theme.css. Only inspects *added* lines in the diff against the base
// branch, so existing inline values aren't flagged retroactively.
//
// Suppress a specific line by adding `/* design-allow */` to it.

import { execSync } from 'node:child_process';

const TOKEN_FILES = new Set(['colors_and_type.css', 'shadcn/theme.css']);

const CHECK_PREFIXES = ['preview/', 'ui_kits/', 'social/'];
const CHECK_EXTENSIONS = ['.html', '.jsx', '.css'];

const HEX_COLOR_RE = /#[0-9a-fA-F]{3,8}\b/g;
const RGB_FUNC_RE = /\brgba?\([^)]*\)/g;
const BOX_SHADOW_BLUR_RE = /box-shadow\s*:\s*[^;]*?(-?\d*\.?\d+)(px)\s+(-?\d*\.?\d+)(px)\s+(-?\d*\.?\d+)(px)/g;

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8' }).trim();
}

function getBaseRef() {
  return process.env.GITHUB_BASE_REF
    ? `origin/${process.env.GITHUB_BASE_REF}`
    : 'HEAD~1';
}

function shouldCheck(file) {
  if (TOKEN_FILES.has(file)) return false;
  if (!CHECK_EXTENSIONS.some((ext) => file.endsWith(ext))) return false;
  if (file.endsWith('.css')) return true;
  return CHECK_PREFIXES.some((prefix) => file.startsWith(prefix));
}

function main() {
  const base = getBaseRef();
  let diff;
  try {
    diff = sh(`git diff --unified=0 ${base}...HEAD`);
  } catch {
    diff = sh(`git diff --unified=0 ${base} HEAD`);
  }

  const violations = [];
  let currentFile = null;
  let currentLine = null;

  for (const rawLine of diff.split('\n')) {
    if (rawLine.startsWith('+++ b/')) {
      currentFile = rawLine.slice(6);
      continue;
    }
    if (rawLine.startsWith('@@')) {
      const match = /\+(\d+)/.exec(rawLine);
      currentLine = match ? parseInt(match[1], 10) : null;
      continue;
    }
    if (!currentFile || !shouldCheck(currentFile)) {
      if (rawLine.startsWith('+') && !rawLine.startsWith('+++')) currentLine++;
      continue;
    }
    if (rawLine.startsWith('+') && !rawLine.startsWith('+++')) {
      const content = rawLine.slice(1);
      if (!content.includes('design-allow')) {
        const hexMatches = content.match(HEX_COLOR_RE) || [];
        for (const m of hexMatches) {
          violations.push({
            file: currentFile,
            line: currentLine,
            message: `Raw hex color ${m} — use a var(--token) from colors_and_type.css / shadcn/theme.css instead.`,
          });
        }
        const rgbMatches = content.match(RGB_FUNC_RE) || [];
        for (const m of rgbMatches) {
          violations.push({
            file: currentFile,
            line: currentLine,
            message: `Raw color function ${m} — use a var(--token) from colors_and_type.css / shadcn/theme.css instead.`,
          });
        }
        let shadowMatch;
        BOX_SHADOW_BLUR_RE.lastIndex = 0;
        while ((shadowMatch = BOX_SHADOW_BLUR_RE.exec(content))) {
          const blur = parseFloat(shadowMatch[3]);
          if (blur !== 0) {
            violations.push({
              file: currentFile,
              line: currentLine,
              message: `box-shadow has a ${blur}px blur — Trail Peak shadows are offset-only with no blur.`,
            });
          }
        }
      }
      currentLine++;
    }
  }

  if (violations.length === 0) {
    console.log('No design-token violations found in the diff.');
    return;
  }

  console.log(`## Design token check: ${violations.length} issue(s) found\n`);
  for (const v of violations) {
    console.log(`::warning file=${v.file},line=${v.line}::${v.message}`);
    console.log(`- ${v.file}:${v.line} — ${v.message}`);
  }

  process.exitCode = 1;
}

main();

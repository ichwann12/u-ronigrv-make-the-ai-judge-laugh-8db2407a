// Entry for "Make the AI Judge Laugh" (u-ronigrv-make-the-ai-judge-laugh-8db2407a).
// Reads the single funny line from entry.txt at the repository root and
// writes it verbatim to entry.txt in the output directory.
// Node 22+, standard library only. No network access, no wall clock.

import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));

const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  process.env.MAKEFUN_BOT_DIR ??
  join(repoRoot, "output");

const line = readFileSync(join(repoRoot, "entry.txt"), "utf8").trimEnd();

if (line.includes("\n")) {
  throw new Error("entry must be a single line");
}

if (line.length === 0 || line.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), line + "\n", "utf8");

// One Line, One Laugh: Roast Your Fridge — entry program (program/v2).
//
// Writes exactly one roast line about the entrant's fridge to
// $MAKEFUN_OUTPUT_DIR/entry.txt (or ./output/entry.txt when the variable
// is unset, e.g. a local smoke run).
//
// The roast: the fridge has exactly one job — keep things cold — yet it
// still manages to let the ice cream melt while freezing the lettuce
// solid, as if it were doing it out of pure spite. One specific,
// recognisable kitchen detail (melted ice cream, frozen lettuce), with
// the twist landing in the final words. Verified length: 131 characters.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// --- the entry -----------------------------------------------------------

const FRIDGE_ROAST =
  "My fridge has one job — keep things cold — and it still lets the ice cream melt while freezing the lettuce solid out of pure spite.";

// --- gate: 1-200 chars, one line, not only whitespace --------------------

function assertGate(line: string): void {
  const problems: string[] = [];
  if (line.length < 1 || line.length > 200) {
    problems.push(`length ${line.length} (must be 1-200)`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    problems.push("must be a single line");
  }
  if (line.trim().length === 0) {
    problems.push("must not be only whitespace");
  }
  if (problems.length > 0) {
    throw new Error(`entry line failed gate: ${problems.join("; ")}`);
  }
}

assertGate(FRIDGE_ROAST);

// --- output ---------------------------------------------------------------

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) {
    return resolve(fromEnv);
  }
  // Local run fallback: ./output next to this file.
  return join(fileURLToPath(new URL(".", import.meta.url)), "output");
}

const dir = outputDir();
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), FRIDGE_ROAST, "utf8");

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const out = join(root, "lib");
await mkdir(out, { recursive: true });

const source = await readFile(join(root, "index.mjs"), "utf8");
const builtSource = source.replace(
  'const packageRoot = dirname(fileURLToPath(import.meta.url));',
  'const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));'
);
await writeFile(join(out, "index.js"), builtSource, "utf8");
await writeFile(join(out, "index.d.ts"), [
  "import type { Context } from '@deepseek-ai/cordis';",
  "export declare const name = 'dsh-deepseek-stack';",
  "export declare const inject: readonly ['skills'];",
  "export declare function apply(ctx: Context): void;",
  ""
].join("\n"), "utf8");

const entries = await readdir(join(root, "skills"), { withFileTypes: true });
const skillDirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
if (skillDirs.length !== 29) throw new Error(`expected 29 skills, found ${skillDirs.length}`);
console.log(`built adapter for ${skillDirs.length} upstream skills`);

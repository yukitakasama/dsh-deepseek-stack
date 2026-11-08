import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(new URL("..", import.meta.url).pathname.replace(/^\/(\w):/, "$1:"));
const packageJson = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
if (packageJson.dsh?.bundle?.patch !== "./cordis.patch.yml") {
  throw new Error("package.json must declare dsh.bundle.patch as ./cordis.patch.yml");
}
const patch = await readFile(join(root, "cordis.patch.yml"), "utf8");
if (!patch.includes("id: dsh-deepseek-stack") || !patch.includes("name: dsh-deepseek-stack")) {
  throw new Error("cordis.patch.yml must register the dsh-deepseek-stack entry");
}
const skillsRoot = join(root, "skills");
const entries = await readdir(skillsRoot, { withFileTypes: true });
const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
if (dirs.length !== 29) throw new Error(`expected 29 skills, found ${dirs.length}`);
for (const dir of dirs) {
  const file = join(skillsRoot, dir, "SKILL.md");
  const source = await readFile(file, "utf8");
  const name = /^name:\s*([^\r\n]+)$/m.exec(source)?.[1]?.trim().replace(/^"|"$/g, "");
  const description = /^description:\s*([^\r\n]+)$/m.exec(source)?.[1]?.trim();
  if (name !== dir) throw new Error(`${dir}: frontmatter name is ${name ?? "missing"}`);
  if (!description) throw new Error(`${dir}: description is missing`);
}
console.log(`checked ${dirs.length} upstream skills`);

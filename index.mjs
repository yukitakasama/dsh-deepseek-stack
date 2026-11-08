import { apply as applyFilesystemSkills } from "@deepseek-ai/dsh-skill-filesystem";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export const name = "dsh-deepseek-stack";
export const inject = ["skills"];

const packageRoot = dirname(fileURLToPath(import.meta.url));

export function apply(ctx) {
  applyFilesystemSkills(ctx, {
    providerName: name,
    includeDefaultRoots: false,
    bundledSkillDir: join(packageRoot, "skills"),
    watch: false
  });
}

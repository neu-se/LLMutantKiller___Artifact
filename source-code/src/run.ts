// src/run.ts
import "dotenv/config";
import { parseCliArgs } from "./config/cli";
import { MutationTestManager } from "./core/MutationTestManager";
import type { CliArgs } from "./types";
import { loadSingleMutation, loadProjectsFromFilter } from "./utils";

(async () => {
  const cliArgs: CliArgs = await parseCliArgs();
  const manager = new MutationTestManager(cliArgs);

  if (cliArgs.mutationId) {
    const [projectName, mutationObj] = await loadSingleMutation(cliArgs);
    await manager.runSingleMutation(projectName, cliArgs.mutationId, mutationObj);
  } else {
    const projects = await loadProjectsFromFilter(cliArgs);
    await manager.runAll(projects);
  }
})().catch((err) => {
  console.error("[manager] fatal:", err);
  process.exit(1);
});
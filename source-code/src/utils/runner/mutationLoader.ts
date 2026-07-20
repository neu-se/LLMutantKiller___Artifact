// src/utils/runner/mutationLoader.ts
import type {
  CliArgs,
  MutationObj,
  MutationFilterMap,
  MutationsMapEntries,
  ProjectMutations,
} from "../../types";
import {
  readFileOrJson,
  directoryExists,
  resolveFromRoot,
  splitProjectPath,
} from "..";

// ---- type guard (internal) ----
function isMutationObj(o: any): o is MutationObj {
  return Boolean(o)
    && typeof o === "object"
    && typeof o.file === "string"
    && typeof o.originalCode === "string"
    && typeof o.replacement === "string";
}

// ---- small helpers ----
export async function assertSubjectRepoExists(
    baseDir: string,
    projectName: string
): Promise<void> {
  const addr = resolveFromRoot(baseDir, projectName);
  if (!(await directoryExists(addr))) {
    throw new Error(`Subject repository "${projectName}" was not found under ${baseDir}`);
  }
}

export async function loadMutationFile(
    projectName: string,
    mutantId: string
): Promise<[MutationObj, string]> {
  const mutPath = resolveFromRoot("mutations", projectName, `${mutantId}.json`);
  const raw = await readFileOrJson(mutPath);
  if (!isMutationObj(raw)) {
    throw new Error(`Invalid or missing mutation JSON for ${projectName}/${mutantId} at ${mutPath}`);
  }
  return [raw, mutPath];
}

export async function loadMutationFilterFile(p: string): Promise<MutationFilterMap> {
  const raw = await readFileOrJson(p);
  if (raw === null || raw === undefined) {
    throw new Error(`Filter file missing or unreadable at ${p}`);
  }
  if (typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error(`Invalid filter format: expected { project: [mutantIds] } at ${p}`);
  }
  return raw as MutationFilterMap;
}

export function resolveProjectForSingleMutation(cli: CliArgs): { projectName: string; baseDir: string } {
  if (cli.projectPath) return splitProjectPath(cli.projectPath);
  const list = cli.projects ?? [];
  if (list.length === 0) {
    throw new Error("--mutationId provided but no project specified. Provide either --projectPath or --projects with a single project.");
  }
  if (list.length > 1) {
    throw new Error("--mutationId with --projects expects exactly one project. Provide a single project or use --projectPath.");
  }
  return { projectName: list[0], baseDir: cli.subjectsDir };
}

export function resolveProjectsAndBaseDirForFilter(
  cli: CliArgs,
  filter: MutationFilterMap
): { baseDir: string; projectNames: string[] } {
  if (cli.projectPath) {
    const { projectName, baseDir } = splitProjectPath(cli.projectPath);
    return { baseDir, projectNames: [projectName] };
  }
  const projectNames = cli.projects && cli.projects.length > 0 ? cli.projects : Object.keys(filter);
  return { baseDir: cli.subjectsDir, projectNames };
}

// ---- public loaders used by run.ts (and tests) ----
export async function loadSingleMutation(cli: CliArgs): Promise<[string, MutationObj, string]> {
  if (!cli.mutationId) throw new Error("loadSingleMutation called without --mutationId");
  const { projectName, baseDir } = resolveProjectForSingleMutation(cli);
  await assertSubjectRepoExists(baseDir, projectName);
  const [obj, mutPath] = await loadMutationFile(projectName, cli.mutationId);
  return [projectName, obj, mutPath];
}

export async function loadProjectsFromFilter(cli: CliArgs): Promise<MutationsMapEntries> {
  const filter = await loadMutationFilterFile(cli.mutationFile);
  const { baseDir, projectNames } = resolveProjectsAndBaseDirForFilter(cli, filter);

  const entries: MutationsMapEntries = [];
  for (const projectName of projectNames) {
    const ids = filter[projectName];
    if (!ids || !Array.isArray(ids)) continue;

    await assertSubjectRepoExists(baseDir, projectName);
    const projectMutations: ProjectMutations = {};
    for (const mutantId of ids) {
      const [obj] = await loadMutationFile(projectName, mutantId);
      projectMutations[mutantId] = obj;
    }
    entries.push([projectName, projectMutations]);
  }
  return entries;
}
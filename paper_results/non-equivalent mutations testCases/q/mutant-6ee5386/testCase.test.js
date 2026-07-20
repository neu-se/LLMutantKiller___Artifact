const childProcess = require("node:child_process");
const path = require("node:path");

describe("Q progress propagation after progress callback errors", () => {
  it("stops forwarding progress when a progress callback throws", () => {
    const modulePath = process.env.Q_PATH
      ? path.resolve(process.env.Q_PATH)
      : path.resolve(__dirname, "../../subject_repositories/q/q.js");
    const runnerPath = path.resolve(__dirname, "progress-scenario.js");

    const result = childProcess.spawnSync(process.execPath, [runnerPath], {
      env: { ...process.env, Q_TARGET: modulePath },
      encoding: "utf8",
    });

    expect(result.status).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout.trim()).toBe("[]");
  });
});

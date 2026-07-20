import { createRequire } from "module";

describe("Q.longStackSupport initialization via Q_DEBUG", () => {
  it("should set longStackSupport to true when Q_DEBUG is set in the environment at module load time", () => {
    // The mutation changes Q.longStackSupport = true to Q.longStackSupport = false
    // inside the block guarded by process.env.Q_DEBUG.
    // We set Q_DEBUG before requiring the module so the branch is exercised.

    const originalQDebug = process.env.Q_DEBUG;
    process.env.Q_DEBUG = "1";

    // Clear the module cache so the module re-executes with Q_DEBUG set
    const req = createRequire(__filename);
    const modulePath = req.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];

    const Q = req("../../../../../../../../../../../subject_repositories/q/q.js");

    // Restore environment
    if (originalQDebug === undefined) {
      delete process.env.Q_DEBUG;
    } else {
      process.env.Q_DEBUG = originalQDebug;
    }

    // Original code: Q.longStackSupport = true when Q_DEBUG is set
    // Mutant code:   Q.longStackSupport = false when Q_DEBUG is set
    expect(Q.longStackSupport).toBe(true);
  });
});
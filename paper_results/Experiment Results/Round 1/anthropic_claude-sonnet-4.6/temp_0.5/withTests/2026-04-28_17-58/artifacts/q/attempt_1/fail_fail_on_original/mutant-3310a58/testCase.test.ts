import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q longStackSupport initialization", () => {
  it("should not throw when process is temporarily made non-object during module evaluation", () => {
    // The mutation changes the guard from checking typeof process === "object" && process
    // to just `true`, which means if process were not an object, it would throw.
    // We test this by verifying the module loaded without error and that
    // Q.longStackSupport reflects the absence of Q_DEBUG env var correctly.
    
    // Since process.env.Q_DEBUG is not set in this test environment,
    // Q.longStackSupport should be false (the default)
    const savedQDebug = process.env.Q_DEBUG;
    delete process.env.Q_DEBUG;
    
    // Re-require the module to test initialization behavior
    // Clear the require cache first
    const Module = require("module");
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[qPath];
    
    // Temporarily make process appear as non-object to catch the mutation
    const originalProcess = global.process;
    (global as any).process = null;
    
    let threwError = false;
    try {
      require(qPath);
    } catch (e) {
      threwError = true;
    } finally {
      (global as any).process = originalProcess;
      if (savedQDebug !== undefined) {
        process.env.Q_DEBUG = savedQDebug;
      }
      delete require.cache[qPath];
    }
    
    expect(threwError).toBe(false);
  });
});
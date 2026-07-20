import Q from "../q.js";

describe("Q.longStackSupport default value", () => {
  it("should be false by default when Q_DEBUG environment variable is not set", () => {
    // Ensure Q_DEBUG is not set in the environment
    const originalQDebug = process.env.Q_DEBUG;
    delete process.env.Q_DEBUG;

    // Re-require the module to get a fresh instance without Q_DEBUG set
    // Since we can't easily re-require, we test the imported module's behavior
    // The key observable behavior: longStackSupport should be false when Q_DEBUG is not set
    // In the mutated version, it's always true regardless of Q_DEBUG
    
    // Restore the environment
    if (originalQDebug !== undefined) {
      process.env.Q_DEBUG = originalQDebug;
    }

    // The imported Q module was loaded without Q_DEBUG set (assuming test env doesn't have it)
    // In original code: longStackSupport = false (since Q_DEBUG not set)
    // In mutated code: longStackSupport = true (always set to true)
    expect(Q.longStackSupport).toBe(false);
  });
});
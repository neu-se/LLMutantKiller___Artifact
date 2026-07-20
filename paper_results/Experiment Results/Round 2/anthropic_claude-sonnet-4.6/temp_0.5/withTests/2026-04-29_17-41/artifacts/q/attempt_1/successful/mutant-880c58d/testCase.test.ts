import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.longStackSupport default value", () => {
  it("should be false when Q_DEBUG environment variable is not set", () => {
    // Ensure Q_DEBUG is not set in the environment for this test
    const originalQDebug = process.env.Q_DEBUG;
    delete process.env.Q_DEBUG;

    // Re-require the module to get a fresh instance without Q_DEBUG set
    // We need to clear the require cache first
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    try {
      // In the original code, longStackSupport should be false when Q_DEBUG is not set
      // In the mutated code (if (true)), longStackSupport would always be true
      expect(freshQ.longStackSupport).toBe(false);
    } finally {
      // Restore original Q_DEBUG value
      if (originalQDebug !== undefined) {
        process.env.Q_DEBUG = originalQDebug;
      } else {
        delete process.env.Q_DEBUG;
      }
      // Clean up the cache
      delete require.cache[modulePath];
    }
  });
});
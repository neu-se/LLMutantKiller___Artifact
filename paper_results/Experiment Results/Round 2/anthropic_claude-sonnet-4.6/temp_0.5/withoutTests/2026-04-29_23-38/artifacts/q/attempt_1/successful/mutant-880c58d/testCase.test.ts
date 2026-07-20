import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.longStackSupport default value", () => {
  it("should be false by default when Q_DEBUG environment variable is not set", () => {
    // Save and clear Q_DEBUG to ensure it's not set
    const originalQDebug = process.env.Q_DEBUG;
    delete process.env.Q_DEBUG;

    // Re-require the module to get a fresh instance without Q_DEBUG set
    // We need to clear the require cache first
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    try {
      // In the original code, longStackSupport should be false when Q_DEBUG is not set
      // In the mutated code, it will always be true
      expect(freshQ.longStackSupport).toBe(false);
    } finally {
      // Restore original Q_DEBUG
      if (originalQDebug !== undefined) {
        process.env.Q_DEBUG = originalQDebug;
      }
      // Clean up the cache
      delete require.cache[modulePath];
    }
  });
});
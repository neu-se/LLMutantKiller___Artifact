import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.longStackSupport with Q_DEBUG environment variable", () => {
  it("should set Q.longStackSupport to true when Q_DEBUG environment variable is set", () => {
    // Save original state
    const originalLongStackSupport = Q.longStackSupport;
    const originalQDebug = process.env.Q_DEBUG;

    try {
      // The module is already loaded, so we need to test the behavior
      // by checking if longStackSupport was set during module initialization
      // when Q_DEBUG is present.
      // 
      // Since the module is already loaded, we test by re-requiring it
      // with Q_DEBUG set. We need to clear the module cache first.
      
      // Set Q_DEBUG before requiring
      process.env.Q_DEBUG = "1";
      
      // Clear module cache to force re-evaluation
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];
      
      // Re-require the module with Q_DEBUG set
      const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
      
      // In the original code, Q.longStackSupport should be true when Q_DEBUG is set
      // In the mutated code, the body of the if block is empty, so it remains false
      expect(QFresh.longStackSupport).toBe(true);
    } finally {
      // Restore original state
      if (originalQDebug === undefined) {
        delete process.env.Q_DEBUG;
      } else {
        process.env.Q_DEBUG = originalQDebug;
      }
      
      // Restore module cache
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];
    }
  });
});
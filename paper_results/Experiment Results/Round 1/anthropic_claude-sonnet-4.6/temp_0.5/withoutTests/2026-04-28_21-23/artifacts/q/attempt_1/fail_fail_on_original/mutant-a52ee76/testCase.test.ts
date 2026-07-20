import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.longStackSupport with Q_DEBUG environment variable", () => {
  it("should set Q.longStackSupport to true when Q_DEBUG environment variable is set", () => {
    // Save original values
    const originalLongStackSupport = Q.longStackSupport;
    const originalQDebug = process.env.Q_DEBUG;

    try {
      // Set Q_DEBUG environment variable
      process.env.Q_DEBUG = "1";

      // Re-require the module to trigger the initialization code
      // Since the module is cached, we need to test the behavior differently
      // The mutation removes the assignment Q.longStackSupport = true
      // We can test this by checking if the module respects Q_DEBUG at load time
      
      // Clear the module cache and re-require
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];
      
      const QReloaded = require("../../../../../../../../../../../subject_repositories/q/q.js");
      
      // In the original code, Q.longStackSupport should be true when Q_DEBUG is set
      // In the mutated code, Q.longStackSupport remains false even when Q_DEBUG is set
      expect(QReloaded.longStackSupport).toBe(true);
    } finally {
      // Restore original values
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
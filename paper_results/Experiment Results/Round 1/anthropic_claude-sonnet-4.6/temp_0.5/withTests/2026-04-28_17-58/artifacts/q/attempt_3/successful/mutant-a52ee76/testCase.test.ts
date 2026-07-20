describe("Q.longStackSupport initialization from Q_DEBUG environment variable", () => {
  it("should set Q.longStackSupport to true at module load time when Q_DEBUG is set", () => {
    // Save original state
    const originalQDebug = process.env.Q_DEBUG;

    try {
      // Set Q_DEBUG before loading the module
      process.env.Q_DEBUG = "1";

      // Clear the require cache so the module re-initializes
      const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[qPath];

      // Re-require the module with Q_DEBUG set - original code sets longStackSupport = true
      // mutant code does NOT set it (empty if body)
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      expect(Q.longStackSupport).toBe(true);
    } finally {
      // Restore original state
      if (originalQDebug === undefined) {
        delete process.env.Q_DEBUG;
      } else {
        process.env.Q_DEBUG = originalQDebug;
      }

      // Restore original module in cache
      const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[qPath];
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    }
  });
});
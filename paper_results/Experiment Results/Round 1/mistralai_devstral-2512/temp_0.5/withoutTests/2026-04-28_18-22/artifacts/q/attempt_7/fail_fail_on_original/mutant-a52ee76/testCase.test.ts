const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should enable longStackSupport when Q_DEBUG environment variable is set", () => {
    // Save original process.env
    const originalEnv = { ...process.env };

    try {
      // Clear any existing Q_DEBUG
      delete process.env.Q_DEBUG;

      // First test without Q_DEBUG - should be false
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const qWithoutDebug = require("../../../../../../../../../../../subject_repositories/q/q.js");
      expect(qWithoutDebug.longStackSupport).toBe(false);

      // Now set Q_DEBUG and test again
      process.env.Q_DEBUG = "1";

      // Reset Q module to pick up new environment variable
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const qWithDebug = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify longStackSupport was enabled
      expect(qWithDebug.longStackSupport).toBe(true);

    } finally {
      // Restore original environment
      process.env = originalEnv;
    }
  });
});
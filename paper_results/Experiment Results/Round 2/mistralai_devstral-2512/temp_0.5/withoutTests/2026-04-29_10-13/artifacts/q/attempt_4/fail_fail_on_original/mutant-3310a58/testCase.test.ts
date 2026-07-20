const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set", () => {
    // Save original env
    const originalEnv = process.env;

    try {
      // Set Q_DEBUG to enable long stack support
      process.env.Q_DEBUG = "1";

      // Create a new Q instance to pick up the new environment variable
      // We need to delete the cache to force a reload
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const QWithDebug = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify that long stack support is enabled
      expect(QWithDebug.longStackSupport).toBe(true);
    } finally {
      // Restore original env
      process.env = originalEnv;
    }
  });
});
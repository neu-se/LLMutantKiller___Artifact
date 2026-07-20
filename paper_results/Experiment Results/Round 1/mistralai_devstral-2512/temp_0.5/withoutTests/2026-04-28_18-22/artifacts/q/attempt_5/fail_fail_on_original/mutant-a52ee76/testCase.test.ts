const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should enable longStackSupport when Q_DEBUG environment variable is set", () => {
    // Save original process.env
    const originalEnv = process.env;

    try {
      // Clear Q_DEBUG to test default behavior
      delete process.env.Q_DEBUG;

      // Reset Q module
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify longStackSupport is false by default
      expect(freshQ.longStackSupport).toBe(false);

      // Now set Q_DEBUG and test again
      process.env.Q_DEBUG = "1";

      // Reset Q module again
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const freshQWithDebug = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify longStackSupport was enabled
      expect(freshQWithDebug.longStackSupport).toBe(true);

    } finally {
      // Restore original environment
      process.env = originalEnv;
    }
  });
});
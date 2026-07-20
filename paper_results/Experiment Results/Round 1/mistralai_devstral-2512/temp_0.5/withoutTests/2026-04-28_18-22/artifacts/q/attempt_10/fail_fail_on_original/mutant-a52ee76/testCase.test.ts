const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should enable longStackSupport when Q_DEBUG environment variable is set", () => {
    // Save original process.env
    const originalEnv = { ...process.env };

    try {
      // Set Q_DEBUG environment variable
      process.env.Q_DEBUG = "1";

      // Reset Q module to pick up new environment variable
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify longStackSupport was enabled by checking the flag directly
      expect(freshQ.longStackSupport).toBe(true);

    } finally {
      // Restore original environment
      process.env = originalEnv;
    }
  });
});
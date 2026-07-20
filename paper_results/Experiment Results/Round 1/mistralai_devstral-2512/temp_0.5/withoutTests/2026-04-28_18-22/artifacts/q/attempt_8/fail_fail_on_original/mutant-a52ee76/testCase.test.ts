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

      // Verify longStackSupport was enabled
      expect(freshQ.longStackSupport).toBe(true);

      // Also verify the behavior by checking if the stack trace enhancement is working
      return freshQ.reject(new Error("test error"))
        .catch((err: Error) => {
          // With long stack support enabled, the stack should contain special markers
          expect(err.stack).toContain("From previous event:");
          throw err;
        })
        .catch((err: Error) => {
          expect(err.message).toBe("test error");
        });

    } finally {
      // Restore original environment
      process.env = originalEnv;
    }
  });
});
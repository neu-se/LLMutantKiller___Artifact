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

      // Create a promise chain to test long stack traces
      const promise = freshQ.reject(new Error("test error"))
        .then(() => {
          throw new Error("should not reach here");
        })
        .catch((err: Error) => {
          // With long stack support enabled, the stack should contain special markers
          if (freshQ.longStackSupport) {
            expect(err.stack).toContain("From previous event:");
          }
          throw err;
        });

      return promise.catch((err: Error) => {
        expect(err.message).toBe("test error");
      });

    } finally {
      // Restore original environment
      process.env = originalEnv;
    }
  });
});
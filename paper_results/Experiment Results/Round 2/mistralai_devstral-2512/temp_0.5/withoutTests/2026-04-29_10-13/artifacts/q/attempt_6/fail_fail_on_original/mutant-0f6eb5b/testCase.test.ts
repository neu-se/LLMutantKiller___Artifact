const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.longStackSupport", () => {
  it("should enable long stack traces when Q_DEBUG is set", () => {
    // Store original environment
    const originalEnv = process.env;

    try {
      // Set Q_DEBUG environment variable
      process.env.Q_DEBUG = "1";

      // Force re-evaluation by reloading the module
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify that longStackSupport is enabled
      expect(Q.longStackSupport).toBe(true);

      // Create a promise chain that will generate a stack trace
      return Q.resolve()
        .then(() => {
          return Q.delay(1).then(() => {
            throw new Error("Test error");
          });
        })
        .catch((err: Error) => {
          // Check if long stack traces are enabled by looking for the separator
          expect(err.stack).toContain("From previous event:");
        });
    } finally {
      // Restore environment
      process.env = originalEnv;
    }
  });
});
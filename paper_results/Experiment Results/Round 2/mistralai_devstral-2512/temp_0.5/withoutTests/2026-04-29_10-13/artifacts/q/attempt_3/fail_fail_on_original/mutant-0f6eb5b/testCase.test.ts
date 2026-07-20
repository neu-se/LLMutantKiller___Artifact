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
      const QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Create a promise chain that will generate a stack trace
      return QModule.Q.resolve()
        .then(() => {
          throw new Error("Test error");
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
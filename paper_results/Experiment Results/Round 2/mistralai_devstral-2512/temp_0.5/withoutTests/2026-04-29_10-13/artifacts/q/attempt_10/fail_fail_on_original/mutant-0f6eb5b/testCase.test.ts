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

      // Create a promise chain with multiple levels to trigger long stack traces
      return Q.resolve()
        .then(() => Q.delay(1))
        .then(() => Q.delay(1))
        .then(() => Q.delay(1))
        .then(() => {
          throw new Error("Test error");
        })
        .catch((err: Error) => {
          // Check if long stack traces are enabled by looking for the separator
          if (err.stack) {
            const stackLines = err.stack.split('\n');
            const separatorCount = stackLines.filter(line => line.includes("From previous event:")).length;
            expect(separatorCount).toBeGreaterThan(0);
          } else {
            fail("Error stack is undefined");
          }
        });
    } finally {
      // Restore environment
      process.env = originalEnv;
    }
  });
});
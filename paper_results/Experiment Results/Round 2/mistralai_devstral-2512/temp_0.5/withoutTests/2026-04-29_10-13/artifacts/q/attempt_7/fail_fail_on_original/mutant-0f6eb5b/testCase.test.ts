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

      // Create a deferred promise to test stack trace behavior
      const deferred = Q.defer();
      setTimeout(() => {
        deferred.reject(new Error("Test error"));
      }, 1);

      return deferred.promise.catch((err: Error) => {
        // Check if long stack traces are enabled by looking for the separator
        expect(err.stack).toContain("From previous event:");
      });
    } finally {
      // Restore environment
      process.env = originalEnv;
    }
  });
});
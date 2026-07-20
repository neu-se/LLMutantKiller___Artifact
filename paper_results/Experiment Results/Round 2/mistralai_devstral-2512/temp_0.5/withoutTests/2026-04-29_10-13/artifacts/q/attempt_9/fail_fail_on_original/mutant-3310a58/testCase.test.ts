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

      // Create a deferred promise to check if long stack support is enabled
      const deferred = QWithDebug.defer();
      const promise = deferred.promise;

      // Check if the promise has a stackCounter property (only set when long stack support is enabled)
      expect(promise).toHaveProperty('stackCounter');
      expect(promise.stackCounter).toBeGreaterThan(0);
    } finally {
      // Restore original env
      process.env = originalEnv;
    }
  });
});
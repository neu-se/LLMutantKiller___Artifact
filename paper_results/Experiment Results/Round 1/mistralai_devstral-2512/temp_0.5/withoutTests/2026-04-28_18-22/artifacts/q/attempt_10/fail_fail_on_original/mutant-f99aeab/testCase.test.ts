const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace handling", () => {
  it("should enable long stack support when Q_DEBUG is set", () => {
    // Save original environment and state
    const originalDebug = process.env.Q_DEBUG;
    const originalLongStackSupport = Q.longStackSupport;

    try {
      // Set Q_DEBUG to enable long stack traces
      process.env.Q_DEBUG = "1";

      // Force reload of Q to pick up the new environment variable
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const QReloaded = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Create a promise that would capture long stacks
      const deferred = QReloaded.defer();
      const promise = deferred.promise;

      // The original code should have longStackSupport enabled when Q_DEBUG is set
      // The mutated code would have the opposite behavior due to the inverted condition
      expect(QReloaded.longStackSupport).toBe(true);

      // Clean up
      deferred.resolve(null);
    } finally {
      // Restore original environment
      process.env.Q_DEBUG = originalDebug;
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
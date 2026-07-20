const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace handling", () => {
  it("should enable long stack support when Q_DEBUG is set", () => {
    // Save original environment
    const originalDebug = process.env.Q_DEBUG;
    const originalLongStackSupport = Q.longStackSupport;

    try {
      // Set Q_DEBUG to enable long stack traces
      process.env.Q_DEBUG = "1";

      // Reset Q to pick up the new environment variable
      // We need to reload Q to get the updated behavior
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const QReloaded = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Create a promise chain that would capture long stacks
      const deferred = QReloaded.defer();
      const promise = deferred.promise.then(() => {
        return QReloaded.resolve(42);
      });

      // Force a rejection to trigger stack capture
      deferred.reject(new Error("test"));

      // Handle the rejection
      promise.catch(() => {});

      // The original code should have longStackSupport enabled when Q_DEBUG is set
      // The mutated code would have the opposite behavior
      expect(QReloaded.longStackSupport).toBe(true);
    } finally {
      // Restore original environment
      process.env.Q_DEBUG = originalDebug;
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
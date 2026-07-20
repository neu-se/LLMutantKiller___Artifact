// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support configuration", () => {
  it("should enable long stack support when Q_DEBUG environment variable is set", () => {
    // The mutation removes the assignment `Q.longStackSupport = true`
    // We need to test this by creating a scenario where the configuration would be applied

    // Store original values
    const originalEnv = process.env.Q_DEBUG;
    const originalLongStackSupport = Q.longStackSupport;

    try {
      // Set Q_DEBUG to trigger the configuration
      process.env.Q_DEBUG = "1";

      // Force re-evaluation by checking the module's initialization logic
      // The original code should set Q.longStackSupport = true when Q_DEBUG is set
      // The mutated code misses this assignment

      // Create a new promise to test stack tracking behavior
      const deferred = Q.defer();
      const promise = deferred.promise;

      // Reject the promise to trigger stack tracking
      deferred.reject(new Error("test"));

      return promise.catch((error: Error) => {
        // Check if stack tracking was enabled
        // In original code with Q_DEBUG=1, the promise should have stack properties
        // In mutated code, it won't have them even with Q_DEBUG=1
        const hasStackTracking = promise.hasOwnProperty('stack') ||
                                promise.hasOwnProperty('stackCounter');

        // The original code should enable stack tracking when Q_DEBUG is set
        expect(hasStackTracking).toBe(true);
      });
    } finally {
      // Restore original state
      process.env.Q_DEBUG = originalEnv;
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
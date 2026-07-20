// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support configuration", () => {
  it("should enable long stack support when Q_DEBUG environment variable is set", () => {
    // Store original environment
    const originalEnv = process.env.Q_DEBUG;

    // Set environment variable to enable long stack support
    process.env.Q_DEBUG = "1";

    // Force re-evaluation of Q configuration by checking the module's state
    // The mutation removes the assignment `Q.longStackSupport = true`
    // We can detect this by checking if the configuration was properly set

    // Create a new deferred to test the configuration
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Check if long stack support is enabled by examining the promise's stack property
    // When long stack support is enabled, promises get stack properties
    deferred.reject(new Error("test"));

    return promise.catch((error: Error) => {
      // Check if the promise has stack tracking enabled
      // In original code with Q_DEBUG=1, promises should have stack properties
      // In mutated code, they won't even with Q_DEBUG=1
      const hasStackSupport = promise.hasOwnProperty('stack');

      // The original code should enable long stack support when Q_DEBUG is set
      expect(hasStackSupport).toBe(true);

      // Clean up
      process.env.Q_DEBUG = originalEnv;
    });
  });
});
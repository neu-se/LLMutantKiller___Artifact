// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support configuration", () => {
  it("should enable long stack support when Q_DEBUG environment variable is set", () => {
    // Store original environment
    const originalEnv = process.env.Q_DEBUG;

    // Set environment variable to enable long stack support
    process.env.Q_DEBUG = "1";

    // The mutation removes the assignment `Q.longStackSupport = true`
    // We need to test the actual behavior that depends on this setting
    // Create a promise chain that would generate different behavior
    // when long stack support is enabled vs disabled

    // Create a function that will appear in stack traces
    function createRejectedPromise() {
      return Q.reject(new Error("test error"));
    }

    // The key difference is that with long stack support enabled,
    // the promise should have additional stack tracking properties
    return createRejectedPromise()
      .catch((error: Error) => {
        // Check if long stack support was actually enabled
        // When enabled, the error should have been enhanced with stack information
        // The mutation prevents this enhancement from happening

        // Create a new promise to test the configuration
        const deferred = Q.defer();
        const testPromise = deferred.promise;

        // Check if the promise has the stack counter property
        // that would be set when long stack support is enabled
        const hasStackCounter = testPromise.hasOwnProperty('stackCounter');

        // In original code with Q_DEBUG=1, promises should have stackCounter
        // In mutated code, they won't even with Q_DEBUG=1
        expect(hasStackCounter).toBe(true);

        // Clean up
        process.env.Q_DEBUG = originalEnv;
      });
  });
});
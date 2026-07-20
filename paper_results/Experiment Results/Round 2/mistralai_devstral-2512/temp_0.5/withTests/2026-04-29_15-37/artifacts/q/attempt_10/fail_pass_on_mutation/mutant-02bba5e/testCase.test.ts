// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should handle null error correctly in long stack traces", async () => {
    // Create a promise chain that will trigger makeStackTraceLong
    const error = null;
    const deferred = Q.defer();
    const promise = deferred.promise.then(() => {
      throw error;
    });

    // Enable long stack support by setting Q_DEBUG before creating promises
    if (typeof process !== 'undefined' && process.env) {
      process.env.Q_DEBUG = '1';
    }

    // Resolve the deferred to trigger the promise chain
    deferred.resolve();

    try {
      await promise;
      expect(true).toBe(false); // Should not reach here
    } catch (e) {
      // In the original code, null errors should be handled without throwing
      // In the mutated code, this will try to access properties of null and throw
      expect(e).toBe(null);

      // The key difference: in the original code, the condition checks error !== null
      // In the mutated code, it's always true, so it will try to access error.stack
      // which will throw an error for null values
    }
  });
});
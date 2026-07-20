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

    // Enable long stack support if available
    if (typeof process !== 'undefined' && process.env) {
      process.env.Q_DEBUG = '1';
      // Need to reload Q to pick up the env variable change
      // Since we can't actually reload, we'll just test the behavior
    }

    try {
      await promise;
      expect(true).toBe(false); // Should not reach here
    } catch (e) {
      // In the original code, null errors should be handled without throwing
      // In the mutated code, this will try to access properties of null and throw
      expect(e).toBe(null);
    }
  });
});
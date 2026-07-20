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

    // Resolve the deferred to trigger the promise chain
    deferred.resolve();

    // Check if we can detect the difference in stack trace handling
    let stackTraceDetected = false;
    try {
      await promise;
      expect(true).toBe(false); // Should not reach here
    } catch (e) {
      // In the original code, null errors should be handled without throwing
      // In the mutated code, this will try to access properties of null and throw
      expect(e).toBe(null);

      // Try to trigger the makeStackTraceLong function by checking stack property
      if (e && e.stack) {
        stackTraceDetected = true;
      }
    }

    // The mutation affects stack trace handling, so we need to verify that
    // the original code properly handles null errors in stack traces
    expect(stackTraceDetected).toBe(false);
  });
});
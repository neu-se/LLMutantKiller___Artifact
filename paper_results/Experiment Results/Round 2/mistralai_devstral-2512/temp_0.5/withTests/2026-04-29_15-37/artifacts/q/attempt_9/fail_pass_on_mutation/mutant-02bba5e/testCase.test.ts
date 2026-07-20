// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should handle null error correctly in long stack traces", async () => {
    // Create a scenario that triggers makeStackTraceLong with a null error
    const error = null;
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Create a promise chain that will have stack traces
    const promise = deferred1.promise
      .then(() => deferred2.promise)
      .then(() => { throw error; });

    // Resolve the promises to trigger the chain
    deferred1.resolve();
    deferred2.resolve();

    try {
      await promise;
      expect(true).toBe(false); // Should not reach here
    } catch (e) {
      // In the original code, null errors should be handled without throwing
      // In the mutated code, this will try to access properties of null and throw
      expect(e).toBe(null);

      // Verify that the error doesn't have a stack trace (since it's null)
      // This is where the mutation would cause a difference
      if (e !== null && e !== undefined) {
        expect(e.stack).toBeUndefined();
      }
    }
  });
});
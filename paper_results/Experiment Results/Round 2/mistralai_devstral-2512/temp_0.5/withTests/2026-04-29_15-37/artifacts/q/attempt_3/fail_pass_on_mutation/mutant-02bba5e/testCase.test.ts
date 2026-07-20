// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should handle null error correctly in long stack traces", async () => {
    // Create a scenario where error is null
    const error = null;
    const promise = Q.reject(error);

    // Check if long stack support is available
    if (Q.longStackSupport) {
      try {
        await promise;
        // This should not be reached
        expect(true).toBe(false);
      } catch (e) {
        // In the original code, null errors should be handled
        // In the mutated code, this will try to access properties of null
        expect(e).toBe(null);
      }
    } else {
      // If long stack support is not available, just verify the error is null
      try {
        await promise;
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBe(null);
      }
    }
  });
});
// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should handle null error correctly in long stack traces", async () => {
    // Create a scenario where error is null
    const error = null;
    const promise = Q.reject(error);

    // Force long stack traces to be enabled
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      await promise;
      // This should not be reached
      expect(true).toBe(false);
    } catch (e) {
      // In the original code, null errors should be handled
      // In the mutated code, this will try to access properties of null
      expect(e).toBe(null);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
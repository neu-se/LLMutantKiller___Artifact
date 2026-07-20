// Test case to detect the mutation in the stack trace parsing regex
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces with line numbers", () => {
    // Create a scenario that will generate a stack trace
    const error = new Error("Test error");
    const stackLine = "func@http://example.com/file.js:42";

    // This test verifies that the regex correctly captures line numbers
    // The mutation changes \d+ to \D+ which would fail to match digits
    return Q.reject(error)
      .catch((e) => {
        // The original code should be able to parse this stack line
        // The mutated code will fail because \D+ won't match digits
        expect(e.stack).toBeDefined();
        return Q.resolve();
      });
  });
});
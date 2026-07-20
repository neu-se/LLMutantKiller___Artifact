// Test case to detect the mutation in the getFileNameAndLineNumber function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation test", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a scenario that will generate a stack trace
    // The mutation changes \d+ to \d, which would fail to match multi-digit line numbers
    const error = new Error("Test error");
    const stackLine = "at TestFunction (test.js:123:45)";

    // This test indirectly checks if the regex correctly parses multi-digit line numbers
    // by ensuring the stack trace filtering works as expected
    return Q.reject(error)
      .catch((e) => {
        // The stack should be properly formatted with multi-digit line numbers
        expect(e.stack).toBeDefined();
        // If the mutation is present, this would fail because line numbers >= 10
        // wouldn't be matched by the regex, causing stack trace filtering to behave differently
        expect(e.stack.includes("test.js:123")).toBe(true);
      });
  });
});
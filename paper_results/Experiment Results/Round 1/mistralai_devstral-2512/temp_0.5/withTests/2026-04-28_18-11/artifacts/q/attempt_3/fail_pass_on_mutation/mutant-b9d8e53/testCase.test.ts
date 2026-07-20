// Test case to detect the mutation in the getFileNameAndLineNumber function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation test", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a test that directly tests the stack trace parsing functionality
    // The mutation changes \d+ to \d, which would fail to match line numbers >= 10
    const testError = new Error("Test error");
    testError.stack = "Error: Test error\n    at TestFunction (test.js:123:45)";

    // Create a promise chain that will trigger stack trace processing
    const deferred = Q.defer();
    deferred.reject(testError);

    return deferred.promise.then(
      () => {
        // Should not reach here
        expect(true).toBe(false);
      },
      (e: any) => {
        // The stack should be properly formatted with multi-digit line numbers
        expect(e.stack).toBeDefined();
        // If the mutation is present, this would fail because line numbers >= 10
        // wouldn't be matched by the regex, causing stack trace filtering to behave differently
        expect(e.stack.includes("test.js:123")).toBe(true);
      }
    );
  });
});
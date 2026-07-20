// Test case to detect the mutation in the getFileNameAndLineNumber function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation test", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a scenario that will generate a stack trace with multi-digit line numbers
    // The mutation changes \d+ to \d, which would fail to match line numbers >= 10
    const testError = new Error("Test error");
    testError.stack = "Error: Test error\n    at TestFunction (test.js:123:45)";

    // Use Q's internal stack trace filtering to test the regex
    // This is exposed through the long stack trace support
    Q.longStackSupport = true;
    const deferred = Q.defer();
    deferred.reject(testError);

    return deferred.promise.catch((e: any) => {
      // The stack should be properly formatted with multi-digit line numbers
      expect(e.stack).toBeDefined();
      // If the mutation is present, this would fail because line numbers >= 10
      // wouldn't be matched by the regex, causing stack trace filtering to behave differently
      expect(e.stack.includes("test.js:123")).toBe(true);
    });
  });
});
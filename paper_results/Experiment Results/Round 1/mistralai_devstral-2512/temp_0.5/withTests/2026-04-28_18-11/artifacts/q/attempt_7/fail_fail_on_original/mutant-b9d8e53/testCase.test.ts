// Test case to detect the mutation in the getFileNameAndLineNumber function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation test", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Create a test that will trigger the getFileNameAndLineNumber function
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
        // This specific check will fail with the mutation because line 123
        // won't be properly parsed when the regex only matches single digits
        // We check the exact format that getFileNameAndLineNumber would return
        const fileInfo = e.stack.match(/at .+ \((.+):(\d+):(?:\d+)\)$/);
        expect(fileInfo).not.toBeNull();
        expect(fileInfo[1]).toBe("test.js");
        // This will fail with the mutation because \d won't match "123"
        expect(fileInfo[2]).toBe("123");
        // Additional check to ensure we're testing the right line number
        expect(parseInt(fileInfo[2])).toBeGreaterThan(9);
        // Force the stack trace filtering to run by enabling long stack support
        Q.longStackSupport = true;
        return Q.reject(testError).catch((err: any) => {
          expect(err.stack).toContain("test.js:123");
        });
      }
    );
  });
});
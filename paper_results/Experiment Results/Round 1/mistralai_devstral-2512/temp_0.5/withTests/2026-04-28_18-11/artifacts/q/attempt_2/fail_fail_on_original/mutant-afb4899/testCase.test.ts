// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("should correctly parse stack lines with anonymous functions", () => {
    // Test the regex pattern for anonymous function stack lines
    // The mutation changes the pattern from /at ([^ ]+):(\d+):(?:\d+)$/
    // to /at ([^ ]+):(\d+):(?:\d+)/ (missing the $ anchor)
    // This means the mutated version would match patterns in the middle of strings

    // Create a test case that would behave differently
    const testStackLine = "at /path/to/file.js:10:5 some extra text";

    // We'll test this through the stack filtering mechanism
    // which uses getFileNameAndLineNumber internally
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    let stackTrace: string | null = null;

    // Capture the stack trace
    Q.onerror = function(error: Error) {
      stackTrace = error.stack;
    };

    // Trigger error handling
    deferred.reject(new Error("Test error"));

    return Q.delay(10).then(() => {
      // Restore original setting
      Q.longStackSupport = originalLongStackSupport;

      // The original code should not match lines with extra text after the pattern
      // The mutated code would incorrectly match them
      // We can't directly test the internal function, but we can verify
      // the stack trace handling works as expected
      expect(stackTrace).toBeDefined();
      expect(stackTrace).toContain("file.js:10:5");

      // The key difference would be in how the stack is filtered
      // With the mutation, more lines might be incorrectly identified as internal
    });
  });
});
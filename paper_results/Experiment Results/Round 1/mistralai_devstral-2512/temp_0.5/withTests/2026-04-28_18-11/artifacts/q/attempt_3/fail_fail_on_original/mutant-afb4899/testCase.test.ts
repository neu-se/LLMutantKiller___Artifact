// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("should correctly parse stack lines with anonymous functions", () => {
    // Test the regex pattern for anonymous function stack lines
    // The mutation changes the pattern from /at ([^ ]+):(\d+):(?:\d+)$/
    // to /at ([^ ]+):(\d+):(?:\d+)/ (missing the $ anchor)
    // This means the mutated version would match patterns in the middle of strings

    // Create a test case that would behave differently
    const testStackLine = "at /path/to/file.js:10:5";

    // We'll test this through the stack filtering mechanism
    // which uses getFileNameAndLineNumber internally
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    let stackTrace: string | null = null;

    // Capture the stack trace
    (Q as any).onerror = function(error: Error) {
      stackTrace = error.stack || null;
    };

    // Trigger error handling
    deferred.reject(new Error("Test error"));

    return Q.delay(10, 10).then(() => {
      // Restore original setting
      Q.longStackSupport = originalLongStackSupport;

      // The original code should correctly parse stack lines
      // The mutated code would incorrectly match patterns in the middle of strings
      expect(stackTrace).toBeDefined();
      expect(stackTrace).toContain("file.js:10:5");
    });
  });
});
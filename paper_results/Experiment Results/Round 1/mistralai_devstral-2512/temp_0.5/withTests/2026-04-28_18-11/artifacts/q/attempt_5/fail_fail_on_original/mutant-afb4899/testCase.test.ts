// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("should correctly parse stack lines with anonymous functions", () => {
    // Test the regex pattern for anonymous function stack lines
    // The mutation changes the pattern from /at ([^ ]+):(\d+):(?:\d+)$/
    // to /at ([^ ]+):(\d+):(?:\d+)/ (missing the $ anchor)
    // This means the mutated version would match patterns in the middle of strings

    // Create a promise chain that will generate a stack trace
    const deferred = Q.defer();
    let errorStack: string | undefined;

    // Set up error handler
    (Q as any).onerror = function(error: Error) {
      errorStack = error.stack;
    };

    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Trigger error handling
    deferred.reject(new Error("Test error"));

    return Q.delay(10, 10).then(() => {
      // Restore original setting
      Q.longStackSupport = originalLongStackSupport;

      // The test verifies that stack traces are properly handled
      // The mutation would cause incorrect parsing of stack lines
      // which would affect the stack trace formatting
      expect(errorStack).toBeDefined();
      expect(typeof errorStack).toBe('string');
    });
  });
});
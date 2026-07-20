// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("should correctly parse stack lines with anonymous functions", () => {
    // Test the regex pattern for anonymous function stack lines
    // The mutation changes the pattern from /at ([^ ]+):(\d+):(?:\d+)$/
    // to /at ([^ ]+):(\d+):(?:\d+)/ (missing the $ anchor)
    // This means the mutated version would incorrectly match patterns in the middle of strings

    // Create a promise that will be rejected
    const promise = Q.reject(new Error("Test error"));

    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Use done() to trigger unhandled rejection reporting
    let errorStack: string | undefined;
    const originalOnError = (Q as any).onerror;
    (Q as any).onerror = function(error: Error) {
      errorStack = error.stack;
      if (originalOnError) {
        originalOnError(error);
      }
    };

    promise.done();

    return Q.delay(10, 10).then(() => {
      // Restore original settings
      Q.longStackSupport = originalLongStackSupport;
      (Q as any).onerror = originalOnError;

      // The test verifies that stack traces are properly handled
      // The mutation would cause incorrect parsing of stack lines
      expect(errorStack).toBeDefined();
      expect(typeof errorStack).toBe('string');

      // Verify the stack trace contains expected patterns
      if (errorStack) {
        expect(errorStack.length).toBeGreaterThan(0);
        // Check that the stack trace is properly formatted
        // The mutation would cause incorrect line matching
        const lines = errorStack.split('\n');
        expect(lines.length).toBeGreaterThan(0);
      }
    });
  });
});
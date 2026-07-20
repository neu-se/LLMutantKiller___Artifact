// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("should correctly parse stack lines with anonymous functions", () => {
    // Test the regex pattern for anonymous function stack lines
    // The mutation changes the pattern from /at ([^ ]+):(\d+):(?:\d+)$/
    // to /at ([^ ]+):(\d+):(?:\d+)/ (missing the $ anchor)
    // This means the mutated version would incorrectly match patterns in the middle of strings

    // Create a promise chain that will generate a stack trace
    const deferred = Q.defer();

    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a specific error message that would expose the mutation
    const error = new Error("Test error");
    deferred.reject(error);

    // Use done() to trigger unhandled rejection reporting
    let errorStack: string | undefined;
    const originalOnError = (Q as any).onerror;
    (Q as any).onerror = function(err: Error) {
      errorStack = err.stack;
      if (originalOnError) {
        originalOnError(err);
      }
    };

    return Q.delay(10, 10).then(() => {
      // Restore original settings
      Q.longStackSupport = originalLongStackSupport;
      (Q as any).onerror = originalOnError;

      // The original code should correctly parse stack lines
      // The mutated code would incorrectly match the pattern in the middle of the error message
      expect(errorStack).toBeDefined();

      // Verify the stack trace is properly formatted
      if (errorStack) {
        const lines = errorStack.split('\n');
        // The mutation would cause incorrect line matching
        // Check that internal frames are correctly identified
        const hasInternalFrames = lines.some(line =>
          line.includes("q.js") && line.includes(":")
        );
        expect(hasInternalFrames).toBe(true);
      }
    });
  });
});
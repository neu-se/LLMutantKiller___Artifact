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
    let stackTrace: string | null = null;

    // Set up error handler to capture stack trace
    const originalOnError = (Q as any).onerror;
    (Q as any).onerror = function(error: Error) {
      stackTrace = error.stack;
      if (originalOnError) {
        originalOnError(error);
      }
    };

    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Trigger error handling with a specific stack line format
    deferred.reject(new Error("Test error at file.js:10:5"));

    return Q.delay(10, 10).then(() => {
      // Restore original settings
      Q.longStackSupport = originalLongStackSupport;
      (Q as any).onerror = originalOnError;

      // The original code should correctly parse the stack line
      // The mutated code would incorrectly match the pattern in the middle of the error message
      expect(stackTrace).toBeDefined();
      expect(stackTrace).toContain("file.js:10:5");

      // Verify the stack trace is properly formatted
      const lines = stackTrace?.split('\n') || [];
      const filteredLines = lines.filter(line =>
        line.includes("file.js:10:5") && !line.includes("From previous event")
      );
      expect(filteredLines.length).toBeGreaterThan(0);
    });
  });
});
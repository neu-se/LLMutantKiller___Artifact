// Test case to detect the mutation in the regex pattern for stack trace parsing
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing regex", () => {
  it("should correctly identify internal stack frames with multi-digit line numbers", () => {
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Simulate a stack trace with multi-digit line numbers
    // The mutation changes \d+ to \d which would fail to match line numbers >= 10
    const testStackLine = "    at Promise.promiseDispatch (q.js:123:45)";

    // We need to test the internal stack filtering behavior
    // The mutation would cause line numbers with 2+ digits to not be recognized as internal frames
    return Q.fcall(() => {
      throw error;
    }).then(null, (err: Error) => {
      // The stack should be properly filtered
      expect(err.stack).toBeDefined();

      // Check that multi-digit line numbers are properly handled
      // This would fail with the mutation because \d would only match single digits
      const lines = err.stack?.split('\n') || [];
      const hasMultiDigitLine = lines.some(line =>
        line.includes('q.js:') && /:(\d{2,}):/.test(line)
      );

      expect(hasMultiDigitLine).toBe(true);
    });
  });
});
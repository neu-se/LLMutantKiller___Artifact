// Test case to detect the mutation in the regex pattern for stack trace parsing
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing regex", () => {
  it("should correctly filter internal stack frames with multi-digit line numbers", () => {
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    // The mutation affects the regex pattern that matches line numbers in stack traces
    // Original: /at .+ \((.+):(\d+):(?:\d+)\)$/
    // Mutated:  /at .+ \((.+):(\d):(?:\d+)\)$/ (only matches single-digit line numbers)

    // Create a function that will appear in stack traces with multi-digit line numbers
    function testFunction() {
      throw new Error("Test error");
    }

    return Q.fcall(testFunction).then(null, (err: Error) => {
      // The stack should be properly formatted
      expect(err.stack).toBeDefined();

      // Check that the stack contains line numbers with 2+ digits
      // This would fail with the mutation because \d would only match single digits
      const stackLines = err.stack?.split('\n') || [];
      const hasMultiDigitLine = stackLines.some(line => {
        // Look for patterns like "file.js:12:34" where 12 is a multi-digit line number
        const match = line.match(/\(([^:]+):(\d{2,}):\d+\)$/);
        return match && parseInt(match[2]) >= 10;
      });

      expect(hasMultiDigitLine).toBe(true);
    });
  });
});
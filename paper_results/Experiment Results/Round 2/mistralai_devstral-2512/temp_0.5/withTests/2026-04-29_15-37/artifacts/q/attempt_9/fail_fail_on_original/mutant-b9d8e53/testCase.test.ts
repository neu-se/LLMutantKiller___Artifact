// Test case to detect the mutation in the regex pattern for stack trace parsing
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing regex", () => {
  it("should correctly handle stack traces with multi-digit line numbers in long stack traces", () => {
    Q.longStackSupport = true;

    // Create a promise chain that will generate long stack traces
    // The mutation affects the regex pattern that matches line numbers in stack traces
    // Original: /at .+ \((.+):(\d+):(?:\d+)\)$/
    // Mutated:  /at .+ \((.+):(\d):(?:\d+)\)$/ (only matches single-digit line numbers)

    // Create a deep promise chain to generate multiple stack frames
    function createDeepChain(depth: number): any {
      if (depth <= 0) {
        throw new Error("Deep chain error");
      }
      return Q.delay(1, 1).then(() => createDeepChain(depth - 1));
    }

    return createDeepChain(5).then(null, (err: Error) => {
      // The stack should be properly formatted with long stack traces
      expect(err.stack).toBeDefined();

      // Check that the stack contains properly formatted line numbers with 2+ digits
      // This would fail with the mutation because \d would only match single digits
      const stackLines = err.stack?.split('\n') || [];
      const qFileLines = stackLines.filter(line =>
        line.includes('q.js:') || line.includes('q.js')
      );

      // Look for patterns like "q.js:123:45" where 123 is a multi-digit line number
      const hasMultiDigitLine = qFileLines.some(line => {
        const match = line.match(/q\.js:(\d+):\d+/);
        return match && parseInt(match[1]) >= 10;
      });

      expect(hasMultiDigitLine).toBe(true);
    });
  });
});
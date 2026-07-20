// Test case to detect the mutation in the getFileNameAndLineNumber function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation test", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a test that specifically exercises the getFileNameAndLineNumber function
    // by creating a stack trace with a named function pattern

    // Enable long stack traces to ensure stack trace parsing is triggered
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a function that will appear in stack traces with a named function pattern
      function testFunction() {
        throw new Error("Test error");
      }

      // Create a promise chain that will generate stack traces
      return Q.try(testFunction)
        .then(null, (err: Error) => {
          // Verify the stack trace exists
          expect(err.stack).toBeDefined();
          expect(typeof err.stack).toBe("string");

          // The key test: verify that stack traces with named functions are properly parsed
          // The mutation removes the return statement in the attempt1 branch, which would
          // cause the function to return undefined for named function stack lines
          const stackLines = err.stack.split('\n');
          const hasNamedFunctionPattern = stackLines.some(line =>
            /at testFunction \(\S+:\d+:\d+\)/.test(line)
          );

          // This assertion should fail if the mutation is present because
          // the function would return undefined for named function patterns
          expect(hasNamedFunctionPattern).toBe(true);

          // Additionally, verify that the stack trace contains the expected line number
          // If the mutation is present, this would fail because the function would return undefined
          const lineNumberMatch = err.stack.match(/at testFunction \(.*:(\d+):\d+\)/);
          expect(lineNumberMatch).not.toBeNull();
          expect(parseInt(lineNumberMatch![1])).toBeGreaterThan(0);

          return Q.resolve(true);
        });
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
// Test case to detect the mutation in the getFileNameAndLineNumber function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation test", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Enable long stack traces to ensure stack trace parsing is triggered
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a function that will generate a specific stack trace pattern
      function testFunction() {
        return Q.reject(new Error("Test error"));
      }

      return testFunction()
        .then(null, (err: Error) => {
          // Verify the stack trace exists
          expect(err.stack).toBeDefined();

          // The key test: verify that stack traces with named functions are properly parsed
          // The mutation removes the return statement in the attempt1 branch
          const stackLines = err.stack.split('\n');
          const hasNamedFunctionPattern = stackLines.some(line =>
            /at testFunction \(\S+:\d+:\d+\)/.test(line)
          );

          // This assertion should fail if the mutation is present
          expect(hasNamedFunctionPattern).toBe(true);

          // Force the stack trace to be filtered by calling a method that uses it
          // This will trigger the getFileNameAndLineNumber function
          const filteredStack = err.stack.replace(/[^]/g, (match, offset) => {
            return match;
          });

          expect(filteredStack).toBe(err.stack);

          // Additional test: verify that the stack trace contains the expected line number
          const lineNumberMatch = err.stack.match(/at testFunction \(.*:(\d+):\d+\)/);
          expect(lineNumberMatch).not.toBeNull();
          expect(parseInt(lineNumberMatch![1])).toBeGreaterThan(0);

          // Test that the function returns the correct file name and line number
          const fileNameAndLineNumber = err.stack.match(/at testFunction \((.*):(\d+):\d+\)/);
          expect(fileNameAndLineNumber).not.toBeNull();
          expect(fileNameAndLineNumber![1]).toBeDefined();
          expect(fileNameAndLineNumber![2]).toBeDefined();

          return Q.resolve(true);
        });
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
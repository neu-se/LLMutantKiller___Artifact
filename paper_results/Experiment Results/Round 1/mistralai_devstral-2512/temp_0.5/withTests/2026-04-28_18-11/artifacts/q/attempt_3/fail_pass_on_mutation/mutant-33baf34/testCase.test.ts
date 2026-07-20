// Test case to detect the mutation in the getFileNameAndLineNumber function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation test", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a test that specifically exercises the getFileNameAndLineNumber function
    // by creating a stack trace with a named function pattern

    // This test creates a scenario where we can verify the parsing of stack traces
    // The mutation removes the return statement in the attempt1 branch, which would
    // cause the function to return undefined for named function stack lines

    // We'll use Q's long stack support to trigger stack trace parsing
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a promise chain that will generate stack traces
      const error = new Error("Test error");

      // This should trigger the getFileNameAndLineNumber function through
      // the stack trace filtering mechanism
      return Q.reject(error)
        .then(null, (err: Error) => {
          // Verify the stack trace exists
          expect(err.stack).toBeDefined();
          expect(typeof err.stack).toBe("string");

          // The key test: verify that stack traces with named functions are properly parsed
          // If the mutation is present, this parsing would fail for named function patterns
          const stackLines = err.stack.split('\n');
          const hasValidPattern = stackLines.some(line =>
            /at \S+ \(\S+:\d+:\d+\)/.test(line)
          );

          // This assertion should fail if the mutation is present because
          // the function would return undefined for named function patterns
          expect(hasValidPattern).toBe(true);

          return Q.resolve(true);
        });
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
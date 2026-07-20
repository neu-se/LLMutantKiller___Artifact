import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
  it("should correctly parse stack lines with @ symbol when long stack traces are enabled", () => {
    // Enable long stack traces to trigger the parsing logic
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q.resolve().then(() => {
      // Create an error with a specific stack format
      const error = new Error("Test error");
      // This stack line format should match the attempt3 regex in original code
      // but fail in mutated code due to the changed regex pattern
      error.stack = "Error: Test error\n    at http://example.com/file.js:42";
      throw error;
    });

    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (error: Error) => {
        // Verify the error was properly processed
        expect(error).toBeDefined();
        expect(error.stack).toBeDefined();

        // The key assertion: in original code, the stack should be properly filtered
        // In mutated code, the stack filtering might behave differently
        // We check for the presence of the file location in the stack
        expect(error.stack).toContain("file.js:42");

        // Restore original setting
        Q.longStackSupport = originalLongStackSupport;
      }
    );
  });
});
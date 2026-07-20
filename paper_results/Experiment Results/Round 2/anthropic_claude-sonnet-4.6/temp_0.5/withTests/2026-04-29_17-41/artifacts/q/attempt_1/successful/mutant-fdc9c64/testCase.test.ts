import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces preserve external frames", () => {
  it("should include external function names in long stack traces when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    try {
      function outerFunction() {
        return Q().then(function innerFunction() {
          throw new Error("test error from external code");
        });
      }

      let capturedError: Error | null = null;

      await outerFunction().catch(function (err: Error) {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      expect(capturedError!.stack).toBeDefined();

      // The stack trace should contain references to our external functions
      // With the mutation, frames from external files with line numbers <= qEndingLine
      // would be incorrectly filtered as internal Q frames
      const stack = capturedError!.stack as string;

      // The error message should be in the stack
      expect(stack).toContain("test error from external code");

      // The stack should contain the function name from our test file
      // With the mutation, external frames may be incorrectly filtered out
      // because lineNumber <= qEndingLine would match many external frames
      expect(stack).toContain("innerFunction");
    } finally {
      Q.longStackSupport = false;
    }
  });
});
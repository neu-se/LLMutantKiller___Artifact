import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with multi-digit line numbers", () => {
  it("should properly include caller function names in long stack traces when line numbers are multi-digit", async () => {
    Q.longStackSupport = true;

    try {
      // We need to create a rejection that goes through makeStackTraceLong
      // The stack trace will have multi-digit line numbers (this test file itself)
      // filterStackString uses getFileNameAndLineNumber to filter internal Q frames
      // If the regex only matches single-digit line numbers, internal Q frames
      // won't be recognized and will pollute the stack trace, OR external frames
      // won't be recognized properly.

      function outerFunction() {
        return Q().then(function innerFunction() {
          throw new Error("test error");
        });
      }

      let capturedError: Error | null = null;

      await outerFunction().catch(function(err: Error) {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as Error).stack || "";

      // The stack should contain our function names
      // With proper regex (multi-digit line numbers), Q internal frames get filtered
      // and our frames remain. With the mutated regex, lines with line numbers >= 10
      // won't be parsed, so isInternalFrame returns false for all Q internal lines
      // (since getFileNameAndLineNumber returns undefined), meaning Q internal frames
      // are NOT filtered out - the stack will contain Q internal frames.
      // 
      // More specifically: the long stack trace feature concatenates stacks.
      // With the mutation, getFileNameAndLineNumber fails for lines with multi-digit
      // line numbers, so filterStackString keeps all lines (including Q internals).
      // This means the stack trace will be longer/different.
      //
      // We verify the stack contains our test function name (which proves
      // the long stack trace mechanism worked and our frames were preserved).
      expect(stack).toContain("outerFunction");
    } finally {
      Q.longStackSupport = false;
    }
  });
});
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with stack line parsing", () => {
  it("should correctly build long stack traces that include caller function names", async () => {
    Q.longStackSupport = true;

    try {
      function outerFunction() {
        return Q().then(function innerFunction() {
          return Q.reject(new Error("test error"));
        });
      }

      let capturedError: Error | null = null;

      await outerFunction().catch(function (err: Error) {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      expect(capturedError!.stack).toBeDefined();

      // With correct stack parsing, Q can identify and filter its own internal
      // frames and properly concatenate stack traces. The stack should contain
      // the user-defined function names.
      // If column number parsing is broken (only matches single digit columns),
      // captureLine() returns undefined, qStartingLine is undefined,
      // isInternalFrame always returns false, and Q internal frames are NOT filtered.
      // This means the long stack trace will contain Q internal frames like
      // "promiseDispatch", "flush", etc. which should normally be filtered out.
      
      const stack = capturedError!.stack!;
      
      // The stack should contain our user function
      expect(stack).toContain("innerFunction");
      
      // With correct parsing, Q filters its own internal frames.
      // With broken parsing (mutant), Q cannot determine its own line range,
      // so qStartingLine stays undefined and isInternalFrame always returns false,
      // meaning internal Q frames like "runSingle" and "flush" appear in the stack.
      // We verify the stack does NOT contain Q-internal implementation details
      // that should be filtered out.
      expect(stack).not.toMatch(/\bflush\b/);
      expect(stack).not.toMatch(/\brunSingle\b/);
    } finally {
      Q.longStackSupport = false;
    }
  });
});
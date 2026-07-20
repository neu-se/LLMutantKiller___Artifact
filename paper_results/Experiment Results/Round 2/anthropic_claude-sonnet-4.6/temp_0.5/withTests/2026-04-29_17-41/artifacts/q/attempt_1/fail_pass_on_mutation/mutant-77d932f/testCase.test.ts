import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber via long stack support", () => {
  it("should produce long stack traces that include 'From previous event:' when longStackSupport is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      let capturedStack: string | undefined;

      await new Promise<void>((resolve) => {
        function step1() {
          return Q().then(function step2() {
            return Q().then(function step3() {
              throw new Error("test error for long stack trace");
            });
          });
        }

        step1().catch(function (err: Error) {
          capturedStack = err.stack;
          resolve();
        });
      });

      // With the original code, getFileNameAndLineNumber works correctly,
      // captureLine() returns a valid line number, and long stack traces
      // are built with "From previous event:" separators.
      // With the mutated code, getFileNameAndLineNumber always returns undefined,
      // so captureLine() returns undefined, qStartingLine is undefined,
      // and isInternalFrame comparisons fail silently - but more importantly,
      // the stack filtering in filterStackString removes lines that aren't
      // internal frames differently, affecting whether "From previous event:"
      // appears in the concatenated stack.
      expect(capturedStack).toBeDefined();
      expect(capturedStack).toContain("From previous event:");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
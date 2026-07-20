import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine and stack trace filtering", () => {
  it("should filter internal Q frames from long stack traces when longStackSupport is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      await new Promise<void>((resolve) => {
        function outerFunction() {
          return Q().then(function innerFunction() {
            throw new Error("test error for stack filtering");
          });
        }

        outerFunction().catch(function (err: Error) {
          capturedError = err;
          resolve();
        });
      });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as unknown as Error).stack || "";

      // The stack should contain user code frames
      expect(stack).toContain("test error for stack filtering");

      // With the original code, captureLine() works correctly so internal Q frames
      // are filtered out. The stack should NOT contain references to Q's internal
      // promise dispatch machinery lines that are within the Q library itself.
      // Specifically, the stack should not be excessively long with Q internals.
      // 
      // With the mutation (if hasStacks → return early), qStartingLine is undefined,
      // so isInternalFrame always returns false, meaning Q internal frames are NOT
      // filtered. This causes the stack to contain many more lines including Q internals.
      //
      // We check that the stack does NOT contain "promiseDispatch" which is an internal
      // Q function that should be filtered out when captureLine works correctly.
      const lines = stack.split("\n");
      const hasPromiseDispatch = lines.some(
        (line: string) => line.includes("promiseDispatch") && !line.includes("test error")
      );

      // In the original code, internal Q frames like promiseDispatch are filtered out
      // In the mutated code, they are NOT filtered (qStartingLine is undefined)
      expect(hasPromiseDispatch).toBe(false);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
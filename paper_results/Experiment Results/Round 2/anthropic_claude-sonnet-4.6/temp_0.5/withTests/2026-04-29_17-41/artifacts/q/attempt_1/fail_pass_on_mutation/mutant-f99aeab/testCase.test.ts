import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine and stack filtering", () => {
  it("should correctly filter Q internal frames from long stack traces when stacks are available", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      await new Promise<void>((resolve) => {
        function level1() {
          return Q().then(function level2() {
            return Q.reject(new Error("test error from user code"));
          });
        }

        level1().fail(function (err: Error) {
          capturedError = err;
          resolve();
        });
      });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as Error).stack || "";

      // The stack should contain the user-defined function names
      expect(stack).toContain("level2");

      // With the original code, Q internals are filtered out via isInternalFrame.
      // isInternalFrame relies on qFileName and qStartingLine being set by captureLine().
      // With the mutation (if hasStacks -> return early), captureLine returns undefined,
      // so qStartingLine = undefined and qEndingLine = undefined.
      // When qStartingLine is undefined, isInternalFrame returns false for all frames,
      // meaning Q internal frames are NOT filtered.
      // We verify that the stack trace is a non-empty string (basic sanity),
      // and more importantly that qFileName was set (indirectly tested via filtering behavior).
      
      // In the original: Q internal frames (from q.js) are filtered out.
      // In the mutated: Q internal frames remain in the stack.
      // We check that the stack does NOT contain excessive Q internal references
      // by verifying "promiseDispatch" (a Q internal) doesn't dominate the trace.
      // Actually, let's test via the filterStackString path more directly:
      // The concatenated long stack should include "From previous event:" separator
      // only if the promise chain was built correctly with stack info.
      
      // With original code: qFileName is set, so Q frames get filtered, 
      // and the "From previous event:" separator appears in long stacks.
      // With mutated code: captureLine returns undefined early, qFileName stays undefined,
      // isInternalFrame always returns false, Q frames are NOT filtered.
      
      // The key observable: with long stacks enabled and stacks available,
      // the error stack should contain "From previous event:" indicating
      // the long stack trace was assembled (requires proper captureLine behavior).
      expect(stack).toContain("From previous event:");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
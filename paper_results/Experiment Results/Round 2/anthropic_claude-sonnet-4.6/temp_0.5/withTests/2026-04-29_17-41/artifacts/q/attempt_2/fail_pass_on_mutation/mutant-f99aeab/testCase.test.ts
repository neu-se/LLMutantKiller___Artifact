import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine stack filtering", () => {
  it("should filter Q internal frames from stack traces, keeping only user frames", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      await new Promise<void>((resolve) => {
        // Create a simple rejection so we get a stack trace processed by filterStackString
        Q.reject(new Error("sentinel error")).fail(function (err: Error) {
          capturedError = err;
          resolve();
        });
      });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as Error).stack || "";

      // In the original code, captureLine() correctly sets qFileName and qStartingLine/qEndingLine.
      // This means isInternalFrame() correctly identifies Q internal lines and filterStackString
      // removes them. The resulting stack should NOT contain Q internal function names like
      // "promiseDispatch" which are deep inside q.js internals.
      //
      // In the mutated code, captureLine() returns undefined immediately (because hasStacks is true),
      // so qFileName remains undefined and qStartingLine/qEndingLine are undefined.
      // isInternalFrame() always returns false, so Q internal frames are NOT filtered out.
      // The stack will contain Q internal function names.
      //
      // We verify that the stack does not contain "promiseDispatch" which is a Q internal.
      expect(stack).not.toContain("promiseDispatch");
    } finally {
      Q.longStackSupport = false;
    }
  });
});
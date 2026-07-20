import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering of Q internals", () => {
  it("should filter Q internal frames from long stack traces when line numbers are multi-digit", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      await new Promise<void>((resolve) => {
        Q.reject(new Error("test rejection")).fail(function (err: Error) {
          capturedError = err;
          resolve();
        });
      });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as unknown as Error).stack!;

      // With original code: captureLine() correctly parses multi-digit line numbers,
      // so Q internal frames (lines within q.js between qStartingLine and qEndingLine)
      // are filtered OUT of the stack trace.
      //
      // With mutated code: captureLine() returns undefined (can't parse multi-digit
      // line numbers), so isInternalFrame() never returns true, and Q internals
      // are NOT filtered - "promiseDispatch" and other Q internals appear in the stack.
      //
      // We check that Q's internal function names are NOT present in the filtered stack.
      expect(stack).not.toMatch(/promiseDispatch/);
      expect(stack).not.toMatch(/Promise\.prototype\.then/);
    } finally {
      Q.longStackSupport = false;
    }
  });
});
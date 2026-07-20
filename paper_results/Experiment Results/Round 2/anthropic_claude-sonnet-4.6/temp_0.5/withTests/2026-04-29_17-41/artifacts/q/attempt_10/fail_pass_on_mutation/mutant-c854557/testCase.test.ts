import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine and qStartingLine behavior", () => {
  it("correctly identifies Q internal frames using properly parsed line numbers", async () => {
    Q.longStackSupport = true;

    try {
      // When longStackSupport is on, promise.stack is captured in defer()
      // The promise.stack contains the call stack at the point .then() was called
      // After makeStackTraceLong runs, Q internal frames are filtered from error.stack
      // 
      // We verify filtering works by checking named Q frames don't appear.
      // If captureLine() used attempt2 and mutation corrupted qFileName,
      // then NO named Q frames would be filtered.

      let capturedError: any = null;

      // Use Q.when which internally calls defer() and captures promise.stack
      await Q.when(
        Q.resolve(42),
        function userCallback() {
          throw new Error("deliberate");
        }
      ).then(undefined, function(e: any) {
        capturedError = e;
      });

      expect(capturedError).not.toBeNull();
      const stack: string = capturedError.stack || "";

      // Long stack support must be working
      expect(stack).toContain("From previous event:");

      // Named Q internal frames must be filtered out
      // These appear in error.stack because they're on the call stack when the error is thrown
      // _fulfilled calls userCallback, runSingle calls the task, flush drives the queue
      expect(stack).not.toContain("_fulfilled");
      expect(stack).not.toContain("runSingle");
      expect(stack).not.toContain("flush");
    } finally {
      Q.longStackSupport = false;
    }
  });
});
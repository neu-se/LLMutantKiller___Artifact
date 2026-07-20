import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering with long stack support", () => {
  it("should properly filter internal Q frames leaving only user frames in long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      function userFunction() {
        return Q().then(function() {
          return Q.reject(new Error("user error"));
        });
      }

      let caughtError: any = null;
      await userFunction().catch(function(err: any) {
        caughtError = err;
      });

      expect(caughtError).not.toBeNull();
      const stack: string = caughtError.stack || "";

      // The long stack trace should contain our user function
      expect(stack).toContain("userFunction");
      
      // With original: Q internal anonymous frames are filtered out
      // With mutation: attempt2 fails for multi-digit line numbers,
      // so qFileName is never set by captureLine(), meaning isInternalFrame
      // always returns false, and Q internal frames pollute the stack.
      // The "From previous event:" separator indicates long stacks are working,
      // but the content differs.
      //
      // Count occurrences of Q-internal patterns that should be filtered
      const fromPreviousEvent = "From previous event:";
      expect(stack).toContain(fromPreviousEvent);
      
      // In the original, internal Q frames are filtered, so the stack between
      // "From previous event:" markers should NOT contain Q internals like "flush"
      // or "runSingle" which are anonymous/internal
      expect(stack).not.toMatch(/\bflush\b/);
    } finally {
      Q.longStackSupport = false;
    }
  });
});
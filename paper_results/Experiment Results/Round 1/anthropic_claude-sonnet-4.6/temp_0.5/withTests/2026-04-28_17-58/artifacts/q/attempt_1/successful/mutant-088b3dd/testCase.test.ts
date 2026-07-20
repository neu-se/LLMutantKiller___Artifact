import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber via long stack trace filtering", () => {
  it("should correctly parse named function stack frames so that Q internal frames are filtered from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      const error = await Q.fcall(function outerFunction() {
        return Q.fcall(function innerFunction() {
          throw new Error("test error");
        });
      }).then(undefined, function(err: Error) {
        return err;
      });

      // The stack should exist
      expect(error).toBeDefined();
      expect(error.stack).toBeDefined();

      const stack: string = error.stack;

      // With the original code, getFileNameAndLineNumber correctly parses
      // named function frames (attempt1 regex), so Q internal frames get
      // filtered out. The stack should contain user-defined function names
      // like outerFunction and innerFunction, but NOT Q internal functions
      // like "flush" or "runSingle" which are internal to q.js.
      //
      // With the mutation (if (false)), attempt1 never matches, so
      // captureLine() returns undefined, qStartingLine/qEndingLine are
      // undefined, and isInternalFrame() never returns true, meaning
      // Q internal frames are NOT filtered out and appear in the stack.

      // Check that Q internal implementation details are filtered out
      // (they should not appear in a properly filtered stack trace)
      expect(stack).not.toMatch(/\bflush\b.*q\.js/);
      expect(stack).not.toMatch(/\brunSingle\b.*q\.js/);

      // The user's function names should appear in the stack
      expect(stack).toMatch(/innerFunction/);
    } finally {
      Q.longStackSupport = false;
    }
  });
});
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering with named function frames", () => {
  it("should filter Q internal frames from long stack traces when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    try {
      await Q.Promise((resolve, reject) => {
        reject(new Error("test error"));
      });
    } catch (e) {
      capturedError = e as Error;
    }

    expect(capturedError).not.toBeNull();
    expect(capturedError!.message).toBe("test error");

    // The key test: with the original code, Q filters its own internal frames
    // from stack traces. With the mutation, getFileNameAndLineNumber returns
    // undefined for named function frames (like "at functionName (file:line:col)"),
    // so qFileName/qStartingLine won't be set properly, and internal frames
    // won't be filtered. We check that the stack doesn't contain Q internal
    // function names that should be filtered.
    if (capturedError!.stack) {
      // In the original, Q's internal frames like "Promise.prototype.then" 
      // should be filtered out. In the mutated version, they won't be.
      // We verify the promise resolves correctly as a basic sanity check,
      // and that the stack trace behavior is consistent.
      const stack = capturedError!.stack;
      
      // The stack should contain our test code reference
      expect(stack).toContain("test error");
      
      // With original code: qFileName is set, so isInternalFrame works,
      // and Q frames are filtered. With mutation: qFileName may not be set
      // (captureLine uses getFileNameAndLineNumber on a named function frame),
      // so Q frames appear in the stack.
      // We check that the stack does NOT contain Q's internal dispatch functions
      // which should be filtered in the original.
      // This is the observable difference.
      const hasQInternalFrames = stack.includes("promiseDispatch") || 
                                   stack.includes("Promise.prototype.then");
      
      // In original: internal frames filtered (false)
      // In mutated: internal frames NOT filtered (true) 
      expect(hasQInternalFrames).toBe(false);
    }

    Q.longStackSupport = false;
  });
});
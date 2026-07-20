import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber with named function stack frames", () => {
  it("should properly filter internal Q frames from long stack traces, indicating named function stack lines are parsed correctly", async () => {
    Q.longStackSupport = true;

    try {
      const error = await Q.reject(new Error("test error"))
        .then(function namedFunction() {
          return 42;
        })
        .fail(function captureError(err: Error) {
          return err;
        });

      // The stack trace should exist
      expect((error as Error).stack).toBeDefined();

      // With the original code, getFileNameAndLineNumber correctly parses
      // named function frames (format: "at functionName (filename:line:col)")
      // This allows captureLine() to correctly identify qFileName and qStartingLine,
      // which in turn allows isInternalFrame() to filter Q internals.
      //
      // With the mutated code, named function frames return undefined,
      // so captureLine() cannot determine qFileName, and isInternalFrame()
      // always returns false, meaning Q internal frames are NOT filtered.
      //
      // We test this by checking that a long stack trace for a rejected promise
      // does NOT contain Q internal implementation details (like "promiseDispatch")
      // when the original code is used (they get filtered out).
      // With the mutation, these internal frames would appear in the stack.
      
      const stack = (error as Error).stack || "";
      
      // In the original code, Q internal frames are filtered out.
      // "promiseDispatch" is an internal Q function that should be filtered.
      // With the mutation, it won't be filtered and will appear in the stack.
      expect(stack).not.toMatch(/promiseDispatch/);
    } finally {
      Q.longStackSupport = false;
    }
  });
});
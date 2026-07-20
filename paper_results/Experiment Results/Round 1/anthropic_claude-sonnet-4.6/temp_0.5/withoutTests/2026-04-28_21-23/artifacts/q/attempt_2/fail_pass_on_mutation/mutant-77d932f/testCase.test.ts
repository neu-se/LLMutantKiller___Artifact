import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
  it("should filter Q internal frames from long stack traces", async () => {
    const original = Q.longStackSupport;
    Q.longStackSupport = true;
    try {
      const stack = await new Promise<string>((resolve) => {
        const outer = Q.defer();
        outer.promise.fail((err: Error) => resolve(err.stack || ""));

        const inner = Q.defer();
        inner.promise.fail(outer.reject);
        inner.reject(new Error("test error"));
      });

      // With original code: getFileNameAndLineNumber works, captureLine returns
      // a valid line number, so qFileName and qStartingLine are set properly.
      // isInternalFrame correctly identifies Q's own frames and filters them out.
      // The resulting stack should NOT contain Q's internal implementation lines.
      //
      // With mutated code: getFileNameAndLineNumber returns undefined,
      // captureLine returns undefined, qFileName = undefined, qStartingLine = undefined.
      // isInternalFrame always returns false, so Q's internal frames are NOT filtered.
      // Q's own source file name will appear in the stack trace.
      
      // The stack should not contain references to q.js internal frames
      // In original: they get filtered by isInternalFrame
      // In mutated: they remain in the stack
      const lines = stack.split("\n").filter(line => line.trim().startsWith("at "));
      
      // With original code working properly, Q internal frames are filtered,
      // so the stack lines should only contain user code, not q.js internals
      // With mutation, q.js internal lines remain
      const hasQInternalFrames = lines.some(line => 
        line.includes("q.js") && (
          line.includes("Promise.prototype.then") ||
          line.includes("runSingle") ||
          line.includes("flush") ||
          line.includes("nextTick")
        )
      );
      
      expect(hasQInternalFrames).toBe(false);
    } finally {
      Q.longStackSupport = original;
    }
  });
});
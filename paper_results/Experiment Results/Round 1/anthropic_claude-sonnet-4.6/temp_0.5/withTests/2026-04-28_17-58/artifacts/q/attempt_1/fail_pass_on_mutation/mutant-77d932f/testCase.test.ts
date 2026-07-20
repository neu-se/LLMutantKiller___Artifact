import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces filtering", () => {
  it("should filter Q internal frames from long stack traces when longStackSupport is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      const error = await Q.reject(new Error("test error"))
        .then(() => {})
        .catch((err: Error) => err);

      // With the original code, Q's internal frames (from q.js) should be filtered
      // from the stack trace. With the mutated code, getFileNameAndLineNumber returns
      // undefined, so isInternalFrame always returns false, meaning Q internal frames
      // are NOT filtered. However, captureLine() also returns undefined, so qFileName
      // is undefined and qStartingLine is undefined.
      // The key observable difference: with the original code, captureLine() correctly
      // captures the line number, enabling isInternalFrame to work.
      // We test that the error has a stack property and that it doesn't contain
      // excessive Q internal implementation noise.
      
      // The stack should exist
      expect(error.stack).toBeDefined();
      
      // With original code: Q internal frames filtered, stack is cleaner
      // With mutated code: getFileNameAndLineNumber returns undefined everywhere,
      // so filterStackString removes nothing (isInternalFrame always false),
      // but more importantly, the stack trace will contain Q's own implementation lines
      
      // Count occurrences of "promiseDispatch" or other Q internals in stack
      const stackLines = error.stack!.split("\n");
      const qInternalLines = stackLines.filter(line => 
        line.includes("promiseDispatch") || 
        line.includes("Promise.prototype.then") ||
        line.includes("flush") && line.includes("q.js")
      );
      
      // With original code, Q internal frames are filtered out
      // With mutated code, they remain (since isInternalFrame always returns false)
      expect(qInternalLines.length).toBe(0);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
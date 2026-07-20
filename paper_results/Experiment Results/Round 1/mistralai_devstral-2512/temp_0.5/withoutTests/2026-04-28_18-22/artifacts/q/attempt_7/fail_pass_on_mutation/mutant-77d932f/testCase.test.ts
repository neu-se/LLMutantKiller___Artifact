const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
  it("should properly filter internal stack frames from error traces", () => {
    // Create a scenario that exercises the stack trace filtering
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a promise chain that will generate internal frames
      const promise = Q.resolve()
        .then(() => {
          throw new Error("Test error");
        })
        .catch((e: Error) => {
          // The error should have been processed through makeStackTraceLong
          // which uses getFileNameAndLineNumber to filter internal frames
          return Q.reject(e);
        });

      // Get the stack trace
      const stackTrace = promise.stack;

      // The original code should filter out internal Q frames
      // The mutated code (empty getFileNameAndLineNumber) won't filter them
      // So we check for the presence of Q internal implementation details
      const hasInternalImplementation = stackTrace && (
        stackTrace.includes("promiseDispatch") ||
        stackTrace.includes("nextTick") ||
        stackTrace.includes("makeStackTraceLong")
      );

      // In the original code, these should be filtered out (false)
      // In the mutated code, they would remain (true)
      expect(hasInternalImplementation).toBe(false);

    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
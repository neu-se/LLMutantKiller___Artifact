const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
  it("should correctly identify and filter Q library frames from stack traces", () => {
    // Test the stack trace filtering by creating a promise rejection
    // that would normally have Q internal frames filtered out
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a promise chain that will generate stack frames
      const deferred = Q.defer();
      const testError = new Error("Test error for stack trace");
      deferred.reject(testError);

      // Get the promise and examine its stack
      const promise = deferred.promise;
      const stackTrace = promise.stack;

      // The original getFileNameAndLineNumber should identify Q frames
      // The mutated version (empty function) would fail to identify them
      // We test this by looking for specific Q internal function names
      // that should be filtered out in the original code
      const containsQInternals = stackTrace && (
        stackTrace.includes("q.js") ||
        stackTrace.includes("promiseDispatch") ||
        stackTrace.includes("makeStackTraceLong")
      );

      // In original code: these should be filtered out (false)
      // In mutated code: these would remain visible (true)
      expect(containsQInternals).toBe(false);

    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
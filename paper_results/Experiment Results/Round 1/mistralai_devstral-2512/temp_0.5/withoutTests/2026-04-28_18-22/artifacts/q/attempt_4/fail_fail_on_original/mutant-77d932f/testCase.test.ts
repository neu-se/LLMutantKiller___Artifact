const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
  it("should correctly filter internal stack frames", () => {
    // Create a scenario that will generate stack traces with internal frames
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a rejected promise that will have internal Q frames in its stack
      const deferred = Q.defer();
      deferred.reject(new Error("Test error"));

      // Get the promise's stack trace
      const promise = deferred.promise;
      const stackTrace = promise.stack;

      // The original code should filter out internal Q frames
      // The mutated code (with empty getFileNameAndLineNumber) won't filter them
      // So we check if the stack contains Q internal frames
      const hasQInternalFrames = stackTrace && (
        stackTrace.includes("q.js") ||
        stackTrace.includes("promiseDispatch") ||
        stackTrace.includes("From previous event")
      );

      // In the original code, internal frames should be filtered out
      // In the mutated code, they won't be filtered
      expect(hasQInternalFrames).toBe(false);

    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
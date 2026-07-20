const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
  it("should correctly filter internal stack frames when long stack traces are enabled", () => {
    // Enable long stack traces to test the filtering functionality
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a promise chain that will generate internal stack frames
      const promise = Q.resolve()
        .then(() => {
          throw new Error("Test error");
        })
        .catch((e: Error) => {
          // The error should have been processed through makeStackTraceLong
          // which uses getFileNameAndLineNumber to identify and filter internal frames
          return Q.reject(e);
        });

      // Get the stack trace from the promise
      const stackTrace = promise.stack;

      // The original code should filter out internal Q frames
      // The mutated code (empty getFileNameAndLineNumber) won't filter them
      // We test this by checking for the presence of Q-specific stack markers
      const hasQStackMarkers = stackTrace && (
        stackTrace.includes("From previous event") ||
        (stackTrace.includes("q.js") && stackTrace.includes("at "))
      );

      // In the original code, these markers should be present (true)
      // In the mutated code, they might be missing or different (false)
      expect(hasQStackMarkers).toBe(true);

    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
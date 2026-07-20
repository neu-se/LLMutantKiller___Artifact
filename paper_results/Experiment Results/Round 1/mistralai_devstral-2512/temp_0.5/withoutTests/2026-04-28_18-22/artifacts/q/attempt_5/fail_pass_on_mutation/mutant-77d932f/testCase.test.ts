const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
  it("should correctly identify internal stack frames", () => {
    // Test the internal frame detection by creating a scenario that exercises
    // the stack trace filtering functionality
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a promise chain that will generate internal stack frames
      const promise = Q.resolve()
        .then(() => {
          throw new Error("Test error");
        })
        .catch((e: Error) => {
          // The error should have a stack trace that includes Q internal frames
          // before filtering
          return Q.reject(e);
        });

      // Force the promise to generate its stack trace
      const stackTrace = promise.stack;

      // The original code should properly identify and filter internal frames
      // The mutated code (with empty getFileNameAndLineNumber) won't be able to
      // identify internal frames, so the stack won't be properly filtered
      // We test this by checking if the stack contains Q-specific markers
      const hasQMarkers = stackTrace && (
        stackTrace.includes("From previous event") ||
        (stackTrace.includes("q.js") && stackTrace.includes("at "))
      );

      // In the original code, these markers should be present (not filtered out)
      // In the mutated code, they might be missing or different
      expect(hasQMarkers).toBe(true);

    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
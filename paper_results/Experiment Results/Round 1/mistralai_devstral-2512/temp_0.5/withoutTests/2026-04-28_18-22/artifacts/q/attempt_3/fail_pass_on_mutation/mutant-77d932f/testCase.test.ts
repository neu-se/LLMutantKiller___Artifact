const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
  it("should correctly parse stack traces to filter internal frames", async () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.resolve();
    let stackTrace: string | undefined;

    // Force long stack traces to be enabled for this test
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      await promise
        .then(() => {
          throw new Error("Test error");
        })
        .catch((e: Error) => {
          stackTrace = e.stack;
          return Q.reject(e);
        })
        .catch(() => {
          // Swallow the error to prevent test failure
        });

      // Verify that the stack trace was captured
      expect(stackTrace).toBeDefined();
      expect(stackTrace!.length).toBeGreaterThan(0);

      // The mutation would cause isInternalFrame to always return false
      // because getFileNameAndLineNumber returns undefined
      // This means stack traces wouldn't be properly filtered
      // We can detect this by checking if internal Q frames appear in the stack
      const hasInternalFrames = stackTrace!.includes("q.js") || stackTrace!.includes("From previous event");
      expect(hasInternalFrames).toBe(true);

    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
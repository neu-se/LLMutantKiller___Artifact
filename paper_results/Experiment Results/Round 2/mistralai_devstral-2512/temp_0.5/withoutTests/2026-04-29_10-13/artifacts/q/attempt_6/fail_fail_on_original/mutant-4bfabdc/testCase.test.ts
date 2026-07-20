const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter internal frames from stack traces", () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a promise chain that will generate a stack trace
      const promise = Q.reject(new Error("Test error"));

      // Force the promise to be handled in a way that triggers stack trace filtering
      return promise.then(
        () => {},
        (error: Error) => {
          const stack = error.stack || "";
          // The mutation changes the condition from AND to OR in filterStackString
          // This means some internal frames that should be filtered will remain
          // We need to check for specific internal Q frames that should be filtered
          // but would remain with the mutation
          const hasInternalFrames = stack.includes("at Promise") ||
                                   stack.includes("at defer") ||
                                   stack.includes("at makeStackTraceLong");
          expect(hasInternalFrames).toBe(false);
        }
      );
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
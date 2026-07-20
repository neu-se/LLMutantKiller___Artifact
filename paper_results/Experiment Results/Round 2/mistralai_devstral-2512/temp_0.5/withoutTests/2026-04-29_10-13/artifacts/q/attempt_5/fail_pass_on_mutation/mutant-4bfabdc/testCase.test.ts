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
          // The stack trace should be filtered to remove internal Q frames
          // With the mutation, the filtering logic is broken (OR instead of AND)
          // This should cause more frames to be incorrectly included
          const stack = error.stack || "";
          // The original code should filter out internal frames, so we expect
          // the stack to not contain certain internal Q implementation details
          expect(stack.includes("at filterStackString")).toBe(false);
          expect(stack.includes("at isInternalFrame")).toBe(false);
          expect(stack.includes("at isNodeFrame")).toBe(false);
        }
      );
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
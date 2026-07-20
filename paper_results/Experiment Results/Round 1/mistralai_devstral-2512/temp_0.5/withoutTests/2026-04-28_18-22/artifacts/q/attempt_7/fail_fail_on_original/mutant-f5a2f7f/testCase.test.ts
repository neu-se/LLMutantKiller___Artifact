const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace initialization", () => {
  it("should properly handle stack trace capture when hasStacks is false", () => {
    // This test targets the mutation in captureLine() function
    // The mutation changes `if (!hasStacks)` to `if (false)` which breaks
    // the early return path when stack traces are not available

    // Save original hasStacks value
    const originalHasStacks = Q.hasStacks;

    try {
      // Simulate environment without stack traces
      Q.hasStacks = false;

      // Force long stack traces to trigger captureLine()
      Q.longStackSupport = true;

      // Create a deferred promise
      const deferred = Q.defer();
      const promise = deferred.promise;

      // Reject to trigger stack capture
      deferred.reject(new Error("test error"));

      return promise.then(
        () => {
          throw new Error("Should not reach here");
        },
        (error: Error) => {
          // In original code with hasStacks=false, captureLine() returns early
          // In mutated code, the condition always evaluates to false, breaking this path
          expect(error.message).toBe("test error");

          // The key difference: in original code, promise.stack should be undefined
          // when hasStacks is false, but in mutated code it might be set incorrectly
          expect(promise.stack).toBeUndefined();
        }
      );
    } finally {
      // Restore original value
      Q.hasStacks = originalHasStacks;
    }
  });
});
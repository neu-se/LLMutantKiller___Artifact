const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace initialization", () => {
  it("should correctly handle stack trace capture when hasStacks is false", () => {
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

      // In original code with hasStacks=false, promise.stack should be undefined
      // In mutated code, the condition always evaluates to false, so stack might be set
      // We need to check if the stack is actually undefined when hasStacks is false
      if (!Q.hasStacks) {
        expect(promise.stack).toBeUndefined();
      }

      // Reject to trigger stack capture
      deferred.reject(new Error("test error"));

      return promise.then(
        () => {
          throw new Error("Should not reach here");
        },
        (error: Error) => {
          expect(error.message).toBe("test error");
        }
      );
    } finally {
      // Restore original value
      Q.hasStacks = originalHasStacks;
    }
  });
});
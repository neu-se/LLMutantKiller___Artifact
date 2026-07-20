const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should properly handle stack trace capture when hasStacks is false", () => {
    // Create a promise that will trigger stack trace capture
    const deferred = Q.defer();

    // Force hasStacks to be false by manipulating the environment
    const originalHasStacks = Q.longStackSupport;
    Q.longStackSupport = false;

    try {
      // Reject the promise to trigger stack trace handling
      deferred.reject(new Error("Test error"));

      // The mutation affects the captureLine function which is called during promise creation
      // In the original code, when hasStacks is false, it should return early
      // In the mutated code, it would not return properly
      return deferred.promise.then(
        () => {
          throw new Error("Promise should have been rejected");
        },
        (error: Error) => {
          expect(error.message).toBe("Test error");
          // Verify the promise has proper stack handling
          expect(deferred.promise.stack).toBeUndefined();
        }
      );
    } finally {
      Q.longStackSupport = originalHasStacks;
    }
  });
});
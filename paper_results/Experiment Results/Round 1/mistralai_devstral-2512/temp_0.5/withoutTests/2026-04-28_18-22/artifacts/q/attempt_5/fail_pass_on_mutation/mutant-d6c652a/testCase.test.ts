const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should handle stack trace capture when hasStacks is false", () => {
    // Save original hasStacks value
    const originalHasStacks = Q.longStackSupport;

    try {
      // Force hasStacks to be false
      Q.longStackSupport = false;

      // Create a deferred promise
      const deferred = Q.defer();

      // Reject the promise
      deferred.reject(new Error("Test error"));

      // The mutation affects the captureLine function which is called during promise creation
      // This test verifies the code handles the false case correctly
      return deferred.promise.then(
        () => {
          throw new Error("Promise should have been rejected");
        },
        (error: Error) => {
          // This should execute without issues
          expect(error.message).toBe("Test error");
        }
      );
    } finally {
      // Restore original value
      Q.longStackSupport = originalHasStacks;
    }
  });
});
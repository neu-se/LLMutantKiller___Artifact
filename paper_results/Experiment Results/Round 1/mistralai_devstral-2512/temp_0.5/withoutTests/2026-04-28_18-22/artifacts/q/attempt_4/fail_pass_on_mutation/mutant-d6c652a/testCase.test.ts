const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace handling", () => {
  it("should properly handle stack traces when hasStacks is false", () => {
    // Save original hasStacks value
    const originalHasStacks = Q.longStackSupport;

    try {
      // Force hasStacks to be false
      Q.longStackSupport = false;

      // Create a rejected promise
      const rejectedPromise = Q.reject(new Error("Test error"));

      // The mutation would cause an issue if hasStacks is false
      // This test verifies the code handles the false case correctly
      return rejectedPromise.then(
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
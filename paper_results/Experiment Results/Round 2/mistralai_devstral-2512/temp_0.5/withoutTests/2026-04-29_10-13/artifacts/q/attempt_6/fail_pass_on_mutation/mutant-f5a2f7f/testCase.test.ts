const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should correctly handle stack trace capture when hasStacks is false", () => {
    // This test targets the specific mutation in captureLine function
    // Original: if (!hasStacks) { return; }
    // Mutated: if (false) { return; }

    // Create a scenario where hasStacks is false but we still try to capture
    // In original code, this should return early
    // In mutated code, this will try to execute the stack capture code

    // Save original hasStacks value
    const originalHasStacks = Q.hasStacks;

    try {
      // Force hasStacks to false
      Q.hasStacks = false;

      // Create a promise that will trigger stack trace handling
      const deferred = Q.defer();
      const promise = deferred.promise;

      // Reject to trigger stack handling
      deferred.reject(new Error("Test error"));

      // In original: should handle gracefully with early return
      // In mutated: will try to access e.stack when hasStacks is false
      return promise.catch((error: Error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");
        return null;
      });
    } finally {
      Q.hasStacks = originalHasStacks;
    }
  });
});
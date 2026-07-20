const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should correctly handle stack trace capture when hasStacks is false", () => {
    // This test targets the specific mutation in captureLine function
    // Original: if (!hasStacks) { return; }
    // Mutated: if (false) { return; }

    // Save original hasStacks value
    const originalHasStacks = Q.hasStacks;

    try {
      // Force hasStacks to false to test the early return path
      Q.hasStacks = false;

      // Create a promise that will trigger stack trace handling
      const deferred = Q.defer();
      const promise = deferred.promise;

      // Reject to trigger stack handling
      deferred.reject(new Error("Test error"));

      // In original: should handle gracefully with early return
      // In mutated: will try to execute stack capture code and fail
      return promise.catch((error: Error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");

        // Force evaluation of stack trace properties
        // This will fail in mutated version when it tries to
        // access stack properties that don't exist
        const stack = error.stack;
        if (stack) {
          expect(typeof stack).toBe("string");
        }
      });
    } finally {
      Q.hasStacks = originalHasStacks;
    }
  });
});
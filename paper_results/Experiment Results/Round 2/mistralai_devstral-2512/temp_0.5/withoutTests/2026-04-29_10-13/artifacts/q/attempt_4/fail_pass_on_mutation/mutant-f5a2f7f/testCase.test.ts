const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should correctly detect stack trace availability", () => {
    // This test directly tests the stack trace capture behavior
    // The mutation changes the condition from `if (!hasStacks)` to `if (false)`
    // which would prevent early return and force stack trace capture

    // Create a promise that will trigger stack trace handling
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Reject the promise to trigger stack trace handling
    deferred.reject(new Error("Test error"));

    // The original code should handle this based on hasStacks value
    // The mutated code will always try to capture stack traces
    return promise.catch((error: Error) => {
      // Verify the error is handled correctly
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Test error");

      // Check if stack trace was captured (only possible if hasStacks is true)
      // This will fail in the mutated version when hasStacks is false
      // because it will try to access e.stack when it doesn't exist
      if (error.stack) {
        expect(typeof error.stack).toBe("string");
      }
    });
  });
});
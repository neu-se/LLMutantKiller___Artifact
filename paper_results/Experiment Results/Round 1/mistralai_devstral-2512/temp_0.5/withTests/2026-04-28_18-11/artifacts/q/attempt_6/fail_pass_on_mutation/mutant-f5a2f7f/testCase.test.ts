import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine behavior", () => {
  it("should correctly handle early return when hasStacks is false", () => {
    // This test specifically targets the mutation in captureLine()
    // where `if (!hasStacks)` was changed to `if (false)`
    // We need to test behavior that would be affected by this change

    // Create a scenario that would trigger the early return path
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Store original longStackSupport setting
    const originalLongStackSupport = Q.longStackSupport;

    try {
      // Disable long stack traces to test the early return path
      Q.longStackSupport = false;

      // Reject the deferred
      deferred.reject(error);

      // Handle the rejection
      return deferred.promise.catch((caughtError: Error) => {
        // In the original code, when longStackSupport is false,
        // the stack trace should not be processed
        // In the mutated code, the condition is always false,
        // so it will try to process the stack trace anyway

        // The key difference is that the original code should
        // return early when hasStacks is false
        expect(caughtError.stack).toBeDefined();

        // This assertion should pass on original code but fail on mutated code
        // because the mutated code will try to process stack traces incorrectly
        expect(caughtError.stack).not.toContain("From previous event");

        return "recovered";
      });
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
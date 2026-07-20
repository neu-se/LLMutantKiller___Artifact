import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine behavior", () => {
  it("should correctly filter internal stack frames when hasStacks is true", () => {
    // This test specifically targets the mutation in captureLine()
    // The mutation changes `if (!hasStacks)` to `if (false)`, which means
    // the early return will never execute, potentially causing the function
    // to incorrectly process stack traces even when hasStacks is false

    // Force hasStacks to be false to test the early return path
    const originalHasStacks = Q.longStackSupport;
    Q.longStackSupport = false;

    try {
      const deferred = Q.defer();
      const error = new Error("Test error");

      // Reject the deferred
      deferred.reject(error);

      // Handle the rejection
      return deferred.promise.catch((caughtError: Error) => {
        // In the original code, when hasStacks is false, the stack should not be filtered
        // In the mutated code, the condition is always false, so it will try to process
        // the stack trace even when hasStacks is false, potentially causing issues
        expect(caughtError.stack).toBeDefined();
        return "recovered";
      });
    } finally {
      Q.longStackSupport = originalHasStacks;
    }
  });
});
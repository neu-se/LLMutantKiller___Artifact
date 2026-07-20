import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine behavior", () => {
  it("should correctly handle stack trace filtering based on hasStacks flag", () => {
    // This test targets the mutation in captureLine() where `if (!hasStacks)` was changed to `if (false)`
    // We need to test behavior that would be affected by this change

    // Create a scenario that would trigger stack trace filtering
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Store original longStackSupport setting
    const originalLongStackSupport = Q.longStackSupport;

    try {
      // Enable long stack traces to ensure captureLine is called
      Q.longStackSupport = true;

      // Reject the deferred to trigger error handling
      deferred.reject(error);

      // Handle the rejection
      return deferred.promise.catch((caughtError: Error) => {
        // The stack should be properly filtered in original code
        // In mutated code, the filtering might behave differently
        expect(caughtError.stack).toBeDefined();

        // Check that internal Q frames are filtered out
        // This is the key difference - original code should filter, mutated might not
        const stackLines = caughtError.stack!.split('\n');
        const hasQInternalFrames = stackLines.some(line =>
          line.includes('q.js') && line.includes('captureLine')
        );

        // In original code, internal frames should be filtered
        // In mutated code, this might not work correctly
        expect(hasQInternalFrames).toBe(false);
        return "recovered";
      });
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
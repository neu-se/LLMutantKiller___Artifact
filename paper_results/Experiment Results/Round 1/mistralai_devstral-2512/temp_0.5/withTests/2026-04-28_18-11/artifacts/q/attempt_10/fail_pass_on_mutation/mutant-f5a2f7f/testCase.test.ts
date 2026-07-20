import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine behavior", () => {
  it("should correctly handle stack trace filtering based on hasStacks flag", () => {
    // This test targets the mutation in captureLine() where `if (!hasStacks)` was changed to `if (false)`
    // We need to test the early return path that would be affected by this change

    // Create a deferred that will trigger stack trace capture
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
        // and might add the "From previous event" separator even when it shouldn't
        const stackLines = caughtError.stack!.split('\n');
        const hasPreviousEvent = stackLines.some(line =>
          line.includes("From previous event")
        );

        // In original code, this should be false
        // In mutated code, this might be true because it tries to process anyway
        expect(hasPreviousEvent).toBe(false);

        // Additional check: the stack should not contain Q internal frames
        const hasQInternalFrames = stackLines.some(line =>
          line.includes('q.js') && line.includes('captureLine')
        );

        expect(hasQInternalFrames).toBe(false);

        return "recovered";
      });
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
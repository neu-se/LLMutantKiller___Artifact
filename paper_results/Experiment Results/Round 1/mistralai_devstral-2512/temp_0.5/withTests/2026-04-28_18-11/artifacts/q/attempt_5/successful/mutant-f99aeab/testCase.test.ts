// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering initialization", () => {
  it("should properly initialize stack trace boundaries when hasStacks is true", () => {
    // The mutation changes the condition from `if (!hasStacks)` to `if (hasStacks)`
    // This affects whether the stack trace filtering initialization runs
    // We can detect this by checking if qFileName and qEndingLine are set correctly

    // Force long stack support to ensure hasStacks is true
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise that will generate stack traces
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Reject the promise to trigger stack trace handling
    deferred.reject(error);

    // In the original code, qFileName should be set when hasStacks is true
    // In the mutated code, the condition is inverted so initialization is skipped
    // This will cause stack filtering to fail
    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (e) => {
        // Check if stack trace filtering worked by examining the stack
        // In original code, internal Q frames should be filtered out
        // In mutated code, they will remain in the stack
        if (e.stack) {
          const hasQInternalFrames = e.stack.includes("q.js") && e.stack.includes("at ");
          // In original code with proper filtering, this should be false
          // In mutated code, it will be true
          expect(hasQInternalFrames).toBe(false);
        }
        return true;
      }
    ).finally(() => {
      Q.longStackSupport = originalLongStackSupport;
    });
  });
});
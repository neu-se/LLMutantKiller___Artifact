// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace initialization", () => {
  it("should properly initialize stack trace filtering when hasStacks is true", () => {
    // The mutation changes the condition from `if (!hasStacks)` to `if (hasStacks)`
    // This affects whether the stack trace filtering initialization code runs
    // We can detect this by checking if qFileName gets set when hasStacks is true

    // Create a deferred promise to test stack trace behavior
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Force long stack support to ensure hasStacks is true
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Reject the promise to trigger stack trace handling
    deferred.reject(error);

    // In the original code, qFileName should be set when hasStacks is true
    // In the mutated code, the condition is inverted so qFileName won't be set
    // This will cause stack filtering to fail
    return deferred.promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (e) => {
        // Check if stack trace filtering worked by examining the stack
        // In the original code, internal Q frames should be filtered out
        // In the mutated code, they might remain in the stack
        if (e.stack) {
          const hasQFrames = e.stack.includes("q.js") || e.stack.includes("From previous event");
          // In original code with proper filtering, this should be false
          // In mutated code, it might be true
          expect(hasQFrames).toBe(false);
        }
        return true;
      }
    ).finally(() => {
      Q.longStackSupport = originalLongStackSupport;
    });
  });
});
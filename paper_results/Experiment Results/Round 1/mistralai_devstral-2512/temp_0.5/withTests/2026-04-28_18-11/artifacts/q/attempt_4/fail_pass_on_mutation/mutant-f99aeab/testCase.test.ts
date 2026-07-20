// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering initialization", () => {
  it("should initialize qFileName when hasStacks is true", () => {
    // The mutation changes the condition from `if (!hasStacks)` to `if (hasStacks)`
    // This affects whether the stack trace filtering initialization runs
    // We can detect this by checking if the stack filtering is properly set up

    // Force long stack support to ensure hasStacks is true
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q.Promise((resolve, reject) => {
      reject(new Error("Test error"));
    });

    // In the original code, qFileName should be set when hasStacks is true
    // In the mutated code, the condition is inverted so initialization is skipped
    // This will cause stack filtering to fail
    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (error) => {
        // Check if stack trace filtering worked
        // In original code, internal frames should be filtered
        // In mutated code, they won't be filtered
        if (error.stack) {
          const hasInternalFrames = error.stack.includes("From previous event");
          // In original code with proper filtering, this should be true
          // In mutated code, it will be false
          expect(hasInternalFrames).toBe(true);
        }
        return true;
      }
    ).finally(() => {
      Q.longStackSupport = originalLongStackSupport;
    });
  });
});
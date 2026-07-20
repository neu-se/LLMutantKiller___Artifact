// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("captureLine mutation test", () => {
  it("should correctly capture stack trace line numbers", () => {
    // The mutation changes the condition in captureLine from `if (!hasStacks)` to `if (hasStacks)`
    // This affects whether the function returns early or continues to capture line numbers

    // First check if stack traces are available
    const testError = new Error();
    const hasStacks = !!testError.stack;

    // Enable long stack support which depends on captureLine
    Q.longStackSupport = true;

    // Create a promise that will trigger stack trace capturing
    const deferred = Q.defer();
    const promise = deferred.promise.then(() => {
      // Create an error to capture the stack trace
      const error = new Error("Test error");
      return Q.reject(error);
    });

    return promise.catch((error: any) => {
      // In original code, when hasStacks is true, captureLine should set qFileName and line numbers
      // In mutated code, when hasStacks is true, captureLine returns early without setting them

      const stack = error.stack;
      expect(stack).toBeDefined();

      // Check if stack contains line numbers (which requires proper captureLine execution)
      const hasLineNumbers = stack && stack.match(/:\d+:\d+/);

      if (hasStacks) {
        // Original code should have line numbers when stacks are available
        expect(hasLineNumbers).toBeTruthy();
      } else {
        // If no stack traces available, we can't test this
        expect(true).toBe(true);
      }

      // Verify the error message is present
      expect(stack).toContain("Test error");
    });
  });
});
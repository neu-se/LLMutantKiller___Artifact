// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("captureLine mutation test", () => {
  it("should correctly handle stack trace availability", () => {
    // The mutation changes the condition in captureLine from `if (!hasStacks)` to `if (hasStacks)`
    // This affects whether the function returns early or continues to capture stack info

    // We'll test by creating a scenario that exercises the captureLine logic
    // and checking if the internal state is properly set up

    // First, let's check if stack traces are available in this environment
    const testError = new Error();
    const hasStacks = !!testError.stack;

    // Create a promise that will trigger the internal stack trace logic
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The key difference between original and mutated code:
    // Original: when hasStacks is true, captureLine continues to set qFileName
    // Mutated: when hasStacks is true, captureLine returns early

    // We'll test this by checking if long stack traces work properly
    // (which depends on captureLine working correctly)
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const testPromise = promise.then(() => {
      throw new Error("Test error");
    });

    // Add a timeout to prevent hanging
    return Promise.race([
      testPromise.catch((error: any) => {
        // In original code, the stack should be properly formatted
        // In mutated code, the stack formatting will be broken
        expect(error.stack).toBeDefined();
        expect(error.stack.includes("Test error")).toBe(true);

        // Check if stack contains file information (requires proper captureLine)
        if (hasStacks) {
          expect(error.stack.includes(".js:") || error.stack.includes(".ts:")).toBe(true);
        }
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 1000))
    ]);
  }, 1500);
});
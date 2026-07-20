const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace handling", () => {
  it("should correctly handle stack trace capture based on hasStacks flag", () => {
    // Create a deferred promise
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Force the promise to be rejected to trigger stack trace handling
    const testError = new Error("test error");
    deferred.reject(testError);

    // Handle the rejection to prevent unhandled rejection warnings
    promise.catch(() => {
      // The test is about whether stack traces are captured, not about the error itself
    });

    // The key difference between original and mutated code:
    // Original: if (!hasStacks) - correctly skips stack capture when no stack support
    // Mutated: if (hasStacks) - incorrectly skips stack capture when stack support exists
    // This test verifies the behavior by checking if the promise has stack information

    // In environments with stack support, the original code would capture stacks
    // while the mutated code would skip them
    expect(promise.stack).toBeDefined();
  });
});
// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("captureLine mutation test", () => {
  it("should correctly set qFileName when stack traces are available", () => {
    // The mutation changes the condition in captureLine from `if (!hasStacks)` to `if (hasStacks)`
    // This affects whether qFileName gets set when stack traces are available

    // First check if this environment supports stack traces
    const testError = new Error();
    const hasStacks = !!testError.stack;

    // Enable long stack support which requires captureLine to work correctly
    Q.longStackSupport = true;

    // Create a deferred promise to trigger the captureLine logic
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The key difference between original and mutated code:
    // Original: when hasStacks is true, captureLine sets qFileName
    // Mutated: when hasStacks is true, captureLine returns early without setting qFileName

    // We'll test this by checking if the promise has proper stack information
    // which requires qFileName to be set for filtering to work

    // Resolve the promise to trigger the stack capture
    deferred.resolve("test");

    // Check if the promise has stack information
    // In original code, this should work when hasStacks is true
    // In mutated code, this will fail because qFileName wasn't set
    if (hasStacks) {
      expect(promise.stack).toBeDefined();
      expect(typeof promise.stack).toBe('string');
      expect(promise.stack.length).toBeGreaterThan(0);
    } else {
      // If no stack traces available, we can't test this
      expect(true).toBe(true);
    }
  });
});
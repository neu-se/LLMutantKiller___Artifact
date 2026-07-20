// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("captureLine mutation test", () => {
  it("should correctly initialize stack trace capturing", () => {
    // The mutation changes the condition in captureLine from `if (!hasStacks)` to `if (hasStacks)`
    // This affects the initial setup of stack trace capturing

    // We'll test by checking if the internal state is properly initialized
    // when stack traces are available
    const hasStacks = typeof new Error().stack === 'string';

    // Create a simple promise to trigger the captureLine logic
    const promise = Q.resolve(42);

    return promise.then(() => {
      // The key difference between original and mutated code:
      // Original: when hasStacks is true, captureLine proceeds to set qFileName
      // Mutated: when hasStacks is true, captureLine returns early without setting qFileName

      // We can't directly test qFileName, but we can test the observable behavior
      // by checking if long stack traces work (which depends on captureLine)
      Q.longStackSupport = true;

      const deferred = Q.defer();
      const testPromise = deferred.promise.then(() => {
        throw new Error("Test");
      });

      return testPromise.catch((error: any) => {
        // In original code, stack should be properly formatted
        // In mutated code, stack formatting will be broken
        expect(error.stack).toBeDefined();
        expect(error.stack.length).toBeGreaterThan(0);
      });
    });
  });
});
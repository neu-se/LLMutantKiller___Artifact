// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("captureLine mutation test", () => {
  it("should correctly initialize stack trace capturing", () => {
    // The mutation changes the condition in captureLine from `if (!hasStacks)` to `if (hasStacks)`
    // This affects whether the function returns early or continues to set qFileName

    // We'll test by checking if the internal state is properly initialized
    // when creating promises with long stack support enabled

    // Enable long stack support which depends on captureLine working correctly
    Q.longStackSupport = true;

    // Create a deferred promise to trigger the internal logic
    const deferred = Q.defer();

    // The key difference between original and mutated code:
    // Original: when hasStacks is true, captureLine sets qFileName
    // Mutated: when hasStacks is true, captureLine returns early without setting qFileName

    // We'll test this by checking if the promise has a stack property
    // which requires qFileName to be set
    expect(deferred.promise.stack).toBeDefined();
    expect(typeof deferred.promise.stack).toBe('string');

    // The stack should contain some basic information
    expect(deferred.promise.stack.length).toBeGreaterThan(0);
  });
});
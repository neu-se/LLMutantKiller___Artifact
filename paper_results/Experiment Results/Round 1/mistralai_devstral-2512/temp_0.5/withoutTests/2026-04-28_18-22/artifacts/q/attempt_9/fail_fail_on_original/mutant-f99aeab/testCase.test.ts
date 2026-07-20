const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace initialization", () => {
  it("should correctly initialize qFileName when stack traces are supported", () => {
    // The mutation changes the condition from if (!hasStacks) to if (hasStacks)
    // This affects whether the stack trace initialization code runs

    // Create a promise to trigger initialization
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The key test: check if the promise has stack information
    // In the original code, when hasStacks is true, qFileName should be set
    // In the mutated code, when hasStacks is true, the initialization would be skipped
    expect(promise.stack).toBeDefined();

    // Clean up
    deferred.resolve(null);
  });
});
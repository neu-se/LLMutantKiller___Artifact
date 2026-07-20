const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is pending", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The mutation changes the condition from:
    // if (inspected.state === "pending" || ...)
    // to:
    // if (inspected.state !== "pending" || ...)
    // This means for pending promises, the original returns the promise itself
    // while the mutated version would return inspected.value (undefined)

    const result = promise.valueOf();

    // This assertion will pass on original (returns promise) but fail on mutated (returns undefined)
    expect(result).toBe(promise);

    // Additional check to ensure we're getting the promise object
    expect(result).toHaveProperty('then');
    expect(typeof result.then).toBe('function');
  });
});
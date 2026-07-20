const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is pending", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // In the original code, when state is "pending", valueOf returns the promise itself
    // In the mutated code, when state is NOT "pending", it would return inspected.value
    // For a pending promise, inspected.value is undefined
    const result = promise.valueOf();

    // This should pass on original (returns promise) and fail on mutated (returns undefined)
    expect(result).toBe(promise);
    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();
  });
});
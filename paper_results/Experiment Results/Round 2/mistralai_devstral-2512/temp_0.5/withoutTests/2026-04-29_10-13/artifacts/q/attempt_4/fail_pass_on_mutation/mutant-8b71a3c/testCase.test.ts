const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is pending and not return the inspected value", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const result = promise.valueOf();
    // In the original code, when state is pending, it should return the promise itself
    // In the mutated code, it would return the inspected value (which would be undefined for pending)
    expect(result).toBe(promise);
    expect(result).not.toBeUndefined();
  });
});
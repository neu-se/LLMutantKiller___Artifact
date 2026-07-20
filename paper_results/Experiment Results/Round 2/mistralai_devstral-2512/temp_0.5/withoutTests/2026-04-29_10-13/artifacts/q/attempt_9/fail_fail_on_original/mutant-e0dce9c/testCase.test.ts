const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is rejected", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));

    // In the original code, valueOf returns the promise when state is "rejected"
    // In the mutated code, it would return the inspected value instead
    const result = promise.valueOf();

    // The result should be the promise itself, not the inspected value
    expect(result).toBe(promise);

    // Additional check to ensure we're not getting the inspected value
    expect(result).not.toHaveProperty('exception');
  });
});
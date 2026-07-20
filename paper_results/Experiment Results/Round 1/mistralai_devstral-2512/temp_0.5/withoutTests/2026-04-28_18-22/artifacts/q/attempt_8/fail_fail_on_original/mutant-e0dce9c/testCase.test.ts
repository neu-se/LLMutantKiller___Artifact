const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise when state is rejected", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));

    // In original code: when state is "rejected", valueOf returns the promise
    // In mutated code: when state is "rejected", valueOf returns inspected.value (the error)
    const result = promise.valueOf();
    expect(result).toBe(promise);
  });
});
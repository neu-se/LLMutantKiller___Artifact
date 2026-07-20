const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is rejected", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));

    const result = promise.valueOf();

    // In the original code, this should be the promise itself
    // In the mutated code, this would be the inspected value (which has the error)
    expect(result).toBe(promise);

    // Verify the promise is actually rejected
    expect(promise.isRejected()).toBe(true);
  });
});
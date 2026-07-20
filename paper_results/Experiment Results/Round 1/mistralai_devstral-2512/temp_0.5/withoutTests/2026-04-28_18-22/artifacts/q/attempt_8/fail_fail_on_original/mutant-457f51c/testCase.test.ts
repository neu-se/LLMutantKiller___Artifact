const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise exception property behavior", () => {
  it("should only set exception property for rejected promises", () => {
    // Test with a rejected promise
    const rejectedDeferred = Q.defer();
    const rejectedPromise = rejectedDeferred.promise;
    rejectedDeferred.reject(new Error("rejected error"));

    // Test with a fulfilled promise
    const fulfilledDeferred = Q.defer();
    const fulfilledPromise = fulfilledDeferred.promise;
    fulfilledDeferred.fulfill("success");

    // In the original code:
    // - rejectedPromise should have exception set
    // - fulfilledPromise should not have exception set
    // In the mutated code (if (true)):
    // - Both would have exception set (incorrect behavior)
    expect(rejectedPromise.exception).toBeDefined();
    expect(fulfilledPromise.exception).toBeUndefined();
  });
});
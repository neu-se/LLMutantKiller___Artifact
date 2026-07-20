const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return promise for rejected state and value for fulfilled state", () => {
    // Test rejected promise
    const rejectedDeferred = Q.defer();
    const rejectedPromise = rejectedDeferred.promise;
    rejectedDeferred.reject(new Error("test error"));

    // Test fulfilled promise
    const fulfilledDeferred = Q.defer();
    const fulfilledPromise = fulfilledDeferred.promise;
    fulfilledDeferred.fulfill("success value");

    // In original code:
    // - rejectedPromise.valueOf() returns the promise (state is "rejected")
    // - fulfilledPromise.valueOf() returns "success value" (state is "fulfilled")
    // In mutated code (if (true)):
    // - Both would return the promise (incorrect behavior)
    expect(rejectedPromise.valueOf()).toBe(rejectedPromise);
    expect(fulfilledPromise.valueOf()).toBe("success value");
  });
});
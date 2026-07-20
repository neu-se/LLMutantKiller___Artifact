const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is rejected", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));
    // The mutation changes the condition from "===" to "!=="
    // In the original code, when state is "rejected", it returns the promise
    // In the mutated code, when state is "rejected", it should return the inspected value
    // So we check that valueOf() returns the promise (original behavior)
    expect(promise.valueOf()).toBe(promise);
  });
});
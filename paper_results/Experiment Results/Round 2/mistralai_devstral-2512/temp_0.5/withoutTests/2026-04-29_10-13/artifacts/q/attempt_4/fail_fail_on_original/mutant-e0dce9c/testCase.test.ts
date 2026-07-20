const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is rejected", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));

    // The valueOf should return the promise itself for rejected promises
    // In the original code, valueOf returns the promise when state is "rejected"
    // In the mutated code, it would return the inspected value instead
    expect(promise.valueOf()).toBe(promise);
  });
});
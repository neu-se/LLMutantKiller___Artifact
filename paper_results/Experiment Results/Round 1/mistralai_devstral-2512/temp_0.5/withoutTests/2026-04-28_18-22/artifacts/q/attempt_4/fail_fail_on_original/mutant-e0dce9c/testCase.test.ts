const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is rejected", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));
    expect(promise.valueOf()).toBe(promise);
  });
});
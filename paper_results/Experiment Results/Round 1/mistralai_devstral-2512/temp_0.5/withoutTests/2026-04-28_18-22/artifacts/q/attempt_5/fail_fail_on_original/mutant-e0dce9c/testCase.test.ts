const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the rejection reason when state is rejected", () => {
    const deferred = Q.defer();
    const error = new Error("test error");
    const promise = deferred.promise;
    deferred.reject(error);
    expect(promise.valueOf()).toBe(error);
  });
});
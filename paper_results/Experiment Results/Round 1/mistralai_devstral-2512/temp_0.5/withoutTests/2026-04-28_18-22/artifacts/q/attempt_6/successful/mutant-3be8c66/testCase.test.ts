const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.isFulfilled", () => {
  it("should return true when checking a fulfilled promise's state", () => {
    const deferred = Q.defer();
    deferred.resolve(42);
    const promise = deferred.promise;
    expect(promise.isFulfilled()).toBe(true);
  });
});
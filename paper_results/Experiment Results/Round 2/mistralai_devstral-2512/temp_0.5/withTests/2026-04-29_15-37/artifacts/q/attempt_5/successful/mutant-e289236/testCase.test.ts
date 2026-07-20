import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer valueOf test", () => {
  it("should have valueOf return the promise itself for pending promises and the resolved value after resolution", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    expect(promise.valueOf()).toBe(promise);
    deferred.resolve(42);
    return Q.delay(10).then(() => {
      expect(promise.valueOf()).toBe(42);
    });
  });
});
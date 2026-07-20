import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise valueOf behavior", () => {
  it("should have valueOf return undefined when fulfilled", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Fulfill the promise
    deferred.resolve("test value");

    // The valueOf should return undefined when fulfilled
    return promise.then(() => {
      const valueOfResult = promise.valueOf();
      expect(valueOfResult).toBeUndefined();
    });
  });
});
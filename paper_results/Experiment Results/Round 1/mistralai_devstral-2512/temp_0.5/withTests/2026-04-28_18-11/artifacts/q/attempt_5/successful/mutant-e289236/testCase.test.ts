import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise valueOf behavior", () => {
  it("should have valueOf return the fulfilled value when resolved", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Fulfill the promise with a specific value
    deferred.resolve("test value");

    // The valueOf should return the fulfilled value
    return promise.then(() => {
      const valueOfResult = promise.valueOf();
      expect(valueOfResult).toBe("test value");
    });
  });
});
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise valueOf behavior", () => {
  it("should have valueOf return the promise when pending", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The valueOf should return the promise itself when pending
    const valueOfResult = promise.valueOf();

    expect(valueOfResult).toBe(promise);
  });
});
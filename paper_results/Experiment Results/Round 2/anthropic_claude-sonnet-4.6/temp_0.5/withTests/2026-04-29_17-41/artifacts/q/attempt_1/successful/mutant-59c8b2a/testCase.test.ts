import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer promise valueOf", () => {
  it("should return the promise itself when pending and the fulfilled value when resolved", (done) => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // When pending, valueOf should return the promise itself
    expect(promise.valueOf()).toBe(promise);

    // Resolve with a plain value
    deferred.resolve(42);

    // After resolution, valueOf should return the fulfilled value
    // We need to wait a tick for the resolution to propagate
    Q.nextTick(function () {
      Q.nextTick(function () {
        const val = promise.valueOf();
        expect(val).toBe(42);
        done();
      });
    });
  });
});
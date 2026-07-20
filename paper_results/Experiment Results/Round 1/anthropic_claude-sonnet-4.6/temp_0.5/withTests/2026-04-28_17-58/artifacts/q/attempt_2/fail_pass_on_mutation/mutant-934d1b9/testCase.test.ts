import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer", () => {
  it("should not allow rejection after resolution - second settlement is ignored", (done) => {
    const deferred = Q.defer();

    deferred.resolve(42);
    deferred.reject(new Error("should be ignored"));

    deferred.promise.then(
      (value) => {
        expect(value).toBe(42);
        done();
      },
      (err) => {
        done(new Error("Promise should have fulfilled, not rejected: " + err.message));
      }
    );
  });
});
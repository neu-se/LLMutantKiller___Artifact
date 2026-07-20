import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred valueOf after resolution", () => {
  it("should return the fulfilled value when valueOf is called on a resolved deferred promise", (done) => {
    const deferred = Q.defer();
    deferred.resolve(42);

    // After resolution, promise.valueOf() should eventually return the resolved value.
    // In the mutated code, `if (true)` always returns `promise` itself,
    // so nearer() will never unwrap to the actual value.
    Q.nextTick(function () {
      const nearerValue = Q.nearer(deferred.promise);
      expect(nearerValue).toBe(42);
      done();
    });
  });
});
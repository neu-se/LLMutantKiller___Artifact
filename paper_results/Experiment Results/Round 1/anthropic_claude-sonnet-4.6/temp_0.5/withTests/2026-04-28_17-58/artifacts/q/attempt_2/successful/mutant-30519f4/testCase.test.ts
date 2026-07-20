import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should wait for pending promises and not resolve immediately with undefined values when mixed with fulfilled promises", (done) => {
    const deferred = Q.defer();
    const fulfilledPromise = Q(42);

    // Mix: one pending promise and one already-fulfilled promise
    Q.all([deferred.promise, fulfilledPromise]).then(
      function (values: number[]) {
        expect(values[0]).toBe(99);
        expect(values[1]).toBe(42);
        done();
      },
      function (err: unknown) {
        done(new Error("Should not reject: " + err));
      }
    );

    // Resolve the pending promise after a short delay
    setTimeout(function () {
      deferred.resolve(99);
    }, 50);
  });
});
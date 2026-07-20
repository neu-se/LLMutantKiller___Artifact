import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress propagation through then", () => {
  it("should propagate progress notifications through a then chain", (done) => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    const promise = deferred.promise
      .then(
        function onFulfilled() {},
        function onRejected() {},
        function onProgress(value: number) {
          progressValues.push(value);
        }
      );

    // Chain another then off the first to verify propagation
    const outerDeferred = Q.defer();

    deferred.promise
      .then(
        function () { outerDeferred.resolve(); },
        function () { outerDeferred.reject(); },
        function (value: number) {
          progressValues.push(value);
        }
      );

    // Notify progress
    deferred.notify(42);
    deferred.resolve();

    outerDeferred.promise.then(function () {
      expect(progressValues).toContain(42);
      done();
    }).fail(done);
  });
});
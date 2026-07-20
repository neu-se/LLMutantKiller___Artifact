import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress propagation through then", () => {
  it("should propagate progress notifications to listeners attached via then", (done) => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    deferred.promise
      .then(
        function onFulfilled() {},
        function onRejected() {},
        function onProgress(value: number) {
          progressValues.push(value);
        }
      )
      .then(function () {
        expect(progressValues).toEqual([42]);
        done();
      });

    deferred.notify(42);
    deferred.resolve();
  });
});
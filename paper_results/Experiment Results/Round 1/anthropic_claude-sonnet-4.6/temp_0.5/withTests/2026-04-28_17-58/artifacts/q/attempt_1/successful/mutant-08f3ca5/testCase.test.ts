import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress propagation through then", () => {
  it("should propagate progress values when the progress callback does not throw", (done) => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    deferred.promise
      .then(
        undefined,
        undefined,
        function (value: number) {
          return value * 2;
        }
      )
      .then(
        function () {
          // fulfilled handler
        },
        undefined,
        function (value: number) {
          progressValues.push(value);
        }
      );

    deferred.notify(5);

    deferred.resolve();

    deferred.promise.then(function () {
      // Give time for progress to propagate
      setTimeout(function () {
        expect(progressValues).toEqual([10]);
        done();
      }, 50);
    });
  });
});
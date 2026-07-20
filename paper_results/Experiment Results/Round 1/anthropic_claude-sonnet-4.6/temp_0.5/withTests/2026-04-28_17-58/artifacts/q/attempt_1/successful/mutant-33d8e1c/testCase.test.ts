import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress propagation through .then", () => {
  it("should propagate progress notifications through a .then chain with a progress callback", (done) => {
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
          expect(progressValues).toEqual([10]);
          done();
        },
        function (err: Error) {
          done(err);
        },
        function (value: number) {
          progressValues.push(value);
        }
      );

    deferred.notify(5);
    deferred.resolve();
  });
});
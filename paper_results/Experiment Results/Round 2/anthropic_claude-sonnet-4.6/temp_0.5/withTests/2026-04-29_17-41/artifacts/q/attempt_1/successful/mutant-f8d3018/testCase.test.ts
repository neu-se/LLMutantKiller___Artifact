import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress callback transformation in then", () => {
  it("should call the progress callback and use its return value for downstream progress notifications", (done) => {
    const deferred = Q.defer();
    const receivedProgressValues: number[] = [];

    deferred.promise
      .then(
        undefined,
        undefined,
        function (value: number) {
          // Transform the progress value by doubling it
          return value * 2;
        }
      )
      .then(
        function () {
          // Check that the transformed progress value was received
          expect(receivedProgressValues).toEqual([10]);
          done();
        },
        function (err: unknown) {
          done(err);
        },
        function (value: number) {
          receivedProgressValues.push(value);
        }
      );

    deferred.notify(5);
    deferred.resolve();
  });
});
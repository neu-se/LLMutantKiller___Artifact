import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress transformation via then", () => {
  it("should transform progress values using the progress callback", (done) => {
    const deferred = Q.defer();
    const receivedProgressValues: number[] = [];

    deferred.promise
      .then(
        undefined,
        undefined,
        function (value: number) {
          return value * 10;
        }
      )
      .then(
        undefined,
        undefined,
        function (transformedValue: number) {
          receivedProgressValues.push(transformedValue);
        }
      );

    deferred.notify(5);
    deferred.resolve();

    deferred.promise.then(function () {
      // After resolution, check that the progress value was transformed
      // Original: progressed(5) = 50, Mutated: 5 (no transformation)
      expect(receivedProgressValues).toEqual([50]);
      done();
    });
  });
});
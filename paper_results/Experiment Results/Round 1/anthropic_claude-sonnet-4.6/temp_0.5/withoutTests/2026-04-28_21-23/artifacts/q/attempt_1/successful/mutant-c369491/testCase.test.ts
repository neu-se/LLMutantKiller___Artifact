import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q progress propagation through then", () => {
  it("should propagate progress notifications through a then chain", (done) => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    deferred.promise
      .then(
        null, // fulfilled handler
        null, // rejected handler
        function (value: number) {
          return value * 2; // transform progress
        }
      )
      .then(
        null,
        null,
        function (value: number) {
          progressValues.push(value);
          if (progressValues.length === 1) {
            // Verify progress was propagated and transformed
            expect(progressValues[0]).toBe(20); // 10 * 2
            deferred.resolve("done");
            done();
          }
        }
      );

    deferred.notify(10);
  });
});
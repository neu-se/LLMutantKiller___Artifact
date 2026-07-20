import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q progress propagation through then", () => {
  it("should propagate progress notifications through then()", (done) => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    deferred.promise
      .then(
        null, // fulfilled handler
        null, // rejected handler
        function (value: number) {
          progressValues.push(value);
          return value;
        }
      )
      .then(
        null,
        null,
        function (value: number) {
          progressValues.push(value * 10);
        }
      );

    // Notify progress
    deferred.notify(1);
    deferred.notify(2);

    // Resolve the promise to end the chain
    deferred.resolve("done");

    deferred.promise.then(function () {
      // After resolution, check that progress was propagated
      // We need to wait a tick for progress to propagate
      Q.nextTick(function () {
        Q.nextTick(function () {
          Q.nextTick(function () {
            try {
              expect(progressValues.length).toBeGreaterThan(0);
              expect(progressValues).toContain(1);
              expect(progressValues).toContain(2);
              // Progress should have been propagated to the second then
              expect(progressValues).toContain(10);
              expect(progressValues).toContain(20);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });
    });
  });
});
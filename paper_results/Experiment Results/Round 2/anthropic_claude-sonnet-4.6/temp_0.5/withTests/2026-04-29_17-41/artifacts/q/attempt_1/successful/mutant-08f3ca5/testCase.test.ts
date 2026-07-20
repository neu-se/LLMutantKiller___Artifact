import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress propagation through then", () => {
  it("should propagate progress notifications to chained then handlers when no error is thrown", (done) => {
    const deferred = Q.defer();
    const receivedProgressValues: number[] = [];

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
          // fulfillment handler
        },
        function () {
          // rejection handler
        },
        function (value: number) {
          receivedProgressValues.push(value);
        }
      );

    deferred.notify(5);
    deferred.resolve();

    deferred.promise.then(function () {
      // Give time for progress to propagate
      setTimeout(function () {
        try {
          expect(receivedProgressValues.length).toBe(1);
          expect(receivedProgressValues[0]).toBe(10);
          done();
        } catch (e) {
          done(e);
        }
      }, 50);
    });
  });
});
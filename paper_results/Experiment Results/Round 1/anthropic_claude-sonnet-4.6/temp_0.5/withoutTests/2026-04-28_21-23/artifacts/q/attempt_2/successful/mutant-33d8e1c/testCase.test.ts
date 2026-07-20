import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q progress propagation", () => {
  it("should call the progressed callback when deferred.notify is called", (done) => {
    const deferred = Q.defer();
    const received: number[] = [];

    deferred.promise.then(
      null,
      null,
      function (value: number) {
        received.push(value);
      }
    );

    // Notify progress after attaching the listener
    Q.nextTick(function () {
      deferred.notify(42);
      deferred.notify(99);

      // Check after async processing
      Q.nextTick(function () {
        Q.nextTick(function () {
          expect(received).toEqual([42, 99]);
          deferred.resolve("done");
          done();
        });
      });
    });
  });
});
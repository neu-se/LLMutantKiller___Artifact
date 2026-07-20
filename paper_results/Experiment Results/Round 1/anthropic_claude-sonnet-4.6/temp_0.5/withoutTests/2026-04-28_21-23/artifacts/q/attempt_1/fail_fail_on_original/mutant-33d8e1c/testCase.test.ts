import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q progress propagation", () => {
  it("should propagate progress notifications through then() with a progressed callback", (done) => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    deferred.promise.then(
      null,
      null,
      function (value: number) {
        progressValues.push(value);
      }
    ).then(
      function () {
        // fulfilled
      },
      function () {
        // rejected
      },
      function (value: number) {
        progressValues.push(value * 10);
      }
    );

    deferred.notify(1);
    deferred.notify(2);

    setTimeout(function () {
      deferred.resolve("done");
      setTimeout(function () {
        // With original code: progress propagates, so progressValues should contain values
        // With mutated code: progress dispatch has empty array [], no progress listener is registered
        // so progressValues would be empty or only contain first-level values
        expect(progressValues.length).toBeGreaterThan(0);
        // The second .then's progress handler should have received transformed values (value * 10)
        // This only works if progress propagation works correctly
        expect(progressValues).toContain(10); // 1 * 10
        expect(progressValues).toContain(20); // 2 * 10
        done();
      }, 100);
    }, 50);
  });
});
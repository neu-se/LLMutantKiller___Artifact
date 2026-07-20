import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then progress propagation", () => {
  it("should forward progress values through the chain when progress handler succeeds without throwing", (done) => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    deferred.promise
      .then(null, null, function (value: number) {
        return value * 2;
      })
      .then(null, null, function (value: number) {
        progressValues.push(value);
      });

    deferred.notify(5);

    // Give async operations time to complete
    Q.when(deferred.promise).then(null, null, null);

    setTimeout(function () {
      try {
        // With original code: progress handler returns 5*2=10, then 10 is forwarded to next progress handler
        // With mutated code: since threw=false, the notify is NOT called, so progressValues stays empty
        expect(progressValues).toContain(10);
        done();
      } catch (e) {
        done(e);
      }
    }, 100);

    // Resolve the deferred to clean up
    setTimeout(function () {
      deferred.resolve("done");
    }, 50);
  });
});
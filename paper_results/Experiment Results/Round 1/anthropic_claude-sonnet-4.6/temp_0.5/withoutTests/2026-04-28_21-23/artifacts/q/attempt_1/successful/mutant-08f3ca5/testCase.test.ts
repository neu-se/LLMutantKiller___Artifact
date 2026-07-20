import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then progress propagation", () => {
  it("should forward progress notifications to the next promise when progressed callback succeeds", (done) => {
    const deferred = Q.defer();
    const progressValues: number[] = [];

    deferred.promise
      .then(
        null,
        null,
        (value: number) => value * 2
      )
      .then(
        null,
        null,
        (value: number) => {
          progressValues.push(value);
        }
      );

    deferred.notify(5);

    setTimeout(() => {
      try {
        // With original code: progressed callback returns value*2=10, which gets forwarded
        // With mutated code: since threw===false, the condition `if (threw)` is false,
        // so the progress is NOT forwarded to the next .then's progress handler
        expect(progressValues).toEqual([10]);
        done();
      } catch (e) {
        done(e);
      }
    }, 100);
  });
});
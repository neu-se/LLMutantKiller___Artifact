const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification behavior", () => {
  it("should notify progress listeners when handler succeeds", (done) => {
    const deferred = Q.defer();
    let progressValue: number | undefined;
    let finalValue: number | undefined;

    deferred.promise.then(
      (value: number) => {
        finalValue = value;
      },
      undefined,
      (value: number) => {
        progressValue = value;
      }
    );

    // Trigger progress notification
    deferred.notify(42);

    // Resolve the promise
    deferred.resolve(100);

    // Give the nextTick a chance to execute
    setTimeout(() => {
      expect(progressValue).toBe(42);
      expect(finalValue).toBe(100);
      done();
    }, 20);
  });
});
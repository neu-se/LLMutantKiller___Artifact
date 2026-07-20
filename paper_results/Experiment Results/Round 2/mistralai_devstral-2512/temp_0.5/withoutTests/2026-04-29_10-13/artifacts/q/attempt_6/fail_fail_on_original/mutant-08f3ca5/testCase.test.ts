const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification behavior", () => {
  it("should call deferred.notify regardless of progress handler errors", (done) => {
    const deferred = Q.defer();
    let notifyCalled = false;

    // Override deferred.notify to track if it's called
    const originalNotify = deferred.notify;
    deferred.notify = function(value: any) {
      notifyCalled = true;
      originalNotify.call(this, value);
    };

    // Progress handler that throws
    deferred.promise.then(
      undefined,
      undefined,
      (value: number) => {
        throw new Error("Progress error");
      }
    );

    // Trigger progress notification
    deferred.notify(42);

    // Give the nextTick a chance to execute
    setTimeout(() => {
      // In original code: notify should be called even when handler throws
      // In mutated code: notify won't be called when threw is true
      expect(notifyCalled).toBe(true);
      done();
    }, 10);
  });
});
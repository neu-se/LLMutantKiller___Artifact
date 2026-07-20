const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification error handling", () => {
  it("should not notify when progress handler throws an error", (done) => {
    const deferred = Q.defer();
    let notificationCount = 0;

    // Progress handler that throws an error
    deferred.promise.then(
      undefined,
      undefined,
      (value: number) => {
        notificationCount++;
        throw new Error("Progress error");
      }
    );

    // Trigger progress notification
    deferred.notify(42);

    // Give the nextTick a chance to execute
    setTimeout(() => {
      // In the original code, notification should still occur despite the error
      // In the mutated code, notification won't occur when threw is true
      expect(notificationCount).toBe(1);
      done();
    }, 10);
  });
});
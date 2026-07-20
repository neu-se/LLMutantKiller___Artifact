const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
  it("should notify progress listeners even when progress handler throws", (done) => {
    const deferred = Q.defer();
    let notifiedValue: number | undefined;
    let errorCaught = false;

    // Mock Q.onerror to catch the thrown error
    const originalOnerror = Q.onerror;
    Q.onerror = (error: Error) => {
      errorCaught = true;
    };

    deferred.promise.then(
      undefined,
      undefined,
      (value: number) => {
        notifiedValue = value;
        throw new Error("Progress error");
      }
    );

    // Trigger progress notification
    deferred.notify(42);

    // Give the nextTick a chance to execute
    setTimeout(() => {
      // Restore original onerror
      Q.onerror = originalOnerror;

      // In original code: notification happens before error is thrown
      // In mutated code: notification is skipped when threw is true
      expect(notifiedValue).toBe(42);
      expect(errorCaught).toBe(true);
      done();
    }, 10);
  });
});
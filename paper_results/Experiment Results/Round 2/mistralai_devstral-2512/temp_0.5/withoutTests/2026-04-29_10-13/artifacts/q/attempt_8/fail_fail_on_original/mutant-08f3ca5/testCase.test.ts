const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification with error", () => {
  it("should still notify when progress handler throws", (done) => {
    const deferred = Q.defer();
    let notificationReceived = false;
    let errorThrown = false;

    // Mock Q.onerror to suppress the error
    const originalOnerror = Q.onerror;
    Q.onerror = () => { errorThrown = true; };

    deferred.promise.then(
      undefined,
      undefined,
      (value: number) => {
        throw new Error("Test error");
      }
    ).then(
      undefined,
      undefined,
      () => {
        notificationReceived = true;
      }
    );

    // Trigger progress notification
    deferred.notify(42);

    // Give the nextTick a chance to execute
    setTimeout(() => {
      Q.onerror = originalOnerror;
      expect(notificationReceived).toBe(true);
      expect(errorThrown).toBe(true);
      done();
    }, 20);
  });
});
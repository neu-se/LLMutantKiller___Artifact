const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
  it("should notify progress listeners when progress handler succeeds", (done) => {
    const deferred = Q.defer();
    let notifiedValue: number | undefined;

    // Progress handler that succeeds
    deferred.promise.then(
      undefined,
      undefined,
      (value: number) => {
        notifiedValue = value * 2;
        return notifiedValue;
      }
    );

    // Trigger progress notification
    deferred.notify(21);

    // Give the nextTick a chance to execute
    setTimeout(() => {
      // In original code: notification happens when threw is false
      // In mutated code: notification happens when threw is true (which is wrong)
      expect(notifiedValue).toBe(42);
      done();
    }, 10);
  });
});
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification with transformation", () => {
  it("should notify with transformed progress value when handler succeeds", (done) => {
    const deferred = Q.defer();
    let notifiedValue: number | undefined;

    deferred.promise.then(
      undefined,
      undefined,
      (value: number) => {
        return value * 2; // Transform the progress value
      }
    ).then(
      undefined,
      undefined,
      (transformedValue: number) => {
        notifiedValue = transformedValue;
      }
    );

    // Trigger progress notification
    deferred.notify(21);

    // Give the nextTick a chance to execute
    setTimeout(() => {
      // In original code: notification happens with transformed value (42)
      // In mutated code: behavior differs when threw is true
      expect(notifiedValue).toBe(42);
      done();
    }, 20);
  });
});
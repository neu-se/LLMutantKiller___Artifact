const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
  it("should properly handle progress notifications and deferred resolution", (done) => {
    const deferred = Q.defer();
    let progressReceived = false;
    let fulfilled = false;

    deferred.promise.then(
      (value: any) => {
        fulfilled = true;
        return value;
      },
      () => {},
      (progress: number) => {
        progressReceived = true;
        return progress;
      }
    );

    // First notify with progress
    deferred.notify(42);

    // Then resolve the promise
    setTimeout(() => {
      deferred.resolve("success");
    }, 5);

    setTimeout(() => {
      expect(progressReceived).toBe(true);
      expect(fulfilled).toBe(true);
      done();
    }, 20);
  });
});
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior with progress callback", () => {
  it("should correctly handle promise when only progress callback is provided", (done) => {
    const deferred = Q.defer();
    let progressValue: any = null;
    let promiseCreated = false;

    // Call done with only progress callback
    const result = deferred.promise.done(undefined, undefined, (value: any) => {
      progressValue = value;
    });

    // Check if the result is the promise itself (original behavior)
    promiseCreated = (result === undefined);

    // Notify progress
    deferred.notify("test-progress");

    // Give time for async operations
    setTimeout(() => {
      expect(progressValue).toBe("test-progress");
      expect(promiseCreated).toBe(true);
      done();
    }, 10);
  });
});
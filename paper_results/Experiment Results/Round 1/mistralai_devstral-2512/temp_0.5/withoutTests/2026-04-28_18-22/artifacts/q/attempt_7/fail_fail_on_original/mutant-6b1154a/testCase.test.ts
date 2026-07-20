const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior with progress callback", () => {
  it("should return the promise when only progress callback is provided", (done) => {
    const deferred = Q.defer();
    let progressCalled = false;

    // Call done with only progress callback
    const result = deferred.promise.done(undefined, undefined, (value: any) => {
      progressCalled = true;
    });

    // In original code, when only progress is provided, it should return the promise
    // In mutated code, it returns false
    expect(result).toBe(deferred.promise);

    // Notify progress
    deferred.notify("test");

    setTimeout(() => {
      expect(progressCalled).toBe(true);
      done();
    }, 10);
  });
});
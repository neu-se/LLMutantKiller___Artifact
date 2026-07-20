const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior with only progress callback", () => {
  it("should properly handle promise when only progress callback is provided", (done) => {
    const deferred = Q.defer();
    let progressCalled = false;
    let errorThrown = false;

    // Call done with only progress callback
    try {
      deferred.promise.done(undefined, undefined, (value: any) => {
        progressCalled = true;
      });
    } catch (e) {
      errorThrown = true;
    }

    // Notify progress
    deferred.notify("test");

    // Give time for async operations
    setTimeout(() => {
      expect(progressCalled).toBe(true);
      expect(errorThrown).toBe(false);
      done();
    }, 10);
  });
});
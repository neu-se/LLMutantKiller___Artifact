const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior with only progress callback", () => {
  it("should handle promise with only progress callback without throwing", (done) => {
    const deferred = Q.defer();
    let progressValue: any = null;

    // Call done with only progress callback (no fulfilled or rejected)
    deferred.promise.done(undefined, undefined, (value: any) => {
      progressValue = value;
    });

    // Notify progress
    deferred.notify("progress-data");

    // Give time for async operations
    setTimeout(() => {
      expect(progressValue).toBe("progress-data");
      done();
    }, 10);
  });
});
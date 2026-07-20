const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
  it("should handle progress notifications without throwing errors", (done) => {
    const deferred = Q.defer();
    let progressCalled = false;

    deferred.promise.then(
      () => {},
      () => {},
      (progress: number) => {
        progressCalled = true;
        return progress;
      }
    );

    deferred.notify(42);

    setTimeout(() => {
      expect(progressCalled).toBe(true);
      done();
    }, 10);
  });
});
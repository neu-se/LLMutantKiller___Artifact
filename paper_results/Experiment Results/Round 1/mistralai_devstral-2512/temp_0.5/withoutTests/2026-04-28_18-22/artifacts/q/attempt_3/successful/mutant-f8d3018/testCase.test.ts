const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise progress handler", () => {
  it("should call the progress handler when provided", (done) => {
    let progressCalled = false;
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then(
      () => {},
      () => {},
      (progress: any) => {
        progressCalled = true;
        return progress;
      }
    );

    deferred.notify("test progress");

    setTimeout(() => {
      expect(progressCalled).toBe(true);
      done();
    }, 10);
  });
});
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise progress notification", () => {
  it("should correctly dispatch progress notifications with 'when' operation", (done) => {
    let progressCalled = false;
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then(
      () => {},
      () => {},
      (progress: any) => {
        progressCalled = true;
        expect(progress).toBe("test progress");
      }
    );

    // Notify progress
    deferred.notify("test progress");

    setTimeout(() => {
      expect(progressCalled).toBe(true);
      done();
    }, 10);
  });
});
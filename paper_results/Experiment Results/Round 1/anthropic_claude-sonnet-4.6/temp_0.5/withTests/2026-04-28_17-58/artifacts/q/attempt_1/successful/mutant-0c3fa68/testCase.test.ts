import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.progress", () => {
  it("should call the progress listener when using Q.progress static function", (done) => {
    const deferred = Q.defer();
    let progressCalled = false;

    Q.progress(deferred.promise, function () {
      progressCalled = true;
    });

    deferred.notify();
    deferred.resolve();

    deferred.promise.then(function () {
      expect(progressCalled).toBe(true);
      done();
    }).catch(done);
  });
});
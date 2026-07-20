import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.progress", () => {
  it("should call the progress listener when using Q.progress", (done) => {
    const deferred = Q.defer();
    let progressed = false;

    Q.progress(deferred.promise, function () {
      progressed = true;
    });

    deferred.notify();
    deferred.resolve();

    deferred.promise.then(function () {
      expect(progressed).toBe(true);
      done();
    }).fail(done);
  });
});
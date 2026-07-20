const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.progress", () => {
  it("should call the progress callback when notified", (done) => {
    const deferred = Q.defer();
    let progressCalled = false;

    Q.progress(deferred.promise, (progressValue: any) => {
      progressCalled = true;
      expect(progressValue).toBe("test");
      done();
    });

    deferred.notify("test");
  });
});
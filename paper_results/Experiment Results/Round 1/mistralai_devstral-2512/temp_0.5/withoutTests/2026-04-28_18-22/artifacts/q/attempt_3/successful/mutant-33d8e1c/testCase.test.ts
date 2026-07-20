const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
  it("should notify progress listeners when progress is made", (done) => {
    const deferred = Q.defer();
    let progressValue: unknown = null;

    deferred.promise.then(null, null, (value: unknown) => {
      progressValue = value;
    });

    deferred.notify("test-progress");

    setTimeout(() => {
      expect(progressValue).toBe("test-progress");
      done();
    }, 10);
  });
});
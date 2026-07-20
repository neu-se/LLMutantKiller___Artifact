const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
  it("should handle progress notifications with conditional logic", (done) => {
    const deferred = Q.defer();
    let progressHandled = false;

    deferred.promise.then(
      () => {},
      () => {},
      (progress: number) => {
        if (progress > 0) {
          progressHandled = true;
          return progress;
        }
        throw new Error("Invalid progress");
      }
    );

    deferred.notify(42);

    setTimeout(() => {
      expect(progressHandled).toBe(true);
      done();
    }, 10);
  });
});
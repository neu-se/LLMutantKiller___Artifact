const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
  it("should properly handle progress notifications and their return values", (done) => {
    const deferred = Q.defer();
    let progressValue: number | null = null;

    deferred.promise.then(
      () => {},
      () => {},
      (progress: number) => {
        // Return a transformed value
        return progress * 2;
      }
    ).then(
      () => {},
      () => {},
      (transformedProgress: number) => {
        progressValue = transformedProgress;
      }
    );

    deferred.notify(21);

    setTimeout(() => {
      expect(progressValue).toBe(42);
      done();
    }, 20);
  });
});
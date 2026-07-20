const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior with progress callback", () => {
  it("should properly handle promise with progress callback", (done) => {
    const deferred = Q.defer();
    let progressValue: number | null = null;

    deferred.promise.done(null, null, (value: number) => {
      progressValue = value;
    });

    deferred.notify(50);

    setTimeout(() => {
      expect(progressValue).toBe(50);
      done();
    }, 10);
  });
});
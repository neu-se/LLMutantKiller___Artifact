const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.progress", () => {
  it("should notify progress when a promise makes progress", (done) => {
    const deferred = Q.defer();
    let progressValue: number | undefined;

    Q.progress(deferred.promise, (value: number) => {
      progressValue = value;
    });

    deferred.notify(42);

    setTimeout(() => {
      expect(progressValue).toBe(42);
      done();
    }, 10);
  });
});
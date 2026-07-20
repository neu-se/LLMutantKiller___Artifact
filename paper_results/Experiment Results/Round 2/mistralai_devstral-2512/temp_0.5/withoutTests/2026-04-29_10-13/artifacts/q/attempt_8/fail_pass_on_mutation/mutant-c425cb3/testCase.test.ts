const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress notification", () => {
  it("should correctly handle progress notifications and their side effects", (done) => {
    const deferred = Q.defer();
    const progressValues: number[] = [];
    let notificationCount = 0;

    deferred.promise.then(
      () => {},
      () => {},
      (progress: number) => {
        progressValues.push(progress);
        notificationCount++;
        return progress;
      }
    );

    // First notification
    deferred.notify(1);
    // Second notification
    deferred.notify(2);

    setTimeout(() => {
      expect(progressValues).toEqual([1, 2]);
      expect(notificationCount).toBe(2);
      done();
    }, 20);
  });
});
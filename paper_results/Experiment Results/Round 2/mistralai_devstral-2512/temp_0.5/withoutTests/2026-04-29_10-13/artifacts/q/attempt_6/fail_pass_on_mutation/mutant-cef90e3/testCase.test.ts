const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.then behavior", () => {
  it("should handle rejection after resolution correctly", (done) => {
    let fulfillCount = 0;
    let rejectCount = 0;
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then(
      (value: any) => {
        fulfillCount++;
        return value;
      },
      (reason: any) => {
        rejectCount++;
        return reason;
      }
    );

    // First resolve the promise
    deferred.resolve(42);

    // Then try to reject it (should be ignored)
    deferred.reject(new Error("Test error"));

    setTimeout(() => {
      expect(fulfillCount).toBe(1);
      expect(rejectCount).toBe(0);
      done();
    }, 50);
  });
});
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q deferred resolution state", () => {
  it("should correctly handle the resolvedPromise state check in defer.prototype.resolve", (done) => {
    const deferred = Q.defer();
    let firstCallbackCount = 0;
    let secondCallbackCount = 0;

    deferred.promise.then(() => {
      firstCallbackCount++;
    });

    // First resolution
    deferred.resolve("first");

    // Add another callback after resolution
    deferred.promise.then(() => {
      secondCallbackCount++;
    });

    // Attempt second resolution - should be ignored
    deferred.resolve("second");

    setTimeout(() => {
      expect(firstCallbackCount).toBe(1);
      expect(secondCallbackCount).toBe(1);
      done();
    }, 20);
  });
});
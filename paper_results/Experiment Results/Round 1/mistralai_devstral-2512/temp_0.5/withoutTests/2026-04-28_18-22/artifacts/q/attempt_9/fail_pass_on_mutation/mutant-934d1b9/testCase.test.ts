const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q deferred resolution", () => {
  it("should prevent callback execution when resolvedPromise is already set", (done) => {
    const deferred = Q.defer();
    let firstCallbackExecuted = false;
    let secondCallbackExecuted = false;

    deferred.promise.then(() => {
      firstCallbackExecuted = true;
    });

    // First resolution
    deferred.resolve("first value");

    // Add another callback after resolution
    deferred.promise.then(() => {
      secondCallbackExecuted = true;
    });

    // Attempt second resolution
    deferred.resolve("second value");

    setTimeout(() => {
      expect(firstCallbackExecuted).toBe(true);
      expect(secondCallbackExecuted).toBe(true);
      done();
    }, 10);
  });
});
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise exception property mutation", () => {
  it("should only set exception property for rejected promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // In the original code, pending promises should not have exception property
    // The mutation changes the condition to always true, which would set it for all promises
    expect(promise).not.toHaveProperty("exception");

    // Now test with a rejected promise
    const error = new Error("test error");
    deferred.reject(error);

    // Wait for the promise to be rejected
    return Q.delay(10).then(() => {
      // In original code, rejected promises should have exception property
      // In mutated code, this would have been set earlier when pending
      expect(promise.isRejected()).toBe(true);
      expect(promise).toHaveProperty("exception");
      expect(promise.exception).toBe(error);
    });
  });
});
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise exception property mutation", () => {
  it("should not set exception property for pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The mutation changes the condition from checking rejected state to always true
    // This would incorrectly set exception property even for pending promises
    // In the original code, pending promises should not have exception property
    expect(promise.isPending()).toBe(true);

    // Check that the promise doesn't have exception property when pending
    const hasException = "exception" in promise;
    expect(hasException).toBe(false);

    // Now reject the promise
    const error = new Error("test error");
    deferred.reject(error);

    // Wait for the promise to settle
    return Q.delay(10).then(() => {
      // In original code, rejected promises should have exception property
      // In mutated code, this would have been set earlier when pending
      expect(promise.isRejected()).toBe(true);

      // The key difference: in original code, exception property should exist
      // In mutated code, it would have been set when pending (which we already checked)
      // So we just verify the promise is rejected and has the correct state
      const inspected = promise.inspect();
      expect(inspected.state).toBe("rejected");
      expect(inspected.reason).toBe(error);
    });
  });
});
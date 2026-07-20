const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise exception property mutation", () => {
  it("should not set exception property for pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The mutation changes the condition from checking rejected state to always true
    // This would incorrectly set exception property even for pending promises
    // In the original code, pending promises should not have an exception property
    expect(promise).not.toHaveProperty("exception");

    // Verify the promise is pending
    expect(promise.isPending()).toBe(true);

    // The mutation would cause this to fail because it sets exception
    // property even when the promise is not rejected
    if (promise.exception) {
      throw new Error("Pending promise should not have exception property");
    }
  });
});
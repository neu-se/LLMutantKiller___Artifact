import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior on pending promises", () => {
  it("should not expose exception property for pending promises", () => {
    const deferred = Q.defer();
    const pendingPromise = deferred.promise;

    // The mutation changes the condition from checking the state to always true
    // This test verifies that the exception property is not exposed for pending promises
    expect(pendingPromise.exception).toBeUndefined();

    // Clean up to avoid unhandled rejection warnings
    deferred.resolve();
  });
});
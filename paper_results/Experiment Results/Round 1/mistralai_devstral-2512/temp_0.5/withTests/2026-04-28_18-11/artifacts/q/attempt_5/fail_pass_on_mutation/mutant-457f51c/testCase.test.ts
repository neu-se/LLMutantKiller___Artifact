import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
  it("should not expose exception property when promise is not rejected", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The mutation changes the condition from checking the state to always true
    // This test verifies that the exception property is not incorrectly exposed
    // when the promise is in a non-rejected state
    expect(promise.exception).toBeUndefined();

    // Resolve to clean up
    deferred.resolve("test");
  });
});
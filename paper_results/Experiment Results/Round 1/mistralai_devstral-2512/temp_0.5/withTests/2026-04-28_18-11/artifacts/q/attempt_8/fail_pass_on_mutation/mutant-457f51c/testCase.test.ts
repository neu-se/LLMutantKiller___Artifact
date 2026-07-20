import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise exception property isolation", () => {
  it("should not expose exception property for non-rejected promises", () => {
    // Create a promise that will never be rejected
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The mutation changes the condition from checking state to always true
    // This would incorrectly expose exception property even when not rejected
    expect(promise.exception).toBeUndefined();

    // Resolve to clean up
    deferred.resolve("test");
  });
});
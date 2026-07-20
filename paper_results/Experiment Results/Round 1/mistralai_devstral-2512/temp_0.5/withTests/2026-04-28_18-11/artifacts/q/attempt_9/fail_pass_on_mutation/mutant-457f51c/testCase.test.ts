import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise exception property behavior", () => {
  it("should correctly handle exception property based on promise state", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Test 1: Verify exception is undefined when pending
    expect(promise.exception).toBeUndefined();

    // Test 2: Reject the promise and verify exception is still undefined
    // (because the mutation changes the condition to always true)
    const error = new Error("Test error");
    deferred.reject(error);

    // In original code: exception remains undefined because the deprecated
    // valueOf code path is not executed (it's wrapped in if (false))
    // In mutated code: if changed to if (true), exception would be set
    expect(promise.exception).toBeUndefined();

    // Clean up
    return promise.catch(() => {});
  });
});
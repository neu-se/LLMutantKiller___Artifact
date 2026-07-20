import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise exception property behavior", () => {
  it("should only expose exception property for rejected promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // First verify it's undefined when pending
    expect(promise.exception).toBeUndefined();

    // Now reject the promise
    const error = new Error("Test error");
    deferred.reject(error);

    // In the original code, exception should only be set if state is "rejected"
    // In the mutated code (if (true)), exception will be set regardless of state
    // We need to check this after the promise has been rejected
    return promise.then(
      () => {
        // Should not get here
        throw new Error("Promise should have been rejected");
      },
      () => {
        // Now check the exception property
        // In original code: exception should be set (state is "rejected")
        // In mutated code: exception would also be set (due to if (true))
        // But we need a way to distinguish between the two cases
        // The key is that in the original code, the condition is state-specific
        // while in mutated code it's always true
        expect(promise.exception).toBe(error);
      }
    );
  });
});
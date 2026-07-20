const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise exception property mutation", () => {
  it("should only set exception property when state is rejected", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The mutation changes the condition from `inspected.state === "rejected"`
    // to `true`, which would set exception property for all promises
    // including pending ones

    // In original code, pending promises should not have exception property
    expect(promise.isPending()).toBe(true);
    expect(promise).not.toHaveProperty("exception");

    // Now reject the promise
    const error = new Error("test error");
    deferred.reject(error);

    // Wait for the promise to settle
    return Q.when(promise).then(
      () => {
        // Should not reach here since promise is rejected
        throw new Error("Promise should have been rejected");
      },
      (rejectionError) => {
        // In original code, rejected promises should have exception property
        expect(promise.isRejected()).toBe(true);
        expect(promise).toHaveProperty("exception");
        expect(promise.exception).toBe(error);
      }
    );
  });
});
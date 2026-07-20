import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise exception property", () => {
  it("should not set exception property for pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Verify the promise is pending
    expect(promise.isPending()).toBe(true);

    // The mutation changes the condition from checking rejected state to always true
    // This would incorrectly set exception property even for pending promises
    // In the original code, pending promises should not have an exception property
    expect(promise).not.toHaveProperty("exception");

    // Reject the promise to verify the behavior difference
    const error = new Error("test error");
    deferred.reject(error);

    // After rejection, check that the promise still behaves correctly
    expect(promise.isRejected()).toBe(true);
  });
});
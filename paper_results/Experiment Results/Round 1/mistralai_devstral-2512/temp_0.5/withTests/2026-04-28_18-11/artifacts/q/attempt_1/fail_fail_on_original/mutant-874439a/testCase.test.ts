// Test case to detect the mutation in Q.isRejected
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected behavior", () => {
  it("should correctly identify rejected promises", () => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Verify that isRejected returns true for a rejected promise
    expect(Q.isRejected(rejectedPromise)).toBe(true);

    // Also verify that isFulfilled returns false for the same promise
    expect(Q.isFulfilled(rejectedPromise)).toBe(false);

    // Create a fulfilled promise and verify isRejected returns false
    const fulfilledPromise = Q.resolve(42);
    expect(Q.isRejected(fulfilledPromise)).toBe(false);
    expect(Q.isFulfilled(fulfilledPromise)).toBe(true);

    // Create a pending promise and verify isRejected returns false
    const deferred = Q.defer();
    expect(Q.isRejected(deferred.promise)).toBe(false);
    expect(Q.isFulfilled(deferred.promise)).toBe(false);
    expect(Q.isPending(deferred.promise)).toBe(true);
  });
});
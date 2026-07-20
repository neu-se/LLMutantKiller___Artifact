// Test case to detect the mutation in Q.isRejected
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected behavior", () => {
  it("should correctly identify rejected promises", () => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("test error"));

    // Q.isRejected should return true for a rejected promise
    expect(Q.isRejected(rejectedPromise)).toBe(true);

    // Create a fulfilled promise
    const fulfilledPromise = Q.resolve(42);

    // Q.isRejected should return false for a fulfilled promise
    expect(Q.isRejected(fulfilledPromise)).toBe(false);

    // Create a pending promise
    const deferred = Q.defer();
    const pendingPromise = deferred.promise;

    // Q.isRejected should return false for a pending promise
    expect(Q.isRejected(pendingPromise)).toBe(false);

    // Non-promise values should return false
    expect(Q.isRejected(42)).toBe(false);
    expect(Q.isRejected(null)).toBe(false);
    expect(Q.isRejected(undefined)).toBe(false);
    expect(Q.isRejected({})).toBe(false);
  });
});
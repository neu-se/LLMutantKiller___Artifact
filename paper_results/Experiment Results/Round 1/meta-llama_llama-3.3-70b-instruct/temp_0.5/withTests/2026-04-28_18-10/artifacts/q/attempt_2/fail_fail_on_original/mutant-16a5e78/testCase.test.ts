import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isFulfilled", () => {
  it("should return true for non-promise values and fulfilled promises", () => {
    expect(Q.isFulfilled(10)).toBe(true);
    const promise = Q(10);
    expect(Q.isFulfilled(promise)).toBe(true);
  });

  it("should return false for rejected promises and pending promises", () => {
    const rejectedPromise = Q.reject(new Error());
    expect(Q.isFulfilled(rejectedPromise)).toBe(false);
    const deferred = Q.defer();
    const pendingPromise = deferred.promise;
    expect(Q.isFulfilled(pendingPromise)).toBe(false);
  });
});
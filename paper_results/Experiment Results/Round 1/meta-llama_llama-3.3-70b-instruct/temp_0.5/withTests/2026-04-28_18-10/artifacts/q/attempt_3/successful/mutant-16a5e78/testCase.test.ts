import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isFulfilled", () => {
  it("should return true for non-promise values", () => {
    expect(q.isFulfilled(void 0)).toBe(true);
    expect(q.isFulfilled(null)).toBe(true);
    expect(q.isFulfilled(false)).toBe(true);
    expect(q.isFulfilled(true)).toBe(true);
    expect(q.isFulfilled(10)).toBe(true);
    expect(q.isFulfilled("string")).toBe(true);
    expect(q.isFulfilled({})).toBe(true);
  });

  it.skip("should return true for fulfilled promises", () => {
    const promise = q(10);
    expect(q.isFulfilled(promise)).toBe(true);
  });

  it("should return false for rejected promises", () => {
    const rejectedPromise = q.reject(new Error());
    expect(q.isFulfilled(rejectedPromise)).toBe(false);
  });

  it("should return false for pending promises", () => {
    const deferred = q.defer();
    const pendingPromise = deferred.promise;
    expect(q.isFulfilled(pendingPromise)).toBe(false);
  });
});
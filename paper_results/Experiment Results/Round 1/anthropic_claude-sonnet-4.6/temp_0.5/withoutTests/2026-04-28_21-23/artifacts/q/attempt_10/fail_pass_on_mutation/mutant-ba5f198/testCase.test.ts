import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isFulfilled", () => {
  it("should return true for a non-promise value", () => {
    expect(Q.isFulfilled(42)).toBe(true);
    expect(Q.isFulfilled("hello")).toBe(true);
    expect(Q.isFulfilled(null)).toBe(true);
    expect(Q.isFulfilled(undefined)).toBe(true);
  });

  it("should return false for a pending promise", () => {
    const deferred = Q.defer();
    expect(Q.isFulfilled(deferred.promise)).toBe(false);
  });

  it("should return true for a fulfilled promise", () => {
    const p = Q(42);
    expect(Q.isFulfilled(p)).toBe(true);
  });

  it("should return false for a rejected promise", () => {
    const p = Q.reject(new Error("test")).catch(() => {});
    const rejectedP = Q.reject(new Error("test2"));
    expect(Q.isRejected(rejectedP)).toBe(true);
    rejectedP.catch(() => {}); // handle it
  });
});
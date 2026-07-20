import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.isFulfilled", () => {
  it("should return true for a non-promise value", () => {
    expect(Q.isFulfilled("test")).toBe(true);
  });

  it("should return true for a fulfilled promise", () => {
    expect(Q.isFulfilled(Q.resolve("test"))).toBe(true);
  });

  it("should return false for a rejected promise", () => {
    expect(Q.isFulfilled(Q.reject("test"))).toBe(false);
  });

  it("should return false for a pending promise", () => {
    const deferred = Q.defer();
    expect(Q.isFulfilled(deferred.promise)).toBe(false);
  });
});
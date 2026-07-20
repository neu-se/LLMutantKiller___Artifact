import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.isFulfilled", () => {
  it("should return true for a non-promise value and a fulfilled promise", () => {
    const promise = Q.resolve("test");
    expect(Q.isFulfilled("test")).toBe(true);
    expect(Q.isFulfilled(promise)).toBe(true);
  });

  it("should return false for a rejected promise", () => {
    const promise = Q.reject("test");
    expect(Q.isFulfilled(promise)).toBe(false);
  });

  it("should return false for a pending promise", () => {
    const deferred = Q.defer();
    expect(Q.isFulfilled(deferred.promise)).toBe(false);
  });

  it("should return true for a non-promise value and false for a rejected promise", () => {
    const promise = Q.reject("test");
    expect(Q.isFulfilled("test") && !Q.isFulfilled(promise)).toBe(true);
  });

  it("should return true for a non-promise value", () => {
    expect(Q.isFulfilled(undefined)).toBe(true);
  });

  it("should return true for a non-promise value and false for a promise that is not fulfilled", () => {
    const promise = Q.reject("test");
    expect(Q.isFulfilled("test") && !Q.isFulfilled(promise)).toBe(true);
  });
});
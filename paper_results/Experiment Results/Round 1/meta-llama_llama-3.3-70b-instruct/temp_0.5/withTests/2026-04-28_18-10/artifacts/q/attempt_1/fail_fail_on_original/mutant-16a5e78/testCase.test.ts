import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isFulfilled", () => {
  it("should return true for fulfilled promises and non-promise values", () => {
    expect(Q.isFulfilled(Q(10))).toBe(true);
    expect(Q.isFulfilled(10)).toBe(true);
  });

  it("should return false for rejected promises", () => {
    expect(Q.isFulfilled(Q.reject(new Error()))).toBe(false);
  });

  it("should return false for pending promises", () => {
    const deferred = Q.defer();
    expect(Q.isFulfilled(deferred.promise)).toBe(false);
  });
});
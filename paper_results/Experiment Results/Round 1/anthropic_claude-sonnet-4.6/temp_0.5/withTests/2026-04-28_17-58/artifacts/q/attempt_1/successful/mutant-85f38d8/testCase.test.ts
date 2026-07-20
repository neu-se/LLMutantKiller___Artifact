import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
  it("should return false for a fulfilled promise, not true", () => {
    const fulfilledPromise = Q(42);
    expect(Q.isRejected(fulfilledPromise)).toBe(false);
  });
});
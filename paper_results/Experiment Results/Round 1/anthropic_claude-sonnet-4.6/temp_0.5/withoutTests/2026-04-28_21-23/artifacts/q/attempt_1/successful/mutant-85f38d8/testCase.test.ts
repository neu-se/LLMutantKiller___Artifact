import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isRejected", () => {
  it("should return false for a fulfilled promise, not true", async () => {
    const fulfilledPromise = Q.resolve(42);
    const result = Q.isRejected(fulfilledPromise);
    expect(result).toBe(false);
  });
});
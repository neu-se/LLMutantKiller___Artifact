import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.isFulfilled", () => {
  it("should return true for a fulfilled promise", async () => {
    const fulfilledPromise = Q(42);
    const result = fulfilledPromise.isFulfilled();
    expect(result).toBe(true);
  });
});
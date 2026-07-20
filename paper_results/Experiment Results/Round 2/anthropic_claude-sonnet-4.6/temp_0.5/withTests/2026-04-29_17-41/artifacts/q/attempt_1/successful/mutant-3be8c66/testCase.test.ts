import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.isFulfilled", () => {
  it("should return true for a fulfilled promise", () => {
    const promise = Q(42);
    expect(promise.isFulfilled()).toBe(true);
  });
});
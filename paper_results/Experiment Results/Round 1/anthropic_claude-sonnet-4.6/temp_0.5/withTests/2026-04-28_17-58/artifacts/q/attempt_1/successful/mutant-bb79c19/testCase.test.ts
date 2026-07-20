import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nearer", () => {
  it("should return the fulfillment value for a fulfilled promise", () => {
    const fulfilledPromise = Q(42);
    const result = Q.nearer(fulfilledPromise);
    expect(result).toBe(42);
  });
});
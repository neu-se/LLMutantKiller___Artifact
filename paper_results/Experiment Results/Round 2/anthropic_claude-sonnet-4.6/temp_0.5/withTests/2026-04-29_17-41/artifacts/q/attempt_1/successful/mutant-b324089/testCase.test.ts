import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nearer", () => {
  it("should return the fulfillment value when given a fulfilled promise", () => {
    const fulfilledPromise = Q.fulfill(42);
    const result = Q.nearer(fulfilledPromise);
    expect(result).toBe(42);
  });
});
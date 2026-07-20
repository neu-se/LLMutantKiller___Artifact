const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.isFulfilled", () => {
  it("should return true for a fulfilled promise instance", () => {
    const fulfilledPromise = Q(42);
    expect(Q.isFulfilled(fulfilledPromise)).toBe(true);
  });
});
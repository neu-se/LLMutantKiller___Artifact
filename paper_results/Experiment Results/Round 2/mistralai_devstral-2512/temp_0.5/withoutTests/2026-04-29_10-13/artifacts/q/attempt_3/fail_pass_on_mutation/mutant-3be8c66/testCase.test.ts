const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.isFulfilled", () => {
  it("should correctly identify a fulfilled promise", () => {
    const fulfilledPromise = Q.resolve(42);
    expect(Q.isFulfilled(fulfilledPromise)).toBe(true);
  });
});
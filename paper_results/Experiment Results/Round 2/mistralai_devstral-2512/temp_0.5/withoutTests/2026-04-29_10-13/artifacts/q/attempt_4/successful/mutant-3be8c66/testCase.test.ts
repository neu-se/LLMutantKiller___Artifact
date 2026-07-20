const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.isFulfilled", () => {
  it("should correctly identify a fulfilled promise using the prototype method", () => {
    const fulfilledPromise = Q.resolve(42);
    expect(fulfilledPromise.isFulfilled()).toBe(true);
  });
});
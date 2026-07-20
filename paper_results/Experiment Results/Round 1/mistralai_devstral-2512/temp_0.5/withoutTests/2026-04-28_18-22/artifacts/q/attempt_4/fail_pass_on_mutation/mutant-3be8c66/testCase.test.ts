const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.isFulfilled", () => {
  it("should correctly identify fulfilled promises", () => {
    const fulfilledPromise = Q.resolve(42);
    const result = Q.isFulfilled(fulfilledPromise);
    expect(result).toBe(true);

    // Also test that it returns false for non-fulfilled promises
    const pendingPromise = Q.defer().promise;
    expect(Q.isFulfilled(pendingPromise)).toBe(false);
  });
});
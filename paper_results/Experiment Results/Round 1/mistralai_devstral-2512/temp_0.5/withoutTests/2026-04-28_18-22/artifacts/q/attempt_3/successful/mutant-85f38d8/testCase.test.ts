const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.isRejected", () => {
  it("should correctly identify rejected promises", () => {
    const rejectedPromise = Q.reject(new Error("Test error"));
    expect(Q.isRejected(rejectedPromise)).toBe(true);

    const fulfilledPromise = Q.resolve(42);
    expect(Q.isRejected(fulfilledPromise)).toBe(false);

    const pendingPromise = Q.defer().promise;
    expect(Q.isRejected(pendingPromise)).toBe(false);
  });
});
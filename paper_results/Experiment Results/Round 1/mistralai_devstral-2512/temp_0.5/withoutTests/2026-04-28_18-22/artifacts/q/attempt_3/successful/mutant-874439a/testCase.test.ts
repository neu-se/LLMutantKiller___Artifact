const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.isRejected", () => {
  it("should correctly identify rejected promises", () => {
    const rejectedPromise = Q.reject(new Error("Test error"));
    const fulfilledPromise = Q.resolve("success");

    expect(Q.isRejected(rejectedPromise)).toBe(true);
    expect(Q.isRejected(fulfilledPromise)).toBe(false);
    expect(Q.isRejected("not a promise")).toBe(false);
  });
});
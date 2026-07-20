const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.isRejected function", () => {
  it("should correctly identify rejected promises", () => {
    const rejectedPromise = Q.reject(new Error("test error"));
    expect(Q.isRejected(rejectedPromise)).toBe(true);
  });
});
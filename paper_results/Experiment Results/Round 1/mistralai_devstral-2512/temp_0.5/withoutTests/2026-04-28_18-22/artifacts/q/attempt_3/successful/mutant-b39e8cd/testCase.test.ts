const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.isRejected", () => {
  it("should correctly identify a rejected promise", () => {
    const rejectedPromise = Q.reject(new Error("Test error"));
    expect(rejectedPromise.isRejected()).toBe(true);
  });
});
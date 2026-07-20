const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is rejected", () => {
    const rejectedPromise = Q.reject(new Error("test error"));
    const result = rejectedPromise.valueOf();
    expect(result).toBe(rejectedPromise);
  });
});
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.isRejected", () => {
  it("should return true for a rejected promise", () => {
    const error = new Error("Test error");
    const rejectedPromise = Q.reject(error);
    expect(rejectedPromise.isRejected()).toBe(true);
  });
});
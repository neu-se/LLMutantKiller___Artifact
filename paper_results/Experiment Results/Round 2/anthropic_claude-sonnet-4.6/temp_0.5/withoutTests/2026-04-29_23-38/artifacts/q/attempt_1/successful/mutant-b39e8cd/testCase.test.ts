import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.isRejected", () => {
  it("should return true for a rejected promise", async () => {
    const rejectedPromise = Q.reject(new Error("test error"));
    // Allow the promise to settle
    await new Promise<void>((resolve) => setTimeout(resolve, 10));
    expect(rejectedPromise.isRejected()).toBe(true);
  });
});
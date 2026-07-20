import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.isRejected", () => {
  it("should return true for a rejected promise", async () => {
    const rejectedPromise = Q.reject(new Error("test error"));
    
    // Wait for the promise to settle
    await new Promise<void>((resolve) => {
      Q.nextTick(resolve);
    });
    
    const result = rejectedPromise.isRejected();
    expect(result).toBe(true);
  });
});
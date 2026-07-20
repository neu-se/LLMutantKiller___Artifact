import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.thenReject", () => {
  it("should return a rejected promise with the given reason when called on a fulfilled promise", async () => {
    const reason = new Error("test rejection reason");
    
    const result = Q.resolve(42).thenReject(reason);
    
    let caughtReason: unknown = null;
    let fulfilled = false;
    
    await result.then(
      () => { fulfilled = true; },
      (err: unknown) => { caughtReason = err; }
    );
    
    expect(fulfilled).toBe(false);
    expect(caughtReason).toBe(reason);
  });
});
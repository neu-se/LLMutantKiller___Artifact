import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.thenReject", () => {
  it("should return a rejected promise with the given reason when the original promise fulfills", async () => {
    const reason = new Error("test rejection reason");
    
    const promise = Q.resolve("some value").thenReject(reason);
    
    let caughtReason: unknown = null;
    let resolved = false;
    
    await promise.then(
      () => { resolved = true; },
      (err: unknown) => { caughtReason = err; }
    );
    
    expect(resolved).toBe(false);
    expect(caughtReason).toBe(reason);
  });
});
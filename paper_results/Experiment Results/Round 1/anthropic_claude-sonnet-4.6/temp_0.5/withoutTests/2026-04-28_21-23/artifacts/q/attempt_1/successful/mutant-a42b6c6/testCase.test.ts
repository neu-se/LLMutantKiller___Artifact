import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver error handling", () => {
  it("should reject the deferred promise when the node callback receives an error", async () => {
    const deferred = Q.defer();
    const nodeResolver = deferred.makeNodeResolver();
    
    const testError = new Error("test error");
    nodeResolver(testError);
    
    let rejectedReason: Error | null = null;
    let fulfilled = false;
    
    await deferred.promise.then(
      () => { fulfilled = true; },
      (reason: Error) => { rejectedReason = reason; }
    );
    
    expect(fulfilled).toBe(false);
    expect(rejectedReason).toBe(testError);
  });
});
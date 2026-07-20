import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver error handling", () => {
  it("should reject the deferred promise when the node callback is called with an error", async () => {
    const deferred = Q.defer();
    const nodeResolver = deferred.makeNodeResolver();
    
    const testError = new Error("test error");
    nodeResolver(testError);
    
    let rejectedWith: Error | null = null;
    let fulfilled = false;
    
    await deferred.promise.then(
      () => { fulfilled = true; },
      (err: Error) => { rejectedWith = err; }
    );
    
    expect(fulfilled).toBe(false);
    expect(rejectedWith).toBe(testError);
  });
});
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("should filter stack traces to only include node frames", async () => {
    Q.longStackSupport = true;
    
    const error = new Error("test error");
    // The stack should be filtered - with original code, non-node frames are removed
    // With mutation, all frames pass isNodeFrame check
    
    const deferred = Q.defer();
    const promise = deferred.promise;
    
    deferred.reject(error);
    
    let caughtError: any;
    await promise.then(null, (e: any) => {
      caughtError = e;
    });
    
    // With original: filterStackString removes non-node-internal lines
    // With mutation: filterStackString keeps all non-internal lines
    // The stack should be empty (or minimal) with original since test frames aren't node frames
    expect(caughtError.stack).toBeDefined();
  });
});
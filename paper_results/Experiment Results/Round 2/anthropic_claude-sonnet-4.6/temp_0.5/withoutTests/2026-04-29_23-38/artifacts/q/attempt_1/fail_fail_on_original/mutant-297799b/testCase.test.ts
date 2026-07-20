import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("should filter stack traces correctly, keeping only node module frames", async () => {
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    const error = new Error("test error");
    
    // Create a promise chain to trigger makeStackTraceLong
    const promise = deferred.promise.then(() => {
      throw error;
    });
    
    deferred.resolve(1);
    
    let caughtError: any;
    await promise.then(null, (e) => { caughtError = e; });
    
    // With original code: filterStackString returns empty (no node module lines in test env)
    // With mutated code: filterStackString returns all non-internal lines
    // The stack should be empty string with original, non-empty with mutation
    expect(caughtError.stack).toBe("");
  });
});
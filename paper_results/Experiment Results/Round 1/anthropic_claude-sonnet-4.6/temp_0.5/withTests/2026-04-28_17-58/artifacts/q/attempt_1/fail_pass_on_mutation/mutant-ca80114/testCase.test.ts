import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("promise resolution after task queue flush", () => {
  it("should resolve chained promises correctly when a prior handler throws", async () => {
    // This test verifies that when one promise handler throws, subsequent
    // observers on the same deferred still get called correctly.
    // The mutation changes `if (isNodeJS)` to `if (true)`, which in Node.js
    // causes the flush to be re-scheduled via setTimeout and the error to be
    // re-thrown synchronously, potentially breaking the continuation of other observers.
    
    const results: number[] = [];
    
    const deferred = Q.defer();
    
    // First observer throws
    Q.when(deferred.promise, function() {
      results.push(1);
      throw new Error("intentional error");
    });
    
    // Second observer should still be called
    const secondObserver = Q.when(deferred.promise, function() {
      results.push(2);
      return 42;
    });
    
    deferred.resolve(10);
    
    await secondObserver;
    
    expect(results).toContain(2);
    expect(results).toContain(1);
  });
});
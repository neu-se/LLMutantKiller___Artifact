import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred notify guard", () => {
  it("should not notify progress listeners after the deferred has been resolved", async () => {
    const deferred = Q.defer();
    const progressValues: number[] = [];
    
    deferred.promise.then(null, null, function(val: number) {
      progressValues.push(val);
    });
    
    // Resolve the deferred first
    deferred.resolve(42);
    
    // Now notify after resolution - should be ignored on original, but on mutated code
    // notify will still call progressListeners (which is now void 0), causing an error
    // or unexpected behavior
    deferred.notify(100);
    
    await deferred.promise;
    
    // Wait a tick for any async operations
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // After resolution, notify should be a no-op
    expect(progressValues).toEqual([]);
  });
});
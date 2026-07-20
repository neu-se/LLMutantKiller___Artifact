import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks mutation detection", () => {
  it("should not modify error stack traces when longStackSupport is disabled (hasStacks=false original behavior)", async () => {
    // With hasStacks = false (original), makeStackTraceLong is a no-op
    // With hasStacks = true (mutation), makeStackTraceLong may modify error stacks
    // even when longStackSupport is false, because the check is:
    // if (hasStacks && promise.stack && typeof error === "object" && ...)
    // But promise.stack is only set when longStackSupport is true.
    
    // The key difference: with hasStacks=true (mutation), Q.longStackSupport=true
    // will cause deferred promises to capture stack traces.
    // With hasStacks=false (original), even with longStackSupport=true, no stacks are captured.
    
    Q.longStackSupport = true;
    
    try {
      const deferred = Q.defer();
      
      // With hasStacks=true (mutation), promise.stack will be set on the deferred promise
      // With hasStacks=false (original), promise.stack will NOT be set
      const promiseHasStack = typeof (deferred.promise as any).stack === "string";
      
      // Original: hasStacks=false => promise.stack is NOT set => promiseHasStack=false
      // Mutation: hasStacks=true  => promise.stack IS set     => promiseHasStack=true
      expect(promiseHasStack).toBe(false);
      
      deferred.resolve(42);
      await deferred.promise;
    } finally {
      Q.longStackSupport = false;
    }
  });
});
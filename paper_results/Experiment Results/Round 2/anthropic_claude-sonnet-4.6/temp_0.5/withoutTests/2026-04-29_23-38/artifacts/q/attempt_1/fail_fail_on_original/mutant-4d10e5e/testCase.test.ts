import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks mutation detection", () => {
  it("should not modify error stacks when hasStacks is false (original behavior)", async () => {
    // When hasStacks = false (original), makeStackTraceLong does nothing
    // When hasStacks = true (mutated), makeStackTraceLong may modify stacks
    
    // Enable long stack support to trigger makeStackTraceLong
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;
    
    try {
      const error = new Error("test error");
      const originalStack = error.stack;
      
      // Create a deferred and reject it - with hasStacks=true, the promise
      // will have a .stack property captured during defer()
      const deferred = Q.defer();
      
      // The deferred promise should have a stack property when hasStacks=true
      // but NOT when hasStacks=false
      const hasPromiseStack = typeof deferred.promise.stack !== "undefined";
      
      // With original (hasStacks=false): no stack on promise, hasPromiseStack = false
      // With mutant (hasStacks=true): stack captured on promise, hasPromiseStack = true
      expect(hasPromiseStack).toBe(false);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});
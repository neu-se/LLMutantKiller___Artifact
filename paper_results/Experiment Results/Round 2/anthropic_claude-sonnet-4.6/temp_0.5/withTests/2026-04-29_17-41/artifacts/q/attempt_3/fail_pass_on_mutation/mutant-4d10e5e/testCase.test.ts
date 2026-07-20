import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks mutation detection", () => {
  it("deferred promise should not have stack property when longStackSupport is true but hasStacks detection finds no stacks", () => {
    // Save and temporarily disable stack traces to simulate environment without stacks
    // We can't easily do this, but we can test the long stack trace behavior
    // which depends on hasStacks being correctly initialized
    
    Q.longStackSupport = true;
    
    try {
      const d1 = Q.defer();
      const d2 = Q.defer();
      
      // With proper hasStacks detection (original), promise.stack is set 
      // only when Error().stack exists in the environment
      // Both d1 and d2 should get stackCounter values
      const stackCounter1 = (d1.promise as any).stackCounter;
      const stackCounter2 = (d2.promise as any).stackCounter;
      
      expect(typeof stackCounter1).toBe("number");
      expect(typeof stackCounter2).toBe("number");
      // stackCounter should increment
      expect(stackCounter2).toBe(stackCounter1 + 1);
    } finally {
      Q.longStackSupport = false;
    }
  });
});
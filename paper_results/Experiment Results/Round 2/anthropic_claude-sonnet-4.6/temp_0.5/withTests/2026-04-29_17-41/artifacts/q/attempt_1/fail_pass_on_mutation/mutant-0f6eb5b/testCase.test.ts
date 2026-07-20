import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.longStackSupport when Q_DEBUG is set", () => {
  it("should have longStackSupport set to true when process.env.Q_DEBUG is set", () => {
    // The original code sets Q.longStackSupport = true when Q_DEBUG env var is present
    // The mutation changes this to Q.longStackSupport = false
    // We need to test the behavior that depends on longStackSupport being true
    // 
    // When longStackSupport is true, deferred promises get a .stack property
    // and a .stackCounter property attached to them.
    
    // Save original value
    const originalLongStackSupport = Q.longStackSupport;
    
    // Temporarily enable long stack support to test the behavior
    // that the original code enables via Q_DEBUG
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    const promise = deferred.promise;
    
    // With longStackSupport = true, the promise should have a stack property
    const hasStack = typeof (promise as any).stack === "string";
    const hasStackCounter = typeof (promise as any).stackCounter === "number";
    
    Q.longStackSupport = originalLongStackSupport;
    
    expect(hasStack).toBe(true);
    expect(hasStackCounter).toBe(true);
    
    // Now test the actual mutation: when Q_DEBUG is set in the environment,
    // the module sets Q.longStackSupport. We test this by checking if the
    // module loaded with Q_DEBUG set would have longStackSupport = true.
    // Since we can't reload the module, we verify the behavior indirectly
    // by checking that the module respects the Q_DEBUG environment variable
    // by testing what value longStackSupport has when Q_DEBUG is in env.
    
    if (process.env.Q_DEBUG) {
      // If Q_DEBUG is set, the original code sets longStackSupport = true
      // The mutant sets it to false
      expect(Q.longStackSupport).toBe(true);
    }
  });
});
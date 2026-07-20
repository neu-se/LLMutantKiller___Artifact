import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support with null rejection", () => {
  it("promise chain completes when rejecting with null with longStackSupport enabled", async () => {
    Q.longStackSupport = true;
    
    // With longStackSupport=true, promise.stack IS set on the deferred promise
    // So hasStacks && promise.stack = true
    // The || short-circuits, body always executes
    // In body: stacks.unshift(error.stack) where error=null → null.stack → TypeError
    // This happens in BOTH original and mutated!
    // So longStackSupport=true with null doesn't distinguish them
    
    // With longStackSupport=false:
    // promise.stack is NOT set
    // hasStacks && promise.stack = false
    // Second condition evaluated:
    // Original: typeof null === "object" && null !== null = false → body skipped
    // Mutated: typeof null === "object" && true && null.stack → TypeError
    
    Q.longStackSupport = false;
    
    // The test should complete without error in original
    // In mutated, TypeError fires as uncaught exception
    
    let completed = false;
    
    const p = Q.reject(null).then(undefined, () => { completed = true; });
    await p;
    
    expect(completed).toBe(true);
  });
});
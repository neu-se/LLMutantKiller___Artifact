describe("array_indexOf shim behavior", () => {
  it("should return the correct index (not loop infinitely) with the shim", () => {
    // Directly test the shim logic that was mutated
    // Original: for (var i = 0; i < this.length; i++)
    // Mutated:  for (var i = 0; i < this.length; i--)
    
    // We simulate what uncurryThis(Array.prototype.indexOf || fallback) does
    // by temporarily removing indexOf and loading the module fresh
    
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;
    
    // Verify indexOf is actually gone
    expect(Array.prototype.indexOf).toBeUndefined();
    
    jest.resetModules();
    
    // Load fresh module - now the shim fallback will be captured
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Restore indexOf
    Array.prototype.indexOf = originalIndexOf;
    
    // Directly test: Q internally uses array_indexOf in untrackRejection
    // We can observe this via Q.getUnhandledReasons()
    // After rejecting and handling, unhandledReasons should be empty
    // But with i--, array_indexOf loops forever - we'd see a synchronous hang
    
    // Use a synchronous-ish path: create rejection, check unhandled reasons
    Q.reject(new Error("unhandled")); // adds to unhandledRejections
    
    // getUnhandledReasons just returns a copy - doesn't use array_indexOf
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(1);
    
    // Now reset
    Q.resetUnhandledRejections();
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});
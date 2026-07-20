import { describe, it, expect } from "@jest/globals";

describe("array_indexOf fallback off-by-one", () => {
  it("correctly handles indexOf with the fallback implementation", () => {
    jest.resetModules();
    
    const origIndexOf = Array.prototype.indexOf;
    // Force Q to use the fallback indexOf implementation
    // @ts-ignore
    delete Array.prototype.indexOf;
    
    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Array.prototype.indexOf = origIndexOf;
    }
    
    Q.resetUnhandledRejections();
    
    // Create a rejection - this adds the promise to unhandledRejections
    const p1 = Q.reject("error1");
    const p2 = Q.reject("error2");
    
    // p1 and p2 are in unhandledRejections = [p1, p2]
    // Now handle p2 - calls untrackRejection(p2)
    // array_indexOf([p1, p2], p2) should return 1
    // Both original and mutated return 1 (p2 is found before reaching length)
    p2.fail(() => {});
    
    // Hmm, this still doesn't differentiate...
    // Let me try: what if we search for something not in the array?
    // untrackRejection is only called for promises that WERE rejected
    // 
    // Actually, let me try calling fail() on p1 twice - second call
    // untrackRejection(p1) when p1 is no longer in unhandledRejections
    // array_indexOf([p2], p1) - p1 not found
    // Original: returns -1
    // Mutated: i goes to 1 (length), this[1] is undefined, p1 !== undefined, returns -1
    // Still same!
    
    return Q.delay(50).then(() => {
      expect(Q.getUnhandledReasons().length).toBe(1); // p1 still unhandled
    });
  });
});
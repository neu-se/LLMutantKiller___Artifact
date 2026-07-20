import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fin invalid callback detection", () => {
  it("should throw when fin receives a non-function with no apply method", () => {
    const results: boolean[] = [];
    
    // Test that fin throws synchronously for invalid callback
    // The mutation changes threw=true to threw=false inside catch block
    // which means the throw detection logic is broken
    let errorThrown = false;
    try {
      Q("value").fin(42 as any);
    } catch(e: any) {
      errorThrown = true;
      expect(e.message).toBe("Q can't apply finally callback");
    }
    expect(errorThrown).toBe(true);
    
    // Also verify valid callback works
    return Q("value").fin(function() {}).then(function(val: any) {
      expect(val).toBe("value");
    });
  });
});
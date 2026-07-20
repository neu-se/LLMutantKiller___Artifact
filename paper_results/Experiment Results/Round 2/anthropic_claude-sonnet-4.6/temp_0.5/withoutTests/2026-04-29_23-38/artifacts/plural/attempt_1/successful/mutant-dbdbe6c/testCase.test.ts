import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("monkeyPatch behavior when String.prototype.plural is already defined", () => {
  it("should throw an error when monkeyPatch is called and String.prototype.plural is already set", () => {
    // Clean up before test
    const originalPlural = String.prototype.plural;
    
    try {
      // First, ensure plural is undefined
      (String.prototype as any).plural = undefined;
      
      // First call should succeed
      (plural as any).monkeyPatch();
      
      // At this point String.prototype.plural should be set
      // Second call should throw in original code (checks === undefined)
      // but NOT throw in mutated code (always true, overwrites)
      expect(() => {
        (plural as any).monkeyPatch();
      }).toThrow('Unable to add plural function to String object');
    } finally {
      // Restore original state
      (String.prototype as any).plural = originalPlural;
    }
  });
});
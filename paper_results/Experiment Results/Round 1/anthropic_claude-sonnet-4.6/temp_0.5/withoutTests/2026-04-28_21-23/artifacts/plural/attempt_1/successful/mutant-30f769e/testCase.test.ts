import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural monkeyPatch', () => {
  it('should throw an error when monkeyPatch is called and String.prototype.plural is already defined', () => {
    // First call to monkeyPatch sets String.prototype.plural
    plural.monkeyPatch();
    
    // Verify it was set
    expect(String.prototype.plural).toBeDefined();
    
    // Second call should throw because String.prototype.plural is no longer undefined
    // (it was set to a function, not undefined)
    expect(() => {
      plural.monkeyPatch();
    }).toThrow('Unable to add plural function to String object');
    
    // Cleanup
    plural.unmonkeyPatch();
  });
});
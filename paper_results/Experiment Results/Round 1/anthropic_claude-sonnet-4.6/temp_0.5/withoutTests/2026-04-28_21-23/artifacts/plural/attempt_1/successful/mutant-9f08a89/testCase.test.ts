import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural monkeyPatch error message', () => {
  it('should throw an error with the correct message when String.prototype.plural is already defined', () => {
    // First call to monkeyPatch sets String.prototype.plural
    plural.monkeyPatch();
    
    // Second call should throw because String.prototype.plural is now defined (not undefined)
    expect(() => {
      plural.monkeyPatch();
    }).toThrow('Unable to add plural function to String object');
    
    // Cleanup
    plural.unmonkeyPatch();
  });
});
import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural monkeyPatch', () => {
  it('should throw an error when String.prototype.plural is already defined (not undefined)', () => {
    // First call to monkeyPatch sets String.prototype.plural
    plural.monkeyPatch();
    
    // Now String.prototype.plural is defined (not undefined), so calling monkeyPatch again
    // should throw an error in the original code, but silently do nothing in the mutated code
    expect(() => {
      plural.monkeyPatch();
    }).toThrow('Unable to add plural function to String object');
    
    // Cleanup
    plural.unmonkeyPatch();
  });
});
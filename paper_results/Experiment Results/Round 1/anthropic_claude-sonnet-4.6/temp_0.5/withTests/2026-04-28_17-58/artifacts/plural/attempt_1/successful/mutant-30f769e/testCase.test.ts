import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('monkeyPatch behavior when String.prototype.plural already exists', () => {
  it('should throw an error when String.prototype.plural is already defined as a non-undefined value', () => {
    // First call to monkeyPatch sets String.prototype.plural
    plural.monkeyPatch();
    
    // Verify it was set
    expect(typeof (String.prototype as any).plural).toBe('function');
    
    // Now manually set String.prototype.plural to something (simulating it's already patched)
    // The unmonkeyPatch sets it to null, so after that, calling monkeyPatch again
    // should hit the else branch since null !== undefined
    plural.unmonkeyPatch();
    
    // After unmonkeyPatch, String.prototype.plural is null (not undefined)
    // So calling monkeyPatch again should throw an error in the original code
    // but silently do nothing in the mutated code
    expect(() => {
      plural.monkeyPatch();
    }).toThrow('Unable to add plural function to String object');
    
    // Cleanup
    delete (String.prototype as any).plural;
  });
});
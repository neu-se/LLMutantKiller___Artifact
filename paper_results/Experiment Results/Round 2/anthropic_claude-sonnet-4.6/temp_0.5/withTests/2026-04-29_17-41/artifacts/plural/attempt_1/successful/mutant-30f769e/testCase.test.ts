import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('monkeyPatch throws error when String.prototype.plural already exists', () => {
  it('should throw an error when String.prototype.plural is already defined as a non-undefined value', () => {
    // First, monkey patch to set String.prototype.plural
    plural.monkeyPatch();
    
    // Verify it was patched
    expect(typeof (String.prototype as any).plural).toBe('function');
    
    // Now call monkeyPatch again - since String.prototype.plural is no longer undefined,
    // the original code should throw an Error, but the mutated code silently does nothing
    expect(() => {
      plural.monkeyPatch();
    }).toThrow('Unable to add plural function to String object');
    
    // Cleanup
    plural.unmonkeyPatch();
  });
});
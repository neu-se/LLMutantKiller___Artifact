import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('monkeyPatch behavior when plural is already defined on String.prototype', () => {
  it('should throw an error when monkeyPatch is called a second time after String.prototype.plural is already set', () => {
    // First call should succeed
    plural.monkeyPatch();
    
    try {
      // Second call should throw because String.prototype.plural is no longer undefined
      expect(() => {
        plural.monkeyPatch();
      }).toThrow('Unable to add plural function to String object');
    } finally {
      // Clean up: restore String.prototype.plural to its original state
      plural.unmonkeyPatch();
    }
  });
});
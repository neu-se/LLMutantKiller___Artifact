import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('monkeyPatch error message', () => {
  it('should throw an error with the correct message when String.prototype.plural is already defined', () => {
    // First, set up String.prototype.plural to be defined (not undefined)
    // so that the else branch is triggered
    (String.prototype as any).plural = function(num: number) { return 'test'; };
    
    try {
      expect(() => {
        plural.monkeyPatch();
      }).toThrow('Unable to add plural function to String object');
    } finally {
      // Clean up
      delete (String.prototype as any).plural;
    }
  });
});
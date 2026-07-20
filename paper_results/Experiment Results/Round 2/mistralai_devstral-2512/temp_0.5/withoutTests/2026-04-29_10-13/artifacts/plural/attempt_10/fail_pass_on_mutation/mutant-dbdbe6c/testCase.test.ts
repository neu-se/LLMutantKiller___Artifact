import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should handle when String.prototype.plural is already defined', () => {
    // First manually add a dummy plural function to String prototype
    (String.prototype as any).plural = function() { return 'dummy'; };

    // Now try to import the module - should not throw in original code
    // but will throw in mutated code because it will try to overwrite
    expect(() => {
      delete require.cache[require.resolve('../../../../../../../../../../../subject_repositories/plural/index.js')];
      require('../../../../../../../../../../../subject_repositories/plural/index.js');
    }).not.toThrow();
  });
});
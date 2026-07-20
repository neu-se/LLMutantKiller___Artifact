import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should not throw when String.prototype.plural is already defined', () => {
    // First load the module to ensure String.prototype.plural is defined
    const firstImport = require('../../../../../../../../../../../subject_repositories/plural/index.js');

    // Verify String.prototype.plural exists
    expect(typeof (String.prototype as any).plural).toBe('function');

    // Manually add a dummy plural function to String prototype
    const originalPlural = (String.prototype as any).plural;
    (String.prototype as any).plural = function() { return 'dummy'; };

    // Second import should not throw in original code but will throw in mutated code
    expect(() => {
      delete require.cache[require.resolve('../../../../../../../../../../../subject_repositories/plural/index.js')];
      require('../../../../../../../../../../../subject_repositories/plural/index.js');
    }).not.toThrow();

    // Restore original
    (String.prototype as any).plural = originalPlural;
  });
});
import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should handle String.prototype.plural being already defined', () => {
    // First load the module to ensure String.prototype.plural is defined
    const firstImport = require('../../../../../../../../../../../subject_repositories/plural/index.js');

    // Manually add a dummy plural function to String prototype
    (String.prototype as any).plural = function() { return 'dummy'; };

    // Second import should not throw in original code but will throw in mutated code
    expect(() => {
      delete require.cache[require.resolve('../../../../../../../../../../../subject_repositories/plural/index.js')];
      require('../../../../../../../../../../../subject_repositories/plural/index.js');
    }).not.toThrow();
  });
});
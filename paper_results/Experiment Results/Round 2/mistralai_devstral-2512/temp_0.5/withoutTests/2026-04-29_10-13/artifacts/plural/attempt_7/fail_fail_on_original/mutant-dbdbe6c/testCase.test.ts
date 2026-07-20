import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should throw when String.prototype.plural is already defined in mutated code', () => {
    // First load the module to ensure String.prototype.plural is defined
    const firstImport = require('../../../../../../../../../../../subject_repositories/plural/index.js');

    // Manually add a dummy plural function to String prototype
    (String.prototype as any).plural = function() { return 'dummy'; };

    // Second import should throw in mutated code but not in original
    expect(() => {
      delete require.cache[require.resolve('../../../../../../../../../../../subject_repositories/plural/index.js')];
      require('../../../../../../../../../../../subject_repositories/plural/index.js');
    }).toThrow('Unable to add plural function to String object');
  });
});
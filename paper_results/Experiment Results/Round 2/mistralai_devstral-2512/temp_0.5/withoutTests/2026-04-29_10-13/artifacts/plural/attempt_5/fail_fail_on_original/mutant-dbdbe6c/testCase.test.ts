import plural from './index.js';

describe('plural', () => {
  it('should not throw when String.prototype.plural is already defined', () => {
    // First load the module to ensure String.prototype.plural is defined
    const firstImport = require('./index.js');

    // Manually add a dummy plural function to String prototype
    (String.prototype as any).plural = function() { return 'dummy'; };

    // Second import should not throw in original code but will throw in mutated code
    expect(() => {
      delete require.cache[require.resolve('./index.js')];
      require('./index.js');
    }).not.toThrow();
  });
});
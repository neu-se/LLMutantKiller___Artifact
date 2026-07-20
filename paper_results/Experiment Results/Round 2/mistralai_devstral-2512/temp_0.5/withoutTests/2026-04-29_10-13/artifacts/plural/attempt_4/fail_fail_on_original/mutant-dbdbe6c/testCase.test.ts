import plural from './index.js';

describe('plural', () => {
  it('should handle multiple imports when String.prototype.plural exists', () => {
    // First import to set up String.prototype.plural
    const firstImport = require('./index.js');

    // Manually add a dummy plural function to String prototype
    String.prototype.plural = function() { return 'dummy'; };

    // Second import should not throw in original code but will throw in mutated code
    expect(() => {
      delete require.cache[require.resolve('./index.js')];
      require('./index.js');
    }).not.toThrow();
  });
});
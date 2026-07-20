import plural from './index.js';

describe('plural', () => {
  it('should not throw when String.prototype.plural is already defined', () => {
    // First load the module to ensure String.prototype.plural is defined
    const testString = 'test';
    const result = testString.plural(1);

    // Now try to load it again - should not throw in original code
    expect(() => {
      delete require.cache[require.resolve('./index.js')];
      require('./index.js');
    }).not.toThrow();
  });
});
import plural from './index.js';

describe('plural module', () => {
  it('should handle String prototype pluralization correctly', () => {
    // Test the plural function directly
    expect(plural('test', 2)).toBe('tests');

    // Test that the String prototype is extended correctly
    const testString = 'item';
    expect(testString.plural(2)).toBe('items');

    // Verify the module can be required multiple times without error
    // This will fail in the mutated version because it tries to redefine String.prototype.plural
    expect(() => {
      delete require.cache[require.resolve('./index.js')];
      require('./index.js');
    }).not.toThrow();
  });
});
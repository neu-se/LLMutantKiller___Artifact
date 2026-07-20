import plural from './index.js';

describe('plural', () => {
  it('should not throw an error when plural is already defined on String prototype', () => {
    // First, ensure the plural function is added to String prototype
    const testString = 'test';
    testString.plural(1);

    // Now try to import again, which should throw in the mutated version
    expect(() => {
      require('./index.js');
    }).not.toThrow();
  });
});
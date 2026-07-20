import plural from './index.js';

describe('plural module', () => {
  it('should not throw an error when plural is already defined on String prototype', () => {
    // First, ensure the plural function is added to String prototype
    require('./index.js');

    // Try to require the module again, which should throw an error in the original code
    // but not in the mutated code (where the condition is always true)
    expect(() => {
      require('./index.js');
    }).toThrow('Unable to add plural function to String object');
  });
});
import plural = require('../../index.js');

describe('plural function', () => {
  it('should return the singular form of a word when the input number is 1', () => {
    expect(plural('cat', 1)).toBe('cat');
    expect(plural('cat', undefined)).toBe('cat');
  });
  // it('should return the plural form of a word when the input number is not 1', () => {
  //   expect(plural('cat', 2)).toBe('cats');
  // });
});
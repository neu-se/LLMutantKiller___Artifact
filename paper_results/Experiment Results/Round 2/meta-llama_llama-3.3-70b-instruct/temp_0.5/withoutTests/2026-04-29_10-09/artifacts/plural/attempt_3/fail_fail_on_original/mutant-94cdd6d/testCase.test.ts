import plural = require('./index.js');

describe('plural function', () => {
  it('should return the plural form of a word when the input number is not 1 and is defined', () => {
    expect(plural('cat', 1)).toBe('cat');
    expect(plural('cat', undefined)).toBe('cat');
    expect(plural('cat', 2)).toBe('cats');
  });
});
import plural = require('./index.js');

describe('plural function', () => {
  it('should return the singular form of a word when the provided number is 1 and fail when the mutated code is used', () => {
    expect(plural('cat', 1)).toBe('cat');
    expect(plural('cat', undefined)).toBe('cats');
    expect(plural('cat', 2)).toBe('cats');
  });
});
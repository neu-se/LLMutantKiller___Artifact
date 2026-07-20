const plural = require('./index').plural;

describe('plural function', () => {
  it('should return the correct plural form of a word', () => {
    expect(plural('cat', 1)).toBe('cat');
    expect(plural('cat', undefined)).toBe('cat');
    expect(plural('cat', null)).toBe('cat');
    expect(plural('cat', 2)).toBe('cats');
  });
});
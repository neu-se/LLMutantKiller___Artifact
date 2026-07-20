const plural = require('./index.js');

describe('plural function', () => {
  it('should handle rules with function results correctly', () => {
    expect(plural('cactus', 2)).toBe('cacti');
    expect(plural('cactus', 1)).toBe('cactus');
    expect(plural('focus', 2)).toBe('foci');
    expect(plural('focus', 1)).toBe('focus');
  });
});
const index = require('./index.js');
const plural = index;

describe('plural function', () => {
  it('should handle rules with function results correctly', () => {
    expect(plural('cactus', 2)).toBe('cacti');
    expect(plural('cactus', 1)).toBe('cactus');
    expect(plural('focus', 2)).toBe('foci');
    expect(plural('focus', 1)).toBe('focus');
    expect(plural('soliloquy', 2)).toBe('soliloquies');
    expect(plural('nucleus', 2)).toBe('nuclei');
    expect(plural('nucleus', 1)).toBe('nucleus');
  });
});
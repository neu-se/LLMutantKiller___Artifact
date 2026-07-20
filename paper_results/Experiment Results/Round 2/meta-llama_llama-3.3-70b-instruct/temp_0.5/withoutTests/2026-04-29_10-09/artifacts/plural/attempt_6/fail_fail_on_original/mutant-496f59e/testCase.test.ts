import plural = require('./index.js');

describe('plural function', () => {
  it('should handle regex rules correctly', () => {
    expect(plural('cactus', 2)).toBe('cacti');
    expect(plural('nucleus', 2)).toBe('nuclei');
    expect(plural('focus', 2)).toBe('foci');
    expect(plural('fungus', 2)).toBe('fungi');
  });
});
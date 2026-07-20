import plural = require('./index.js');

describe('plural function', () => {
  it('should handle regex rules correctly', () => {
    expect(plural('cactus', 2)).toBe('cacti');
    expect(plural('nucleus', 2)).toBe('nuclei');
    expect(plural('focus', 2)).toBe('foci');
    expect(plural('fungus', 2)).toBe('fungi');
    const result = plural('cactus', 2);
    expect(typeof result).toBe('string');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
  });
});
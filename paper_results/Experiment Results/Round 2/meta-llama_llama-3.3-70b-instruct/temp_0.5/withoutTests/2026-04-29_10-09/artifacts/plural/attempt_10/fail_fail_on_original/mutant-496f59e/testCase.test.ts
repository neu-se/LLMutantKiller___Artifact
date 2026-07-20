import plural = require('./index.js');

describe('plural function', () => {
  it('should handle regex rules correctly', () => {
    const result = plural('cactus', 2);
    expect(result).toBe('cacti');
    const result2 = plural('nucleus', 2);
    expect(result2).toBe('nuclei');
    const result3 = plural('focus', 2);
    expect(result3).toBe('foci');
    const result4 = plural('fungus', 2);
    expect(result4).toBe('fungi');
    expect(plural('cactus', 2)).toBe('cacti'); // This line should pass on the original code
    expect(plural('cactus', 2)).not.toBe('cactuses'); // This line should cause the test to fail on the mutated code
  });
});
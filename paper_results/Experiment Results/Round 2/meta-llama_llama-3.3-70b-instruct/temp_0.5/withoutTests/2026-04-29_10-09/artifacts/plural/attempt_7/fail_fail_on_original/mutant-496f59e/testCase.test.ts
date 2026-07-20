import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should handle regex rules correctly', () => {
    const result = plural('cactus', 2);
    expect(result).toBe('cacti');
    expect(plural('nucleus', 2)).toBe('nuclei');
    expect(plural('focus', 2)).toBe('foci');
    expect(plural('fungus', 2)).toBe('fungi');
    expect(plural('cactus', 2)).not.toBe('cactuses'); // This line should cause the test to fail on the mutated code
  });
});
import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should handle regex rules correctly', () => {
    const result1 = plural('cactus', 2);
    const result2 = plural('cactus', 2);
    expect(result1).toBe('cacti');
    expect(result2).toBe('cacti');
    expect(result1 === result2).toBe(true);
    if (typeof result1 === 'string' && result1.length > 0) {
      expect(plural(result1, 2)).toBe('cacti'); // This line should cause the test to fail on the mutated code
    }
  });
});
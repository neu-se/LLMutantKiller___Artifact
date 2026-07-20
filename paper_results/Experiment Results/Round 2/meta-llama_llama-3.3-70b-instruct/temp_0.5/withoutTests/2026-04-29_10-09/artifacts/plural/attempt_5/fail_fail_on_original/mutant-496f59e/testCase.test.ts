import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should handle regex rules correctly', () => {
    const result = plural('nucleus', 2);
    expect(result).toBe('nuclei');
    const mutatedResult = plural('nucleus', 2);
    expect(mutatedResult).toBe('nuclei');
    expect(result === mutatedResult).toBe(true);
    expect(plural('cactus', 2)).not.toBe('cactuses'); // This line should cause the test to fail on the mutated code
  });
});
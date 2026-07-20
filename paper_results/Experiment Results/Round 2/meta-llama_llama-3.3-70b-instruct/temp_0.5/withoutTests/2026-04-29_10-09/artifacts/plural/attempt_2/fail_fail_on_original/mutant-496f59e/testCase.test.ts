import plural = require("../../../../../../../../../subject_repositories/plural/index.js");

describe('plural function', () => {
  it('should handle regex rules correctly', () => {
    const result1 = plural('cactus', 2);
    const result2 = plural('cactus', 2);
    expect(result1).toBe('cacti');
    expect(result2).toBe('cacti');
  });
});
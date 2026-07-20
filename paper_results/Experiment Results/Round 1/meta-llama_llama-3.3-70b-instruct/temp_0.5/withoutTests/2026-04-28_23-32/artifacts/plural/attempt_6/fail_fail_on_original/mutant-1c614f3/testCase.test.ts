import index = require("../../../../../../../../../subject_repositories/plural/index.js");

describe('plural function', () => {
  it('should handle rules with function results correctly', () => {
    const plural = index;
    const result = plural('cactus', 2);
    expect(result).toBe('cacti');
    expect(plural('cactus', 1)).toBe('cactus');
  });
});
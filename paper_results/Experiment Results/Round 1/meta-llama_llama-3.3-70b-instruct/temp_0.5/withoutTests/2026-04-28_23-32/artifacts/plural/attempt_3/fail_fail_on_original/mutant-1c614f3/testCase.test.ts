import index = require("../../../../../../../../../subject_repositories/plural/index.js");

describe('plural function', () => {
  it('should handle rules with function results correctly', () => {
    expect(index('nucleus', 2)).toBe('nuclei');
    expect(index('nucleus', 1)).toBe('nucleus');
    expect(index('soliloquy', 2)).toBe('soliloquies');
  });
});
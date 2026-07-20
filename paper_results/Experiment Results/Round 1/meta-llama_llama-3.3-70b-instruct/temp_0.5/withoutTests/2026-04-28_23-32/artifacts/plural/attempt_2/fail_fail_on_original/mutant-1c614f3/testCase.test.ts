import plural = require("../../../../../../../../../subject_repositories/plural/index.js");

describe('plural function', () => {
  it('should handle rules with function results correctly', () => {
    expect(plural('nucleus', 2)).toBe('nuclei');
    expect(plural('nucleus', 1)).toBe('nucleus');
    expect(plural('soliloquy', 2)).toBe('soliloquies');
  });
});
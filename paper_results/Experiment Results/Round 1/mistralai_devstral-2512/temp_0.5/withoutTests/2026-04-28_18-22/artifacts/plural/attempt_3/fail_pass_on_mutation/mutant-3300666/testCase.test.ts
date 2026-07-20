import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize the word "soliloquy"', () => {
    expect(plural('soliloquy')).toBe('soliloquies');
  });
});
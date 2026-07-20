import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "quy"', () => {
  it('should correctly pluralize words ending in "quy" in lowercase', () => {
    expect(plural('soliloquy')).toBe('soliloquies');
  });
});
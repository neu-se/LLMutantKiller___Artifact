import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "quy"', () => {
  it('should correctly pluralize words ending in "quy" with case insensitivity', () => {
    expect(plural('SOLILOQUY')).toBe('SOLILOQUies');
  });
});
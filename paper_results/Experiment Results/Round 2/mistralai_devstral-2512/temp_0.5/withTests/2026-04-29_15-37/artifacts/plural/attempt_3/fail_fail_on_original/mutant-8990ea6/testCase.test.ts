import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "quy"', () => {
  it('should correctly pluralize uppercase words ending in "QUY"', () => {
    expect(plural('SOLILOQUY')).toBe('SOLILOQUIES');
  });
});
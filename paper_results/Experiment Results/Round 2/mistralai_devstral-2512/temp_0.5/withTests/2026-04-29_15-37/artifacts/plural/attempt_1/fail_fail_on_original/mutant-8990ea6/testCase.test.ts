import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "quy"', () => {
  it('should correctly pluralize words ending in "quy" regardless of case', () => {
    expect(plural('soliloquy')).toBe('soliloquies');
    expect(plural('Soliloquy')).toBe('Soliloquies');
    expect(plural('SOLILOQUY')).toBe('SOLILOQUIES');
  });
});
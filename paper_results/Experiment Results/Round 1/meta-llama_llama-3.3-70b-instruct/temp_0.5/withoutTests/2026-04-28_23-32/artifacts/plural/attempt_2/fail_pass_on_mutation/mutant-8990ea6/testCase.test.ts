import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that end in "quy"', () => {
    expect(plural('soliloquy', 2)).toBe('soliloquies');
    expect(plural('quy', 2)).toBe('quies');
  });
});
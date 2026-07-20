import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words ending with "quy"', () => {
    expect(plural('soliloquy')).toBe('soliloquies');
    expect(plural('QUY')).toBe('QUIES');
  });
});
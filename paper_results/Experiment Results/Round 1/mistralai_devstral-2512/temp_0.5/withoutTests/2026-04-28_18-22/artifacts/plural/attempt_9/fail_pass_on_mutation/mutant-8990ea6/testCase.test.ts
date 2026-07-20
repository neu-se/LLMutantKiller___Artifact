import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle words ending with "quy" followed by word boundaries', () => {
    expect(plural('soliloquy')).toBe('soliloquies');
    expect(plural('quy')).toBe('quies');
  });
});
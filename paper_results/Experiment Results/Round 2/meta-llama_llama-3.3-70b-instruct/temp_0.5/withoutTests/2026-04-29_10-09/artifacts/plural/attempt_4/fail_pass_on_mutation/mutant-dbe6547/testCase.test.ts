import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should handle the plural form of words ending with "ics" in a case-insensitive manner', () => {
    expect(plural('mathematics', 2)).toBe('mathematics');
    expect(plural('MathematiCs', 2)).toBe('MathematiCs');
  });
});
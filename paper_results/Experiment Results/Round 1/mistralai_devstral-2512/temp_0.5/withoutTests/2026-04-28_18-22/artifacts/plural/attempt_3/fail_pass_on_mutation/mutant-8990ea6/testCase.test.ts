import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words ending with "quy" in mixed case', () => {
    expect(plural('SoLiLoQuY')).toBe('SoLiLoQuies');
  });
});
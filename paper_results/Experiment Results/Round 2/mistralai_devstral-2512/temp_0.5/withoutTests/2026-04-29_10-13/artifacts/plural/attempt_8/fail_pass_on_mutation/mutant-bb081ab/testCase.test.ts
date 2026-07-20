import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle string match rules for words ending with -man', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('man')).toBe('men');
    expect(plural('human')).toBe('humans');
  });
});
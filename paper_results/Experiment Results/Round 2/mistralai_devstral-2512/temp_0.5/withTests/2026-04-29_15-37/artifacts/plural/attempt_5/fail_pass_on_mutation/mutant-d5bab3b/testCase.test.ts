import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle words ending with "man" but not match partial words', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('oman')).toBe('omans');
    expect(plural('man')).toBe('men');
  });
});
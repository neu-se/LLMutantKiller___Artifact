import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle word boundaries for "woman" pattern', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('women')).toBe('women');
    expect(plural('oman')).toBe('omans');
  });
});
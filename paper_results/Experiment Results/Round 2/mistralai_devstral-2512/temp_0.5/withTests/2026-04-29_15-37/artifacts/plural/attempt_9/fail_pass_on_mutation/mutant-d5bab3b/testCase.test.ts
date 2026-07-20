import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle word boundaries in "woman" pattern matching', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('superwoman')).toBe('superwomans');
    expect(plural('oman')).toBe('omans');
  });
});
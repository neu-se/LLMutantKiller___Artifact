import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize "woman" with word boundary matching', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('superwoman')).toBe('superwomen');
    expect(plural('oman')).toBe('omans');
  });
});
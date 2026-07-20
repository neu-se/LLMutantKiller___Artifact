import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle word boundaries for "woman" pluralization', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('superwoman')).toBe('superwomen');
  });
});
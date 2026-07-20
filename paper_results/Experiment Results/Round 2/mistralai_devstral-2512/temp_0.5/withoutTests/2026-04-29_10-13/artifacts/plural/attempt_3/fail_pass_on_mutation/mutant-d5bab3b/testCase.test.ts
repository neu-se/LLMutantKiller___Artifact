import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle words ending with "man" like "woman" and "man"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('man')).toBe('men');
  });
});
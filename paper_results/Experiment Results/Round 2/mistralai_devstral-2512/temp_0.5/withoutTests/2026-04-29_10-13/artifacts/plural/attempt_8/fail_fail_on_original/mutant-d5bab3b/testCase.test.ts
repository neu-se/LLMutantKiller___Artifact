import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle word boundaries for "woman" but not match partial words', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('womens')).toBe('womens');
  });
});
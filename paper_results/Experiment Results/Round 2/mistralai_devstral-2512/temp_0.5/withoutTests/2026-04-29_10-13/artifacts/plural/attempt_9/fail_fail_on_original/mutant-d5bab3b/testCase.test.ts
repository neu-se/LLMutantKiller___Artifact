import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize "woman" but not match "womens" due to word boundary', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('womens')).toBe('womens');
  });
});
import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize "woman" to "women" and not match "womens"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('womens')).toBe('womens');
  });
});
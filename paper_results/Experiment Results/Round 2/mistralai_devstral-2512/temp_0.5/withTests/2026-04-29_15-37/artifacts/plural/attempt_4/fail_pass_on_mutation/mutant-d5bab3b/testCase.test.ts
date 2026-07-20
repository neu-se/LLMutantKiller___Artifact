import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize "woman" but not match "oman"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('oman')).not.toBe('omen');
  });
});
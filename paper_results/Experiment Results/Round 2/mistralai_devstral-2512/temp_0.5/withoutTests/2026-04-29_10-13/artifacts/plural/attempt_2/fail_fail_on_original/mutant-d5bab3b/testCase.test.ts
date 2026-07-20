import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize "woman" but not match partial words like "women"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('women')).toBe('women');
  });
});
import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "y"', () => {
  it('should correctly pluralize words ending in "y" with a consonant before it', () => {
    expect(plural('sky')).toBe('skies');
    expect(plural('baby')).toBe('babies');
    expect(plural('city')).toBe('cities');
    expect(plural('party')).toBe('parties');
    expect(plural('berry')).toBe('berries');
  });
});
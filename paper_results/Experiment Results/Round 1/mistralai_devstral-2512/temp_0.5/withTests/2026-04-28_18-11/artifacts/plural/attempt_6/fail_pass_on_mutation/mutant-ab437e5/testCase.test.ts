import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "y"', () => {
  it('should correctly handle words ending in "y" when not at end of word', () => {
    expect(plural('city')).toBe('cities');
    expect(plural('baby')).toBe('babies');
    expect(plural('puppy')).toBe('puppies');
    expect(plural('party')).toBe('parties');
    expect(plural('library')).toBe('libraries');
  });
});
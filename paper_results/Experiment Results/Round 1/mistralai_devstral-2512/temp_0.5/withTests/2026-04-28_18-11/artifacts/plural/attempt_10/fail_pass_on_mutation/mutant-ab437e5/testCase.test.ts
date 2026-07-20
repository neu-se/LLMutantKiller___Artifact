import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "y"', () => {
  it('should not incorrectly pluralize words ending in "y" when preceded by a vowel', () => {
    expect(plural('day')).toBe('days');
    expect(plural('way')).toBe('ways');
    expect(plural('play')).toBe('plays');
    expect(plural('ray')).toBe('rays');
    expect(plural('bay')).toBe('bays');
  });
});
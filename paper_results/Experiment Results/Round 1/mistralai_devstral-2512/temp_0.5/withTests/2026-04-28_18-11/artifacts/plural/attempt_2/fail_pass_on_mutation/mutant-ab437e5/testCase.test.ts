import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "ay"', () => {
  it('should not pluralize words ending in "ay" to "aies"', () => {
    expect(plural('day')).toBe('days');
    expect(plural('way')).toBe('ways');
    expect(plural('play')).toBe('plays');
    expect(plural('ray')).toBe('rays');
    expect(plural('bay')).toBe('bays');
  });
});
import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that end in a consonant followed by y', () => {
    expect(plural('alloy', 2)).toBe('alloys');
    expect(plural('city', 2)).toBe('cities');
    expect(plural('ay', 2)).toBe('ayies');
  });
});
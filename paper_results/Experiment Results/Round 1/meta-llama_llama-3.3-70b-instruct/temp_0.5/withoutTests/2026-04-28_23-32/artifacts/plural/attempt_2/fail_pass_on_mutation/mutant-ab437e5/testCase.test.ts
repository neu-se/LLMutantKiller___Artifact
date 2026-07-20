import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that end in a consonant followed by y', () => {
    expect(plural('city', 2)).toBe('cities');
    expect(plural('fly', 2)).toBe('flies');
    expect(plural('baby', 2)).toBe('babies');
    expect(plural('soliloquy', 2)).toBe('soliloquies');
    expect(plural('alloy', 2)).toBe('alloys');
  });
});
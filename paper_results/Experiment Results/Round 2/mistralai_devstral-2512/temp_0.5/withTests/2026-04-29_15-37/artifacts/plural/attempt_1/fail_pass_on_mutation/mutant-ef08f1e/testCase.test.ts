import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior with words ending in "o"', () => {
  it('should correctly pluralize words ending in "o" with a vowel before it', () => {
    expect(plural('stereo')).toBe('stereos');
    expect(plural('radio')).toBe('radios');
    expect(plural('portfolio')).toBe('portfolios');
  });
});
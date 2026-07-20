import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words ending with a vowel followed by "o" when followed by other letters', () => {
    expect(plural('portfolio')).toBe('portfolios');
  });
});
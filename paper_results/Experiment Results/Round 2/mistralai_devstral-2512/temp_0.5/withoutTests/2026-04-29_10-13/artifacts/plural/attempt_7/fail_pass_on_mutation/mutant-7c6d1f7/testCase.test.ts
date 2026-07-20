import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words ending with vowel + "o" by adding "s" not "es"', () => {
    expect(plural('studio', 2)).toBe('studios');
    expect(plural('portfolio', 2)).toBe('portfolios');
  });
});
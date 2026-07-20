import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should add "s" to words ending with vowel + "o" and not "es"', () => {
    expect(plural('kangaroo', 2)).toBe('kangaroos');
    expect(plural('portfolio', 2)).toBe('portfolios');
    expect(plural('bamboo', 2)).toBe('bamboos');
  });
});
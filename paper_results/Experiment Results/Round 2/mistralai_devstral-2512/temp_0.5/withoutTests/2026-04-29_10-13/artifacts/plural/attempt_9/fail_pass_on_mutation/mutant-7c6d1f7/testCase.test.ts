import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle words ending with "o" after a vowel by adding "s"', () => {
    expect(plural('bamboo', 2)).toBe('bamboos');
    expect(plural('radio', 2)).toBe('radios');
    expect(plural('studio', 2)).toBe('studios');
  });
});
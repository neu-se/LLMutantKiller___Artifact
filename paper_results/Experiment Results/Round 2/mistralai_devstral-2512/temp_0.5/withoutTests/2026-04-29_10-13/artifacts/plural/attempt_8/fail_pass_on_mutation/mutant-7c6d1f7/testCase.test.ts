import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should add "s" to words ending with vowel + "o" and "es" to words ending with consonant + "o"', () => {
    expect(plural('kangaroo', 2)).toBe('kangaroos');
    expect(plural('hero', 2)).toBe('heroes');
  });
});
import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "y"', () => {
  it('should correctly handle words ending in "y" with a vowel before it', () => {
    expect(plural('monkey')).toBe('monkeys');
    expect(plural('day')).toBe('days');
    expect(plural('boy')).toBe('boys');
    expect(plural('way')).toBe('ways');
    expect(plural('toy')).toBe('toys');
  });
});
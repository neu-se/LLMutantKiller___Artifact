import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "y"', () => {
  it('should not incorrectly pluralize words ending in "y" when preceded by a vowel', () => {
    expect(plural('monkey')).toBe('monkeys');
    expect(plural('valley')).toBe('valleys');
    expect(plural('turkey')).toBe('turkeys');
    expect(plural('donkey')).toBe('donkeys');
    expect(plural('hockey')).toBe('hockeys');
  });
});
import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle words ending with vowel + "o" versus consonant + "o"', () => {
    expect(plural('radio', 2)).toBe('radios');
    expect(plural('potato', 2)).toBe('potatoes');
  });
});
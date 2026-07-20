import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should handle the plural form of words ending with "ics" in a case-insensitive manner', () => {
    const word = 'IcS';
    const lowerCaseWord = word.toLowerCase();
    expect(plural(word, 2)).toBe(plural(lowerCaseWord, 2));
  });
});
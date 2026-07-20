import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly apply the first rule for words ending with "y" preceded by consonant', () => {
    const testCases = [
      { input: 'cherry', expected: 'cherries' },
      { input: 'baby', expected: 'babies' },
      { input: 'city', expected: 'cities' }
    ];

    testCases.forEach(({ input, expected }) => {
      expect(plural(input)).toBe(expected);
    });
  });
});
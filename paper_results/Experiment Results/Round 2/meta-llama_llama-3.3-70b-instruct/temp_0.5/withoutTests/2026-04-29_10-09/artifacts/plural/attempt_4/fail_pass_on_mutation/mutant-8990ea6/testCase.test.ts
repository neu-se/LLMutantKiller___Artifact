import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should handle words that end with quy correctly', () => {
    const word = 'qu';
    const expectedPlural = 'quies';
    expect(plural(word + 'y')).toBe(expectedPlural);
  });
});
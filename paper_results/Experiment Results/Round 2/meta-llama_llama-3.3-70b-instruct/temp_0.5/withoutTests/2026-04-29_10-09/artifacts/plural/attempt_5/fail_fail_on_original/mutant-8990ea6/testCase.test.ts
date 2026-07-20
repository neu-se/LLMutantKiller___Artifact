import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should handle words that end with quy correctly', () => {
    const word = 'quy';
    const expectedPlural = 'quys';
    expect(plural(word)).toBe(expectedPlural);
  });
});
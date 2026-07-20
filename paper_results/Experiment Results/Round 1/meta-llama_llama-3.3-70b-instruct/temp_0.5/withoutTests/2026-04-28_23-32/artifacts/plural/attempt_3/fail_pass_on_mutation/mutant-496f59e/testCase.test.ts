import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle rules with functions', () => {
    const testWord = 'fairy';
    expect(plural(testWord, 2)).toBe('fairies');
    expect(plural(testWord, 1)).toBe(testWord);
  });
});
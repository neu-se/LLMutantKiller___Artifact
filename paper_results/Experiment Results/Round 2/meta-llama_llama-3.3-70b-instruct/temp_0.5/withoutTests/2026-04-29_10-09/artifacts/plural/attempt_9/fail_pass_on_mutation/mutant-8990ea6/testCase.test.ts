import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should handle words that end with quy correctly', () => {
    const testWord = 'quy';
    const testWordWithoutY = 'qu';
    expect(plural(testWordWithoutY + 'y')).not.toBe(plural(testWordWithoutY));
  });
});
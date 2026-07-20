import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that end with specific suffixes', () => {
    const miscWords = ['alm', 'fece', 'bowel', 'sud', 'entrail', 'electronic', 'outskirt', 'odd', 'tropic', 'riche', 'surrounding', 'thank', 'heroic', 'remain', 'amend'];
    for (const word of miscWords) {
      expect(plural(word)).toBe(word + 's'); 
    }
    expect(plural('')).not.toBe(''); // This test should pass on the original code and fail on the mutated code because the mutated code has an empty string in the misc array
  });
});
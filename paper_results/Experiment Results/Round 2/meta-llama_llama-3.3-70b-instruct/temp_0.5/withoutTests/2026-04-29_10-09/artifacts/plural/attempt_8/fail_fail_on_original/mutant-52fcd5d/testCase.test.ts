import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for words in the misc list', () => {
    const miscWords = ['tropic', 'electronic', 'outskirt', 'odd'];
    miscWords.forEach((word) => {
      expect(plural(word, 2)).not.toBe(word + 's');
    });
  });
});
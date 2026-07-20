import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for words in the misc list', () => {
    const miscWords = ['tropic', 'electronic', 'outskirt', 'odd', 'tropic'];
    expect(miscWords.includes('tropic')).toBe(true);
    expect(miscWords.includes('electronic')).toBe(true);
    expect(miscWords.includes('outskirt')).toBe(true);
    expect(miscWords.includes('odd')).toBe(true);
    expect(plural('tropic', 2)).toBe('tropics');
  });
});
import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should handle the word with an empty string in the misc array correctly', () => {
    expect(plural('tropic', 2)).toBe('tropics');
    expect(plural('', 2)).toBe('s');
    expect(plural('odd', 2)).toBe('odds');
    expect(plural('tropic', 1)).toBe('tropic');
    expect(plural('', 1)).toBe('');
  });
});
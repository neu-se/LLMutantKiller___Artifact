import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should handle words with rules correctly', () => {
    const word = 'woman';
    expect(plural(word, 2)).toBe('women');
    expect(plural(word, 1)).toBe(word);
  });
});
import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should handle words with rules correctly', () => {
    expect(plural('woman', 1)).toBe('woman');
    expect(plural('woman', 2)).toBe('women');
  });
});
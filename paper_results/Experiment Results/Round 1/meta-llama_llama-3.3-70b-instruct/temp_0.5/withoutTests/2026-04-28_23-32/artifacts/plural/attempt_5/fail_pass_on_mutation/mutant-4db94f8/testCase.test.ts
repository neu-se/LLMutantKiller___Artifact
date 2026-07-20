import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should handle words with rules correctly', () => {
    expect(plural('woman', 2)).toBe('women');
    expect(plural('man', 2)).toBe('men');
  });
});
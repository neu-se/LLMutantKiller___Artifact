import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should handle words with rules correctly', () => {
    expect(plural('criterion', 'hello')).toBe('criteria');
  });
});
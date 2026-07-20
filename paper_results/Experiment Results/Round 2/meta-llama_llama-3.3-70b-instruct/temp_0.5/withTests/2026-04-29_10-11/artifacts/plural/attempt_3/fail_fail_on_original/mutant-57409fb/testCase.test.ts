import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should return the singular form when the input count is undefined', () => {
    expect(plural('test')).toBe('test');
  });
});
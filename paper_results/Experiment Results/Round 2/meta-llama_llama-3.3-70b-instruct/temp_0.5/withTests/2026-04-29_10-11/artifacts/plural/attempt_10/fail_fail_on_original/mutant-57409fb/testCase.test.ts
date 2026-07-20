import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should return the singular form when the input count is 1 and not pluralize when count is undefined', () => {
    expect(plural('test', 1)).toBe('test');
    expect(plural('test')).not.toBe('tests');
  });
});
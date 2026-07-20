import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should return the singular form when the input count is 1 and the plural form when count is greater than 1', () => {
    expect(plural('test', 1)).toBe('test');
    expect(plural('test', 2)).toBe('tests');
  });
});
import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should return the singular form when the input count is 1 and return the same form when the count is not 1 or undefined', () => {
    expect(plural('test', 1)).toBe('test');
    expect(plural('test', null)).toBe('tests');
  });
});
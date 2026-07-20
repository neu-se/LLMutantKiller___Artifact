import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should return the plural form when the input count is not 1', () => {
    expect(plural('test', 2)).toBe('tests');
  });
});
import { plural } from '../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should handle string rule correctly', () => {
    plural.addRule('test', 'tests');
    expect(plural('test')).toBe('tests');
  });
});
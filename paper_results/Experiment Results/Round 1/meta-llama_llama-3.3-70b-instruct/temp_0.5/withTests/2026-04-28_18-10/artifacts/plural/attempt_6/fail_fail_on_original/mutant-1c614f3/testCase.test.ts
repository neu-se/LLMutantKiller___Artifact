import { plural } from '../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should handle string rule correctly', () => {
    expect(plural('criterion')).toBe('criteria');
    plural.addRule('criterion', function(w) { return 'criterions'; });
    expect(plural('criterion')).toBe('criterions');
  });
});
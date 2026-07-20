import { plural } from '../../index';

describe('plural function', () => {
  it('should handle string rule correctly', () => {
    expect(plural('criterion')).toBe('criteria');
    plural.addRule('criterion', function(w: string) { return 'criterions'; });
    expect(plural('criterion')).toBe('criterions');
  });
});
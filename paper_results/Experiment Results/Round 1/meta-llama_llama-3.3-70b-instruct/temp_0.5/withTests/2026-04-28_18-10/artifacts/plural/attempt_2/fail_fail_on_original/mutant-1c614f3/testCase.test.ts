import { plural } from '../index';

describe('plural function', () => {
  it('should handle string rule correctly', () => {
    plural.addRule('criterion', function(w) { return w; });
    expect(plural('criterion')).toBe('criterion');
    plural.addRule('criterion', 'criteria');
    expect(plural('criterion')).toBe('criteria');
  });
});
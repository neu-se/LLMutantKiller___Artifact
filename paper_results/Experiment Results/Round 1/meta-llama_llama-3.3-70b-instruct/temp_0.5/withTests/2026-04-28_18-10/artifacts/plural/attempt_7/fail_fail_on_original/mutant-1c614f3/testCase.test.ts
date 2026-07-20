import { plural } from '../../../index';

describe('plural function', () => {
  it('should handle string rule correctly', () => {
    expect(plural('criterion')).toBe('criteria');
    plural.addRule('criterion', 'criterions');
    expect(plural('criterion')).toBe('criterions');
  });
});
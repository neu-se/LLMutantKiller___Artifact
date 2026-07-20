import { plural } from '../../../index';

describe('plural function', () => {
  it('should handle string rule correctly', () => {
    plural.addRule('criterion', 'criteria');
    expect(plural('criterion')).toBe('criteria');
    expect(plural('criteria')).toBe('criteria');
  });
});
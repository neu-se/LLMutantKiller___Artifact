import { plural } from '../../../index';

describe('plural function', () => {
  it('should handle string rule correctly', () => {
    expect(plural('criterion')).toBe('criteria');
    expect(() => plural.addRule('criterion', '')).toThrowError();
  });
});
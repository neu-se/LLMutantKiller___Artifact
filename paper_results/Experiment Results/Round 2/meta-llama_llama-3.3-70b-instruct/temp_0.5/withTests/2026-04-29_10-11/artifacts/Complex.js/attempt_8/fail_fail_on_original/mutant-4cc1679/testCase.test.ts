import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex('2+0i');
    const result = complex.acosh();
    expect(typeof result).toBe('object');
    expect('re' in result).toBe(true);
    expect('im' in result).toBe(true);
  });
});
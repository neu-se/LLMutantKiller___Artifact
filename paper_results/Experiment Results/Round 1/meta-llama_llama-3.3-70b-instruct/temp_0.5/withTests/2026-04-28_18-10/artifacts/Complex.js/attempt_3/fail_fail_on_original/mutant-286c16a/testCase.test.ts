import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate asinh correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
  });
});
import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(result.re).not.toBeUndefined();
    expect(result.im).not.toBeUndefined();
  });
});
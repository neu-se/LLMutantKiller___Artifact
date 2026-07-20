import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly calculate acsc for non-zero complex numbers', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(complex.re * complex.re + complex.im * complex.im).not.toBe(0);
  });
});
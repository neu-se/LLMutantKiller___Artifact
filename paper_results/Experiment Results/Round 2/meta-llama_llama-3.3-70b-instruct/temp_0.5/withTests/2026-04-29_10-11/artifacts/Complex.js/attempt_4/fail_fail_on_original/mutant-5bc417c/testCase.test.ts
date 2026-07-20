import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const complex2 = new Complex(0, 0);
    expect(complex2.acoth().re).toBe(complex2.re / (complex2.re * complex2.re + complex2.im * complex2.im));
    expect(complex2.acoth().im).toBe(-complex2.im / (complex2.re * complex2.re + complex2.im * complex2.im));
  });
});
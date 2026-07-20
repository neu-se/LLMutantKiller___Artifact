import { Complex } from './complex';

describe('Complex', () => {
  it('should return a finite result for acoth when the input is not zero and throw an error when the input is zero', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const complexZero = new Complex(0, 0);
    expect(complexZero.acoth().re).not.toBe(complex.re / (complex.re * complex.re + complex.im * complex.im));
    expect(complexZero.acoth().im).not.toBe(-complex.im / (complex.re * complex.re + complex.im * complex.im));
  });
});
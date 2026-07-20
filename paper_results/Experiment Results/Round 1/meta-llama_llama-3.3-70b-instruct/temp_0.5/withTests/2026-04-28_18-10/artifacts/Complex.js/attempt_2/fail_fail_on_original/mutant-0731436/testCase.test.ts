import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    const originalResult = new Complex(
      (complex.re !== 0) ? complex.re / (complex.re * complex.re + complex.im * complex.im) : 0,
      (complex.im !== 0) ? -complex.im / (complex.re * complex.re + complex.im * complex.im) : 0).acos();
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});
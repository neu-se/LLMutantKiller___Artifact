import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const denominator = 0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re);
    expect(denominator).toBeCloseTo(result.re * complex.re - result.im * complex.im, 10);
  });
});
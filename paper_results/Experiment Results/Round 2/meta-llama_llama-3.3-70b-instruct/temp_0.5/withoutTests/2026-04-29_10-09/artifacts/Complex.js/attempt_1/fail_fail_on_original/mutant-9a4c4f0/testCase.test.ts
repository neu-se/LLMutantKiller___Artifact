import { Complex } from '../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate expm1 correctly', () => {
    const complex = new Complex(0.1, 0.1);
    const result = complex.expm1();
    expect(result.re).toBeCloseTo(Math.expm1(0.1) * Math.cos(0.1) + Math.cos(0.1) - 1, 1e-10);
    expect(result.im).toBeCloseTo(Math.exp(0.1) * Math.sin(0.1), 1e-10);
  });
});
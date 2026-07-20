import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(complex.re / (complex.re * complex.re + complex.im * complex.im), 10);
    expect(result.im).toBeCloseTo(-complex.im / (complex.re * complex.re + complex.im * complex.im), 10);
  });
});
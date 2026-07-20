import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return the correct value for csc', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(complex.sin(a).cos(a) * cosh(b) / d, 10);
    expect(result.im).toBeCloseTo(-Math.sin(a) * sinh(b) / d, 10);
  });
});
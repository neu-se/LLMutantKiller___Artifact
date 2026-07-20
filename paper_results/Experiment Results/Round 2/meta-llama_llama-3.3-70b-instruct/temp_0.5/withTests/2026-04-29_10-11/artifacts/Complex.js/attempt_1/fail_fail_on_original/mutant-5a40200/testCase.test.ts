import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1e-10);
    const coshValue = complex.cosh();
    expect(coshValue.re).toBeCloseTo(1.00000000005);
    expect(coshValue.im).toBeCloseTo(0);
  });
});
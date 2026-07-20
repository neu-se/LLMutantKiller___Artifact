import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly handle Math.cosh when it is defined', () => {
    const originalCosh = Math.cosh;
    Math.cosh = () => 1;
    const complex = new Complex(0, 1);
    const coshValue = complex.cosh();
    expect(coshValue.re).toBeCloseTo(1);
    expect(coshValue.im).toBeCloseTo(0);
    Math.cosh = originalCosh;
  });
});
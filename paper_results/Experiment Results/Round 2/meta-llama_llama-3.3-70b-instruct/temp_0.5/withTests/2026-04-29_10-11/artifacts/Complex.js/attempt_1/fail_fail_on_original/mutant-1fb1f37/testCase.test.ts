import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1, 0);
    const coshValue = complex.cosh();
    expect(coshValue.re).toBeCloseTo(Math.cosh(1));
    expect(coshValue.im).toBeCloseTo(0);
  });
});
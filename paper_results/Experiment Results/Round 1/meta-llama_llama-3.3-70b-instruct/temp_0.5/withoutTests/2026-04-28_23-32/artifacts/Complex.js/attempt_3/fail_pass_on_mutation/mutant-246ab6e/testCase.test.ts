import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly for a complex number with negative imaginary part', () => {
    const complex = new Complex(0, -1);
    const coshValue = complex.cosh();
    const expectedReal = Math.cos(-1);
    const expectedImaginary = Math.sin(-1) * Math.sinh(0);
    expect(coshValue.re).toBeCloseTo(expectedReal);
    expect(coshValue.im).toBeCloseTo(expectedImaginary);
  });
});
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly for a complex number with a large negative real part', () => {
    const complex = new Complex(-100, 0);
    const coshValue = complex.cosh();
    const expectedReal = Math.cosh(-100);
    const expectedImaginary = 0;
    expect(coshValue.re).toBeCloseTo(expectedReal);
    expect(coshValue.im).toBeCloseTo(expectedImaginary);
  });
});
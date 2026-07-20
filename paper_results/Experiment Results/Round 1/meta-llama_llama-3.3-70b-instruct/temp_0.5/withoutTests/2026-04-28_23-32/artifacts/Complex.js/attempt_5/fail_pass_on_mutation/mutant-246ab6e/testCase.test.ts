import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly for a complex number with a negative real part and a non-zero imaginary part', () => {
    const complex = new Complex(-1, 1);
    const coshValue = complex.cosh();
    const expectedReal = Math.cosh(-1) * Math.cos(1);
    const expectedImaginary = Math.sinh(-1) * Math.sin(1);
    expect(coshValue.re).toBeCloseTo(expectedReal);
    expect(coshValue.im).toBeCloseTo(expectedImaginary);
  });
});
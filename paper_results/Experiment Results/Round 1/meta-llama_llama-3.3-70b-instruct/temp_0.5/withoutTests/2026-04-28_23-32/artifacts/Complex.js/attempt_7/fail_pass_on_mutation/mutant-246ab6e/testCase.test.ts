import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly for a complex number with a negative real part and a non-zero imaginary part, and check the symmetry of the hyperbolic cosine function', () => {
    const complex1 = new Complex(-1, 1);
    const complex2 = new Complex(-1, -1);
    const coshValue1 = complex1.cosh();
    const coshValue2 = complex2.cosh();
    expect(coshValue1.re).toBeCloseTo(coshValue2.re);
    expect(coshValue1.im).toBeCloseTo(-coshValue2.im);
  });
});
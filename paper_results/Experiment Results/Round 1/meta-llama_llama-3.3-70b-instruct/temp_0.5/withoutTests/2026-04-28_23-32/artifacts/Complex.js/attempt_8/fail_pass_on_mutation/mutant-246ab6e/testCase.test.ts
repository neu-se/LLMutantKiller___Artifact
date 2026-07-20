import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly for a complex number with a large negative real part', () => {
    const complex1 = new Complex(-1000, 0);
    const complex2 = new Complex(1000, 0);
    const coshValue1 = complex1.cosh();
    const coshValue2 = complex2.cosh();
    expect(coshValue1.re).toBeCloseTo(coshValue2.re);
  });
});
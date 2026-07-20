import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1, 0);
    const coshValue = complex.cosh();
    expect(coshValue.re).toBeCloseTo(Math.cosh(1));
    expect(coshValue.im).toBeCloseTo(0);

    const complex2 = new Complex(0, 1);
    const coshValue2 = complex2.cosh();
    expect(coshValue2.re).toBeCloseTo(Math.cos(1));
    expect(coshValue2.im).toBeCloseTo(0);
  });
});
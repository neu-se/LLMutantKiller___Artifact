import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh for values around the threshold', () => {
    const complex1 = new Complex(1e-9 - 1e-20, 0);
    const complex2 = new Complex(1e-9 + 1e-20, 0);
    const coshValue1 = complex1.cosh();
    const coshValue2 = complex2.cosh();
    expect(coshValue1.re).toBeCloseTo(coshValue2.re, 15);
    expect(coshValue1.im).toBeCloseTo(coshValue2.im, 15);
  });
});
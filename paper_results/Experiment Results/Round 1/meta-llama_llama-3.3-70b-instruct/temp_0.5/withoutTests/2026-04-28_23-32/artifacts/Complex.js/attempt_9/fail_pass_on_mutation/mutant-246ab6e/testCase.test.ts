import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly for a complex number with a large negative real part and compare with the result of exp', () => {
    const complex = new Complex(-1000, 0);
    const coshValue = complex.cosh();
    const expValue1 = Math.exp(-1000);
    const expValue2 = Math.exp(1000);
    expect(coshValue.re).toBeCloseTo((expValue1 + expValue2) / 2);
  });
});
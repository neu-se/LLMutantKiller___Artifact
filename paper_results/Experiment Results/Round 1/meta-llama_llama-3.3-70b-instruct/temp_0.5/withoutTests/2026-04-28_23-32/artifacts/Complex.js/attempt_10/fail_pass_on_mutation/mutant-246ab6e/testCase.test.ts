import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly for a complex number with a negative real part and compare the result with the sum of exp and exp(-x)', () => {
    const complex = new Complex(-1, 0);
    const coshValue = complex.cosh();
    const expValue1 = Math.exp(-1);
    const expValue2 = Math.exp(1);
    expect(coshValue.re).toBeCloseTo((expValue2 + expValue1) / 2);
  });
});
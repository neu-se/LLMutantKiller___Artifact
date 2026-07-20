import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1.00001e-9, 0);
    const coshValue = complex.cosh().re;
    const complex2 = new Complex(0.99999e-9, 0);
    const coshValue2 = complex2.cosh().re;
    expect(coshValue).not.toBe(coshValue2);
  });
});
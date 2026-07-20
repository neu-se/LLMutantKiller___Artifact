import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1.00001e-9, 0);
    const coshValue = complex.cosh().re;
    expect(coshValue).toBeCloseTo(1, 10);
    const complex2 = new Complex(1e-9, 0);
    const coshValue2 = complex2.cosh().re;
    expect(coshValue).not.toBe(coshValue2);
  });
});
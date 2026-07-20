import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1e-10, 0);
    const coshValue = complex.cosh().re;
    expect(coshValue).not.toBe((Math.exp(1e-10) + Math.exp(-1e-10)) / 2);
  });
});
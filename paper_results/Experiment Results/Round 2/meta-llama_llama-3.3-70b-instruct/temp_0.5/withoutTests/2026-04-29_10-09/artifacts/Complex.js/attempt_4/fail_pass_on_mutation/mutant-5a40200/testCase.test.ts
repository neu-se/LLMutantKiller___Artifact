import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh for small values', () => {
    const complex = new Complex(1e-8, 0);
    const coshValue = complex.cosh();
    expect(coshValue.re).toBeCloseTo((Math.exp(1e-8) + Math.exp(-1e-8)) * 0.5, 15);
    expect(coshValue.im).toBeCloseTo(0, 15);
  });
});
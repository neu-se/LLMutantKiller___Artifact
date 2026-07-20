import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh for small values', () => {
    const x = 1e-10;
    const coshValue = Math.cosh(x);
    const calculatedValue = (Math.exp(x) + Math.exp(-x)) * 0.5;
    expect(coshValue).toBeCloseTo(calculatedValue);
    expect(cosh(x)).toBeCloseTo(calculatedValue);
  });
});
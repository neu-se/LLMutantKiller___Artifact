import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the correct cosm1(x) for small x', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.expm1().re;
    const manualCalculation = Math.expm1(x) - Math.exp(x) + 1;
    expect(Math.abs(result - manualCalculation) < 1e-15).toBe(true);
  });
});
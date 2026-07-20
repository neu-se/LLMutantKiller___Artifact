import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the correct cosm1(x) for small x', () => {
    const x = 0.0001;
    const complex = new Complex(x);
    const result = complex.expm1().re;
    const expected = Math.expm1(x);
    const manualCalculation = Math.cos(x) - 1;
    expect(Math.abs(result - manualCalculation) < 1e-15).toBe(true);
  });
});
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1e-10);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo((Math.exp(1e-10) + Math.exp(-1e-10)) / 2, 10);
    expect(result.re).not.toBeCloseTo(1 - 1e-10, 10);
  });
});
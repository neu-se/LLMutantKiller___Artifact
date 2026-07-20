import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle small values in cosh calculation', () => {
    const x = 1e-10;
    const complex = new Complex(x, 0);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo(1 + x * x / 2);
  });
});
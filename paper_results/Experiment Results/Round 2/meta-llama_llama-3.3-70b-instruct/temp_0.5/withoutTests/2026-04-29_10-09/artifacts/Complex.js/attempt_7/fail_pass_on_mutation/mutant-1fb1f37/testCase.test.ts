import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh', () => {
    const complex = new Complex(1e-10, 0);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo(1 + (1e-10) * (1e-10) / 2);
  });
});
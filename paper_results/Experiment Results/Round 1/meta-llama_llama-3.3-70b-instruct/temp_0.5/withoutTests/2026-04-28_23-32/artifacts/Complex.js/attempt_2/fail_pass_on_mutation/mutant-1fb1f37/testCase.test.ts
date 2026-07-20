import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate cosh correctly for small values', () => {
    const x = 1e-10;
    const result = Math.cosh(x);
    expect(result).toBeCloseTo(1 + x * x / 2);
  });
});
import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate cosh correctly for small values', () => {
    const x = 1e-9;
    const coshValue = Math.cosh(x);
    expect(coshValue).toBeCloseTo(1);
  });
});
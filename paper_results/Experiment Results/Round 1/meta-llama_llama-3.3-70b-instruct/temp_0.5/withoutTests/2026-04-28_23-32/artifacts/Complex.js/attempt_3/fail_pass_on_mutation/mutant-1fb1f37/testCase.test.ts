import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate cosh correctly for small values using the Complex class', () => {
    const x = new Complex(1e-10, 0);
    const result = x.cosh();
    expect(result.re).toBeCloseTo(1 + (1e-10) * (1e-10) / 2);
    expect(result.im).toBeCloseTo(0);
  });
});
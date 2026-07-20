import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly for a small negative input', () => {
    const complex = new Complex(-1e-10, 0);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo(1.0);
    expect(result.im).toBeCloseTo(0.0);
  });
});
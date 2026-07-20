import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for a small input', () => {
    const complex = new Complex(0.01);
    const result = complex.expm1();
    expect(result.re).toBeCloseTo(Math.exp(0.01) - 1, 6);
    expect(result.im).toBeCloseTo(0, 6);
  });
});
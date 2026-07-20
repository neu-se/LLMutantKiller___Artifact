import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for a very small input', () => {
    const complex = new Complex(1e-9);
    const result = complex.expm1();
    expect(result.re).toBeCloseTo(complex.re, 10);
    expect(result.im).toBeCloseTo(complex.im, 10);
  });
});
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for a small input', () => {
    const complex = new Complex(0.0001);
    const result = complex.expm1();
    const expected = complex.exp().sub(1);
    expect(result.re).toBeCloseTo(expected.re, 6);
    expect(result.im).toBeCloseTo(expected.im, 6);
  });
});
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for small values', () => {
    const complex = new Complex(0.00001, 0);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(0.00001), 0);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});
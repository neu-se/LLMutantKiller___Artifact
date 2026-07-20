import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for small values', () => {
    const complex = new Complex(Math.PI / 4, 0);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(Math.PI / 4), 0);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});
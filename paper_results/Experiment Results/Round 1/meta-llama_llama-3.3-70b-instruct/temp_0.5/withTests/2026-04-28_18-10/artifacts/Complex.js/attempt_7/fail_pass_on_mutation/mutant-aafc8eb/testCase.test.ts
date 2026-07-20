import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for small values with precise comparison', () => {
    const x = 0.000001;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = complex.exp().sub(1);
    expect(result.re).toBeCloseTo(expected.re, 15);
    expect(result.im).toBeCloseTo(expected.im, 15);
  });
});
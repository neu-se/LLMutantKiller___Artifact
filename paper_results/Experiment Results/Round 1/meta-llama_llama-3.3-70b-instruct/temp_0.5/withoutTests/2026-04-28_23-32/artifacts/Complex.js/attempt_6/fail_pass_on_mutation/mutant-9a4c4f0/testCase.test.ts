import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for expm1 function with small input', () => {
    const complex = new Complex(1e-12, 0);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(1e-12), 0);
    expect(result.re).toBeCloseTo(expected.re, 15);
    expect(result.im).toBeCloseTo(expected.im, 15);
  });
});
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    const expected = new Complex(0.45227844715119064, -0.45227844715119064);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});
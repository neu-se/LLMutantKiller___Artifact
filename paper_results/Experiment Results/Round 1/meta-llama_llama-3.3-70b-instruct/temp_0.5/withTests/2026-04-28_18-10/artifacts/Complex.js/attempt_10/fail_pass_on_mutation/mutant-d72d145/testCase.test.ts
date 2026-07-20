import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(2, 2);
    const result = complex.acsc();
    const expectedRe = result.re;
    const expectedIm = result.im;
    const complex2 = new Complex(2, 2);
    const result2 = complex2.acsc();
    expect(result2.re).toBeCloseTo(expectedRe, 10);
    expect(result2.im).toBeCloseTo(expectedIm, 10);
  });
});
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for acsch when b is not zero', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    const complex2 = new Complex(0, -1);
    const result2 = complex2.acsch();
    expect(result.re).toBeCloseTo(result2.re, 10);
    expect(result.im).toBeCloseTo(-result2.im, 10);
  });
});
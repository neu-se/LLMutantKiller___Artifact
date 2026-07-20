import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for acsch method with non-zero denominator', () => {
    const complex = new Complex(1, 1);
    const result1 = complex.acsch();
    const complex2 = new Complex(0, 1);
    const result2 = complex2.acsch();
    expect(result1.re).not.toBeCloseTo(result2.re);
  });
});
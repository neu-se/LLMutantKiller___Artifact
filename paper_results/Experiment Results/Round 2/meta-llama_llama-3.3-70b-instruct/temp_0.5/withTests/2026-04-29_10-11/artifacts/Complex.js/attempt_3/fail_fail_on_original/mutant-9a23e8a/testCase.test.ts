import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch function', () => {
    const complex = new Complex(2, 0);
    const result = complex.acsch();
    const originalResult = Math.log(2 + Math.sqrt(2 * 2 + 1));
    expect(result.re).toBeCloseTo(originalResult, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for logHypot function', () => {
    const complex = new Complex(1e308, 1e308);
    const result = complex.log();
    const expectedRe = Math.log(Math.sqrt(2 * (1e308 * 1e308)));
    const expectedIm = Math.atan2(1e308, 1e308);
    expect(result.re).toBeCloseTo(expectedRe, 0);
    expect(result.im).toBeCloseTo(expectedIm, 0);
  });
});
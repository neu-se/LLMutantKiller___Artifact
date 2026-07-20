import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation', () => {
  it('should compute log correctly for a complex number with positive real and non-zero imaginary parts', () => {
    // log(3 + 4i) = log(5) + i*atan2(4,3)
    const z = new Complex(3, 4);
    const result = z.log();
    const expectedRe = Math.log(5);
    const expectedIm = Math.atan2(4, 3);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});
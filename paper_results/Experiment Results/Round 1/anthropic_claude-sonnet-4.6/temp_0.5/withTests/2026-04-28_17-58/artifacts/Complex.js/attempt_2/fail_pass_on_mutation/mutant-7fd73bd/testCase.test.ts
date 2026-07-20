import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation detection', () => {
  it('should correctly compute log of a complex number with negative real part and positive imaginary part', () => {
    const result = new Complex(-1, 1).log();
    const expectedRe = Math.log(Math.sqrt(2));
    const expectedIm = 3 * Math.PI / 4;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});
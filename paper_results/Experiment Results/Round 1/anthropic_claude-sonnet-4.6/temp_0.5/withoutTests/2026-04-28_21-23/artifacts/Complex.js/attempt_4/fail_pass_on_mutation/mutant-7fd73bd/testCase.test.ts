import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation detection', () => {
  it('should correctly compute asin of a real number greater than 1', () => {
    // asin(2) uses log internally
    const z = new Complex(2, 0);
    const result = z.asin();
    // asin(2) = pi/2 - i*log(2 + sqrt(3)) = pi/2 - i*acosh(2)
    const expectedRe = Math.PI / 2;
    const expectedIm = -Math.log(2 + Math.sqrt(3));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});
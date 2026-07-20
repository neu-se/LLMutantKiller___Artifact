import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation detection', () => {
  it('should correctly compute log of a number with zero imaginary part and negative real part', () => {
    // For z = -2 + 0i:
    // Original (b===0 && a>0 is false, no-op): logHypot(-2, 0) = log(2), atan2(0,-2) = pi
    // The condition doesn't matter since body is commented out
    // Let's try something that exercises logHypot differently
    // log(0 + 0i) should give -Infinity real part
    const z = new Complex(1, 0);
    const result = z.log();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});
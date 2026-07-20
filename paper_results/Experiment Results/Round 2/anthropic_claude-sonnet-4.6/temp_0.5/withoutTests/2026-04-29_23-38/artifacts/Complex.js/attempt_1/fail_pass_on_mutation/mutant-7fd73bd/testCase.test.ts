import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation test', () => {
  it('should correctly compute log of a complex number with positive real part and non-zero imaginary part', () => {
    // For z = 1 + 1i, log(z) = log(sqrt(2)) + i*pi/4
    const z = new Complex(1, 1);
    const result = z.log();
    expect(result.re).toBeCloseTo(Math.log(Math.sqrt(2)), 10);
    expect(result.im).toBeCloseTo(Math.PI / 4, 10);
  });
});
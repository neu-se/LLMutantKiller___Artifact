import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log function', () => {
  it('should correctly compute log of a complex number with negative real part and zero imaginary part', () => {
    // For z = -1 + 0i, log(z) = log(1) + i*pi = 0 + i*pi
    const z = new Complex(-1, 0);
    const result = z.log();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});
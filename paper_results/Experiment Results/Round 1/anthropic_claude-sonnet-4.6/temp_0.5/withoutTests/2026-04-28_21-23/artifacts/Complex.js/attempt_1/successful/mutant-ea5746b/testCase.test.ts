import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 Taylor series in expm1", () => {
  it("should correctly compute expm1 for a complex number with small imaginary part", () => {
    // expm1(0 + 0.5i) = cos(0.5) - 1 + i*sin(0.5)
    // The real part uses cosm1(0.5) which uses the Taylor series for |x| <= pi/4
    // The mutation changes + 1/479001600 to - 1/479001600 in the polynomial
    const z = new Complex(0, 0.5);
    const result = z.expm1();
    
    // cos(0.5) - 1 = -0.12241743...
    const expectedRe = Math.cos(0.5) - 1;
    // sin(0.5) = 0.47942553...
    const expectedIm = Math.sin(0.5);
    
    // The mutation introduces an error of approximately 2 * (0.25)^3 / 479001600 ≈ 6.5e-11
    // which is larger than the EPSILON of 1e-15 but we need to check with sufficient precision
    expect(result.re).toBeCloseTo(expectedRe, 12);
    expect(result.im).toBeCloseTo(expectedIm, 12);
  });
});
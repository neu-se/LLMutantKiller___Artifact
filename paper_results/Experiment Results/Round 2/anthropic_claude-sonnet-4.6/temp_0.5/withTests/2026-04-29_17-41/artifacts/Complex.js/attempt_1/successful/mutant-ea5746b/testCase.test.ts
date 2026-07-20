import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 Taylor series in expm1", () => {
  it("should compute expm1 accurately for small imaginary values using correct Taylor series coefficients", () => {
    // expm1(0 + i*b) real part = cos(b) - 1 = cosm1(b)
    // The mutation changes + 1/479001600 to - 1/479001600 in the Taylor series
    // Use b = pi/4 which is within the Taylor series range (|b| <= pi/4)
    // and compare against the reference value Math.cos(b) - 1
    const b = Math.PI / 4;
    const c = new Complex(0, b);
    const result = c.expm1();
    
    // The real part should equal cos(b) - 1
    const expected = Math.cos(b) - 1;
    
    // The mutation introduces an error of about 2 * (xx^3/479001600) * xx
    // For b = pi/4, xx = (pi/4)^2 ≈ 0.617, error ≈ 2 * 0.617^3 / 479001600 ≈ 9.8e-10
    // Use tolerance tighter than the mutation error but looser than floating point noise
    expect(Math.abs(result.re - expected)).toBeLessThan(1e-12);
  });
});
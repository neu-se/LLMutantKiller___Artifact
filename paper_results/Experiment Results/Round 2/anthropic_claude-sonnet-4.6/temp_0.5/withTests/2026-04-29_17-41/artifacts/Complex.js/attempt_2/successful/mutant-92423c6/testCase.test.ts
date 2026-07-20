import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("expm1 cosm1 Taylor series sign", () => {
  it("should compute expm1(i*0.5) with correct real part matching cos(0.5)-1", () => {
    // For Complex(0, 0.5).expm1():
    // re = expm1(0)*cos(0.5) + cosm1(0.5) = 0 + (cos(0.5) - 1)
    // The mutation changes +1/40320 to -1/40320 in cosm1's Taylor series
    // With x=0.5, xx=0.25, the affected term is xx*xx*xx*xx/40320 = 0.25^4/40320
    // Error = 2 * (0.25^4 / 40320) ≈ 1.93e-8, well above floating point noise
    const result = new Complex(0, 0.5).expm1();
    const expected = Math.cos(0.5) - 1;
    // Use exact equality check within a tight tolerance that catches the ~1.93e-8 error
    expect(Math.abs(result.re - expected)).toBeLessThan(1e-10);
  });
});
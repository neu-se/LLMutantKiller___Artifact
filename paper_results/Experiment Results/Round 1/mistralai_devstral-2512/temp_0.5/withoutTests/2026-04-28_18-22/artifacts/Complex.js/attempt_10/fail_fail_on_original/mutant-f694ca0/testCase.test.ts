// Test case to detect mutation in cosm1 function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosm1 mutation test', () => {
  it('should correctly compute expm1 for small imaginary values', () => {
    // Create a purely imaginary number with value that triggers Taylor series
    const c = new Complex(0, 0.001);
    const result = c.expm1();
    // For z = 0 + 0.001i:
    // expm1(z) = 0 + i*sin(0.001)
    // The real part should be cosm1(0.001) ≈ -5e-7
    // The mutation changes 1/40320 to 1*40320, making cosm1(0.001) ≈ 0.000002
    // So we test for the exact expected value
    expect(result.re).toBeCloseTo(-4.999998333333583e-7, 15);
  });
});
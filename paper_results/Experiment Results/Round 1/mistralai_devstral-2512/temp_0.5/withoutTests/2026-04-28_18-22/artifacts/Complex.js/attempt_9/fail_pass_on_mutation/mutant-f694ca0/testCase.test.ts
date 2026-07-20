// Test case to detect mutation in cosm1 function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosm1 mutation test', () => {
  it('should correctly compute expm1 for small imaginary values', () => {
    // Create a purely imaginary number with value that triggers Taylor series
    const c = new Complex(0, 0.01);
    const result = c.expm1();
    // For z = 0 + 0.01i:
    // expm1(z) = 0 + i*sin(0.01)
    // The real part should be exactly 0 since expm1(0)*cos(0.01) + cosm1(0.01)
    // and expm1(0) = 0, cosm1(0.01) ≈ -0.00004999998
    // The mutation changes 1/40320 to 1*40320, making cosm1(0.01) positive and large
    // So the real part will be positive in mutated version
    expect(result.re).toBeLessThan(0);
  });
});
// Test case to detect mutation in cosm1 function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosm1 mutation test', () => {
  it('should correctly compute cos(x) - 1 for small x values in expm1', () => {
    // Create a purely imaginary number to isolate the cosm1 function
    const c = new Complex(0, 0.001);
    const result = c.expm1();
    // For purely imaginary input z = 0 + 0.001i:
    // expm1(z) = 0 + i*sin(0.001) ≈ 0 + 0.001i
    // The real part should be exactly 0 since expm1(0)*cos(0.001) + cosm1(0.001)
    // and expm1(0) = 0, cosm1(0.001) ≈ -5e-7
    // The mutation changes 1/40320 to 1*40320, making cosm1(0.001) much larger
    expect(result.re).toBeCloseTo(-5e-7, 1);
  });
});
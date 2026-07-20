// Test case to detect mutation in cosm1 function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosm1 mutation test', () => {
  it('should correctly compute expm1 for purely imaginary numbers', () => {
    // Create a purely imaginary number to isolate the cosm1 function
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    // For purely imaginary input, expm1 should be: 0 + i*sin(0.1)
    // The mutation affects cosm1 which is used in the imaginary part calculation
    // Original: sin(0.1) ≈ 0.0998334166
    // Mutated: Will be significantly different due to the 1*40320 term
    expect(result.im).toBeCloseTo(0.0998334166, 6);
  });
});
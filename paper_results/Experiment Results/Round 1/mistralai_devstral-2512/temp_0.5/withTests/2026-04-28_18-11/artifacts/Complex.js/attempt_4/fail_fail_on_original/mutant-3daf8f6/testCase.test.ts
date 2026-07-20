// Test case to detect the mutation in logHypot function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js logHypot mutation test', () => {
  it('should handle the boundary condition at exactly 3000 correctly', () => {
    // Test with values that will trigger the boundary condition
    const c1 = new Complex(3000, 1);
    const result1 = c1.log();
    const expected1 = 0.5 * Math.log(3000*3000 + 1*1);

    // Test with values just above 3000 to ensure different code path
    const c2 = new Complex(3001, 1);
    const result2 = c2.log();
    const expected2 = 0.5 * Math.log(3001*3001 + 1*1);

    // The mutation changes < to <=, so these should produce different results
    expect(Math.abs(result1.re - expected1)).toBeLessThan(1e-10);
    expect(Math.abs(result2.re - expected2)).toBeLessThan(1e-10);
    // The key difference: original takes different path for 3000 vs 3001
    expect(result1.re).not.toBeCloseTo(result2.re);
  });
});
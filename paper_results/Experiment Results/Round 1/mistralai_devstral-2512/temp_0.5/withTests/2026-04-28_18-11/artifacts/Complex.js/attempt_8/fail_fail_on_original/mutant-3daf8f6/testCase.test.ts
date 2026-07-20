// Test case to detect the mutation in logHypot function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js logHypot mutation test', () => {
  it('should correctly compute logHypot for values at exactly 3000', () => {
    // Test with values exactly at the boundary (3000, 1)
    const c = new Complex(3000, 1);
    const result = c.log();

    // Calculate expected result using the fallback path (Math.log(a*a + b*b)*0.5)
    const expectedFallback = 0.5 * Math.log(3000*3000 + 1*1);

    // Calculate what the optimized path would produce
    const a = 3000 / 2;
    const b = 1 / 2;
    const expectedOptimized = 0.5 * Math.log(a*a + b*b) + Math.LN2;

    // The original code uses fallback path for (3000,1) since 3000 is not < 3000
    // The mutated code uses optimized path since 3000 <= 3000
    // So original should match fallback, mutated should match optimized
    // We test that the result matches the fallback path (original behavior)
    expect(Math.abs(result.re - expectedFallback)).toBeLessThan(1e-10);
    // And that it's different from the optimized path
    expect(Math.abs(result.re - expectedOptimized)).toBeGreaterThan(1e-10);
  });
});
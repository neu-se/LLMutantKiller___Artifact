// Test case to detect the mutation in logHypot function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js logHypot mutation test', () => {
  it('should use the optimized path for values exactly at 3000', () => {
    // Test with values exactly at the boundary (3000, 3000)
    const c = new Complex(3000, 3000);
    const result = c.log();

    // The original code uses the optimized path for values < 3000
    // The mutated code uses it for values <= 3000
    // This means the original will use the fallback path for (3000,3000)
    // while the mutated version will use the optimized path

    // Calculate what the optimized path would produce
    const optimizedPathResult = 0.5 * Math.log(3000*3000 + 3000*3000);

    // The original code should NOT use the optimized path for (3000,3000)
    // so the result should be different from the optimized path
    expect(Math.abs(result.re - optimizedPathResult)).toBeGreaterThan(1e-10);
  });
});
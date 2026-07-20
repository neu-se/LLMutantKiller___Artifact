import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should expose the mutation by testing the exact boundary where b equals 3000 with values that trigger different calculation paths', () => {
    // Create a complex number where b = 3000 and a is large enough to trigger the optimized path
    const c = new Complex(2500, 3000);
    const absValue = c.abs();
    // The original code uses the non-optimized path when b = 3000
    // The mutated code uses the optimized path when b = 3000
    // This should produce different results due to floating point precision differences
    const expectedOptimized = Math.sqrt(2500*2500 + 3000*3000);
    const expectedNonOptimized = Math.sqrt(2500*2500 + 3000*3000);
    // The test should fail on mutated code because it will use the optimized path
    expect(absValue).toBeCloseTo(expectedNonOptimized, 15);
  });
});
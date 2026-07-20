import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should detect the mutation by testing the exact boundary where b equals 3000 with specific values', () => {
    // Test with values that will produce different results based on which branch is taken
    const c = new Complex(1000, 3000);
    const absValue = c.abs();
    // The original code uses the non-optimized path when b = 3000
    // The mutated code uses the optimized path when b = 3000
    // This should produce different floating point results
    const expected = Math.sqrt(1000*1000 + 3000*3000);
    // Use a precision that should pass on original but fail on mutated
    expect(absValue).toBeCloseTo(expected, 12);
  });
});
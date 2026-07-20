import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should detect mutation in hypot function with exact boundary value', () => {
    // Test with b exactly equal to 3000 where the mutation changes the condition
    const c = new Complex(1, 3000);
    const absValue = c.abs();
    // The original code uses the second branch (b < 3000 is false)
    // The mutated code uses the first branch (b <= 3000 is true)
    // This creates a different calculation path that should produce different results
    const expected = Math.sqrt(1*1 + 3000*3000);
    expect(absValue).toBe(expected);
  });
});
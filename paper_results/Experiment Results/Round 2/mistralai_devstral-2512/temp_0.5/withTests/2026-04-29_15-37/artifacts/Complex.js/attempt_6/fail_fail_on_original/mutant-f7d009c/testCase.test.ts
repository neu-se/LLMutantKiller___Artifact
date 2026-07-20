import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should detect mutation in hypot function with boundary value', () => {
    // Test with values that will trigger different calculation paths
    const c = new Complex(1, 3000);
    const absValue = c.abs();
    // The original code uses the second branch (b < 3000 is false)
    // The mutated code uses the first branch (b <= 3000 is true)
    // Use toBeCloseTo with high precision to detect calculation differences
    expect(absValue).toBeCloseTo(3000.000166666662, 14);
  });
});
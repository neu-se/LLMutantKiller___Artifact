import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should correctly handle edge case where b equals 3000', () => {
    const c = new Complex(3000, 3000);
    const absValue = c.abs();
    // The original code uses the second branch (a >= 3000 || b >= 3000)
    // The mutated code uses the first branch (a < 3000 && b <= 3000)
    // This creates a precision difference in the calculation
    expect(absValue).toBeCloseTo(4242.640687119285, 10);
  });
});
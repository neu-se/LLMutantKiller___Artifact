import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should detect mutation in hypot function with boundary value', () => {
    // Test with values that will trigger different calculation paths
    const c = new Complex(1, 3000);
    const absValue = c.abs();
    // The original code uses the second branch (b < 3000 is false)
    // The mutated code uses the first branch (b <= 3000 is true)
    // The second branch uses: a * Math.sqrt(1 + b * b) where b = 1/3000
    const expectedSecondBranch = 3000 * Math.sqrt(1 + Math.pow(1/3000, 2));
    // The first branch uses: Math.sqrt(a * a + b * b)
    const expectedFirstBranch = Math.sqrt(1 + 3000*3000);
    // Original should match second branch, mutated should match first branch
    // Use a precision that will fail when the calculation path changes
    expect(absValue).toBeCloseTo(expectedSecondBranch, 13);
  });
});
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should detect mutation in hypot function when b equals 3000', () => {
    // Create a complex number where b = 3000 exactly
    const c = new Complex(2999, 3000);
    const absValue = c.abs();
    // The original code will use the second branch (a < 3000 && b < 3000 is false)
    // The mutated code will use the first branch (a < 3000 && b <= 3000 is true)
    // This should produce different results due to different calculation paths
    expect(absValue).toBeCloseTo(Math.sqrt(2999*2999 + 3000*3000), 12);
  });
});
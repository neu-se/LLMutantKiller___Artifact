import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should detect the mutation by testing the boundary condition where b equals 3000', () => {
    const c = new Complex(1, 3000);
    const absValue = c.abs();
    // The original code uses the optimized path when b < 3000
    // The mutated code uses it when b <= 3000
    // This creates a subtle difference in floating point precision
    const expected = Math.sqrt(1*1 + 3000*3000);
    expect(absValue).toBeCloseTo(expected, 12);
  });
});
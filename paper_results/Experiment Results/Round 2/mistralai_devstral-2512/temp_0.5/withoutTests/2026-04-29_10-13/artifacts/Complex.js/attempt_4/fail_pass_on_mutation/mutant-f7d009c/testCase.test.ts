import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should use the optimized path when both values are exactly 3000', () => {
    const c = new Complex(3000, 3000);
    const absValue = c.abs();
    // The mutation changes the condition from b < 3000 to b <= 3000
    // This test verifies the behavior at the boundary where b = 3000
    const expected = Math.sqrt(3000*3000 + 3000*3000);
    expect(absValue).toBeCloseTo(expected, 10);
  });
});
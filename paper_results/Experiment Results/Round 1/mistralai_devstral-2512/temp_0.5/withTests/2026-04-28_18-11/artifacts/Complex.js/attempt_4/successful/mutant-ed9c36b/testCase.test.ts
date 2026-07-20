// Test case to detect the mutation in the sec() method
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.sec()', () => {
  it('should correctly compute sec(0 + 2i)', () => {
    const c = new Complex(0, 2);
    const result = c.sec();
    // Expected result for sec(0 + 2i) = 1/cosh(2)
    // cosh(2) = (e^2 + 1/e^2)/2 ≈ 3.7621956910836314
    // So sec(0 + 2i) ≈ 0.26580222883407967
    expect(result.re).toBeCloseTo(0.26580222883407967, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});
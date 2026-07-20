// Test case to detect the mutation in the sec() method
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.sec()', () => {
  it('should correctly compute sec(0 + 1i)', () => {
    const c = new Complex(0, 1);
    const result = c.sec();
    // Expected result for sec(0 + 1i) = 1/cosh(1)
    // cosh(1) = (e + 1/e)/2 ≈ 1.5430806348152437
    // So sec(0 + 1i) ≈ 0.6480542736638854
    expect(result.re).toBeCloseTo(0.6480542736638854, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});
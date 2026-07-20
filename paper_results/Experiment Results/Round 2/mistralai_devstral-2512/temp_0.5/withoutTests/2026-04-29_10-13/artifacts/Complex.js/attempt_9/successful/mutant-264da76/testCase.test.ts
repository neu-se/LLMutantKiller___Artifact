import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth", () => {
  it("should produce different results between original and mutated implementation", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    // The mutation changes -b/d to -b*d in the acoth calculation
    // This test verifies the specific relationship that would break with the mutation
    // In the original code: d = a*a + b*b, and we pass -b/d to atanh
    // In the mutated code: we pass -b*d to atanh (which is -b*(a*a+b*b))
    // This creates a massive difference in the input to atanh
    const d = 2*2 + 3*3; // 13
    const originalInput = -3/d; // -0.230769...
    const mutatedInput = -3*d; // -39
    // The original implementation should produce a result where the imaginary part
    // is consistent with the original calculation
    expect(Math.abs(result.im)).toBeGreaterThan(0.1);
    expect(Math.abs(result.im)).toBeLessThan(1.0);
  });
});
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function mutation test", () => {
  it("should use the approximation for very small values", () => {
    const x = 0.1e-9; // Very small value that should trigger the approximation
    const c = new Complex(x, 0);
    const result = c.cosh();
    // Original code returns 1 - x for |x| < 1e-9
    // Mutated code returns (Math.exp(x) + Math.exp(-x)) * 0.5 for |x| < 1e-9
    // We test that the original approximation is used
    expect(result.re).toBeCloseTo(1 - x, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});
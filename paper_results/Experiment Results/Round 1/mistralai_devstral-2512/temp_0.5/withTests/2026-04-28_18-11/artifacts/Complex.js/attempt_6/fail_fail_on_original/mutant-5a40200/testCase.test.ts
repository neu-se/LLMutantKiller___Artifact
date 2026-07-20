import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function mutation test", () => {
  it("should correctly handle the boundary case near 1e-9", () => {
    // Test with a value just below 1e-9 to trigger the approximation branch
    const x = 0.99e-9;
    const c = new Complex(x, 0);
    const result = c.cosh();

    // Original code: returns 1 - x when |x| < 1e-9
    // Mutated code: returns (Math.exp(x) + Math.exp(-x)) * 0.5 when |x| < 1e-9
    // The original approximation (1 - x) is less accurate than the exact formula
    // We verify the original behavior by checking the result is exactly 1 - x
    expect(result.re).toBeCloseTo(1 - x, 15);
    expect(result.im).toBe(0);
  });
});
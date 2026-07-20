// Test case to detect the mutation in the cosh function
import { Complex } from "./complex.js";

describe("Complex.js cosh function mutation test", () => {
  it("should correctly compute cosh for small values", () => {
    // The mutation changes the condition from < to >= for small x values
    // This test uses a value just below 1e-9 to trigger the different branches
    const x = 0.5e-9;
    const c = new Complex(x, 0);
    const result = c.cosh();
    // For small x, cosh(x) ≈ 1 + x²/2
    // The original code returns 1 - x for |x| < 1e-9 (incorrect)
    // The mutated code returns (Math.exp(x) + Math.exp(-x)) * 0.5 for |x| < 1e-9 (correct)
    // We expect the mutated version to be more accurate
    const expected = (Math.exp(x) + Math.exp(-x)) * 0.5;
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});
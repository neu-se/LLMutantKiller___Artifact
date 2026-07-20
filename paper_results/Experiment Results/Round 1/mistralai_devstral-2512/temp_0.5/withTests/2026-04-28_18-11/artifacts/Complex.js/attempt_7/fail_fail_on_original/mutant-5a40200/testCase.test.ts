import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function mutation test", () => {
  it("should use the approximation for values below 1e-9", () => {
    const x = 0.5e-9; // Value below 1e-9 threshold
    const c = new Complex(x, 0);
    const result = c.cosh();

    // Original code returns 1 - x for |x| < 1e-9
    // Mutated code returns (Math.exp(x) + Math.exp(-x)) * 0.5 for |x| < 1e-9
    // The original approximation is intentionally less precise
    const expectedApprox = 1 - x;
    const expectedExact = (Math.exp(x) + Math.exp(-x)) * 0.5;

    // The original code should return the approximation
    expect(result.re).toBeCloseTo(expectedApprox, 8);
    // The mutated code would return the exact value, which should be different
    expect(result.re).not.toBeCloseTo(expectedExact, 8);
    expect(result.im).toBe(0);
  });
});
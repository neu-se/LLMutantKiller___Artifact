import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use the Taylor series approximation for small values", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original implementation uses 1 - x for small x (Taylor series)
    // The mutated implementation always uses the full formula
    // For very small x, the difference should be detectable
    expect(result.re).toBeLessThan(1);
    expect(result.re).toBeGreaterThan(0.999999999);
  });
});
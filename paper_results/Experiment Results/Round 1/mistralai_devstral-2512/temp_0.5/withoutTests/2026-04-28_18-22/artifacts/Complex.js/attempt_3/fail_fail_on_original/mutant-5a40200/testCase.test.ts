import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for values near the threshold", () => {
    const z = new Complex(1e-9, 0);
    const result = z.cosh();
    // For x = 1e-9, the original uses the approximation (1 - x)
    // while the mutant uses the full formula (Math.exp(x) + Math.exp(-x)) * 0.5
    // These should produce different results
    expect(result.re).toBeCloseTo(1 - 1e-9, 10);
  });
});
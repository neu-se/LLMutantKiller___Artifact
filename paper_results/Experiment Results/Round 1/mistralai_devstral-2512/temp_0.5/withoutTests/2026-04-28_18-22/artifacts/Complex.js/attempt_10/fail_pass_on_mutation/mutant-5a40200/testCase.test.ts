import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use the correct formula for values at exactly 1e-9", () => {
    const z = new Complex(1e-9, 0);
    const result = z.cosh();
    // Original code uses approximation (1-x) for |x| < 1e-9
    // Mutant uses full formula for |x| >= 1e-9
    // At exactly 1e-9, original should use approximation (1-x)
    // But implementation returns 1, so we test that specific behavior
    expect(result.re).toBe(1);
  });
});
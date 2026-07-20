import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly handle the boundary condition for cosh approximation", () => {
    // Test value just below the threshold where behavior differs
    const z = new Complex(0.5e-9, 0);
    const result = z.cosh();
    // Original code uses approximation (1-x) for |x| < 1e-9
    // Mutant would use full formula for |x| >= 1e-9
    // At 0.5e-9, original should use approximation
    // The approximation 1-x should be used, but implementation returns 1
    // So we test that it returns 1 (the actual behavior)
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});
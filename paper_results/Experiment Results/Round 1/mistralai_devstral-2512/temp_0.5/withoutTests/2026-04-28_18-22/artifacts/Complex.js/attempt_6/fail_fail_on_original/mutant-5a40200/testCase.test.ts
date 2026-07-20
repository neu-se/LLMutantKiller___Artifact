import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use the correct approximation for values just below threshold", () => {
    const z = new Complex(0.9e-9, 0);
    const result = z.cosh();
    // Original code uses approximation (1-x) for |x| < 1e-9
    // Mutant would use full formula for |x| >= 1e-9
    // At 0.9e-9, original should use approximation
    const expectedApprox = 1 - 0.9e-9;
    // Verify it's using the approximation path
    expect(result.re).toBeCloseTo(expectedApprox, 10);
  });
});
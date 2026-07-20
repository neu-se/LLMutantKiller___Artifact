import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use approximation for values slightly below threshold", () => {
    const z = new Complex(0.999999999e-9, 0);
    const result = z.cosh();
    // Original uses approximation (1-x) for |x| < 1e-9
    // Mutant would use full formula for |x| >= 1e-9
    // At 0.999999999e-9, original should use approximation
    const expectedApprox = 1 - 0.999999999e-9;
    // Verify it's using the approximation path
    expect(result.re).toBeCloseTo(expectedApprox, 12);
  });
});
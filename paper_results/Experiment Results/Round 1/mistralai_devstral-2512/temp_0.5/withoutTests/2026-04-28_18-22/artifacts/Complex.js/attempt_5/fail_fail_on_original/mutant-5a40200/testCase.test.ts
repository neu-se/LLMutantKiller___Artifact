import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly handle the boundary case at 1e-9", () => {
    const z = new Complex(1e-9, 0);
    const result = z.cosh();
    // Original code uses approximation (1-x) for |x| < 1e-9
    // Mutant uses full formula for |x| >= 1e-9
    // At exactly 1e-9, they should behave differently
    const expectedOriginal = 1 - 1e-9;
    const expectedMutant = (Math.exp(1e-9) + Math.exp(-1e-9)) * 0.5;
    // Test that result matches original behavior
    expect(result.re).toBeCloseTo(expectedOriginal, 15);
    // This should fail on mutant since it would use the full formula
    expect(result.re).not.toBeCloseTo(expectedMutant, 15);
  });
});
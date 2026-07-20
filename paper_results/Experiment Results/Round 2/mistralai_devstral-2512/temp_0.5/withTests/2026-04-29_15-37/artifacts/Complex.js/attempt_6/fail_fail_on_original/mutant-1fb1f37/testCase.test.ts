import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use the optimized Taylor series for small values", () => {
    // Create a complex number with a very small real part
    const z = new Complex(1e-10, 0);
    const result = z.cosh();

    // The original implementation should use the Taylor approximation (1 - x) for small x
    // The mutated implementation always uses the full formula (Math.exp(x) + Math.exp(-x)) * 0.5
    // For x = 1e-10, the difference between these approaches should be detectable

    // Calculate what the full formula would give us
    const fullFormulaResult = (Math.exp(1e-10) + Math.exp(-1e-10)) * 0.5;

    // The original implementation should NOT equal the full formula result
    // because it uses the Taylor approximation for small values
    expect(result.re).not.toBe(fullFormulaResult);
    expect(result.re).toBeLessThan(fullFormulaResult);
  });
});
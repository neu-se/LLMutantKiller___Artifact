import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should expose the mutation in cosh implementation", () => {
    // Create a complex number with a very small real part
    const z = new Complex(1e-10, 0);
    const result = z.cosh();

    // The original code should use the Taylor approximation (1 - x) for small x
    // The mutated code always uses the full formula
    // We'll test that the implementation actually uses the conditional branch
    // by checking if the result differs from what the full formula would produce

    // Calculate what the full formula would produce
    const fullFormulaResult = (Math.exp(1e-10) + Math.exp(-1e-10)) * 0.5;

    // In the original code, for x = 1e-10, it should use 1 - x
    // In the mutated code, it will use the full formula
    // The difference should be detectable
    expect(result.re).toBeCloseTo(1 - 1e-10, 10);
  });
});
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use the correct branch for small values in cosh calculation", () => {
    // Test a value that should trigger the Taylor approximation branch (|x| < 1e-9)
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original code should use 1 - x for small x
    // The mutated code always uses the full formula
    // We test that the result is NOT equal to what the full formula would produce
    const fullFormulaResult = (Math.exp(1e-10) + Math.exp(-1e-10)) * 0.5;
    expect(result.re).not.toBeCloseTo(fullFormulaResult, 15);
    expect(result.re).toBeCloseTo(1 - 1e-10, 15);
  });
});
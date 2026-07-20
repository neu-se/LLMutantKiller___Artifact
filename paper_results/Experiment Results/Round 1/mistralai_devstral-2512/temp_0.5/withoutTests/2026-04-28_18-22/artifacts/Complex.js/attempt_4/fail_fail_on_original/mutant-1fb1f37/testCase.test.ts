import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use the Taylor series approximation for small values", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original code uses 1 - x for small x, while the mutated code always uses the full formula
    // For x = 1e-10, 1 - x should be used in original code
    expect(result.re).toBeCloseTo(1 - 1e-10, 15);
  });
});
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for very small x values", () => {
    const c = new Complex(1e-10, 0);
    const result = c.expm1();
    // For very small x, cosm1(x) should approximate -x^2/2
    // Original: cosm1(1e-10) ≈ -5e-21
    // Mutated: would produce a very large value due to multiplication instead of division
    expect(result.re).toBeCloseTo(-5e-21, 30);
  });
});
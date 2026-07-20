import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const c = new Complex(0.01, 0);
    const result = c.expm1();
    // The mutation changes division to multiplication in cosm1
    // Original: cos(0.01) - 1 ≈ -0.00004999998333334167
    // Mutated: would produce a very different value
    expect(result.re).toBeCloseTo(-0.00004999998333334167, 15);
  });
});
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.0001", () => {
    const c = new Complex(0.0001, 0);
    const result = c.expm1();
    // The mutation changes division to multiplication in cosm1
    // Original: cos(0.0001) - 1 ≈ -4.999999999999833e-9
    // Mutated: would produce a very different value
    expect(result.re).toBeCloseTo(-4.999999999999833e-9, 25);
  });
});
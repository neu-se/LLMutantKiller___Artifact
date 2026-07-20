import { Complex } from "./complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const c = new Complex(0.1, 0);
    const result = c.expm1();
    // The mutation changes the division to multiplication in the cosm1 function
    // which is used in expm1. For small x, this should produce a significantly different result.
    // Original: cos(0.1) - 1 ≈ -0.004997916927067836
    // Mutated: would produce a very large value due to multiplication instead of division
    expect(result.re).toBeCloseTo(-0.004997916927067836, 10);
  });
});
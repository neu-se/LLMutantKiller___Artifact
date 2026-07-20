import { Complex } from "./complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Create a complex number with a small real part to trigger the Taylor series calculation
    const c = new Complex(0.1, 0);
    // The expm1 function internally uses cosm1, which contains the mutation
    const result = c.expm1();
    // Expected result calculated using the correct formula
    const expectedReal = Math.expm1(0.1) * Math.cos(0) + (Math.cos(0.1) - 1);
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});
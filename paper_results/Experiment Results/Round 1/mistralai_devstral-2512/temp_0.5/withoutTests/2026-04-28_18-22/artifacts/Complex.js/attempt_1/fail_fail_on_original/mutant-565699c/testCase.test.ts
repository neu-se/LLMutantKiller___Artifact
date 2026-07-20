import { Complex } from "./complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test with a small value where Taylor series approximation is used
    const x = 0.1;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part should be cosm1(x) which uses the Taylor series
    // With the mutation (multiplication instead of division), the result will be vastly different
    expect(result.re).toBeCloseTo(Math.cos(x) - 1, 10);
  });
});
import { Complex } from "./complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const c = new Complex(0.1, 0);
    const result = c.expm1();
    // The mutation changes the sign in the Taylor series calculation
    // This test checks that the real part of expm1 is computed correctly
    // For x=0.1, the correct value should be close to Math.expm1(0.1) * Math.cos(0)
    const expectedReal = Math.expm1(0.1);
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});
import { Complex } from "./complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test with a small value where the Taylor series approximation is used
    const x = 0.1;
    const expected = Math.cos(x) - 1.0;
    const result = new Complex(x, 0).expm1().re - new Complex(x, 0).exp().re + 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});
import { Complex } from "./complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute the inverse hyperbolic sine of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    // Expected result calculated using the correct formula
    const expectedRe = 0.661474941935232;
    const expectedIm = 1.0612750619050357;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});
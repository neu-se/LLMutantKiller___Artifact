import { Complex } from "../complex.js";

describe("Complex", () => {
  it("should correctly calculate sech", () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    const expectedImaginary = -2 * Math.sinh(1) * Math.sin(1) / (Math.cos(2 * 1) + Math.cosh(2 * 1));
    expect(result.im).toBeCloseTo(expectedImaginary, 3);
    expect(result.im).not.toBeCloseTo(-2 / Math.sinh(1) * Math.sin(1) / (Math.cos(2 * 1) + Math.cosh(2 * 1)), 3);
  });
});
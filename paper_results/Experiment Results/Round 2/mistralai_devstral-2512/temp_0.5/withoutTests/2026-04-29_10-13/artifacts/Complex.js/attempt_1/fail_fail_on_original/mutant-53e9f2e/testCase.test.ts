import { Complex } from "./complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    const expectedRe = 0.5 * Math.log((1 + 0.5) / (1 - 0.5)) / 2;
    const expectedIm = Math.atan2(0.5, 1 - 0.5 * 0.5) / 2;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});
import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should calculate log correctly for positive real numbers", () => {
    const complex = new Complex(2, 0);
    const result = complex.log();
    const originalResult = new Complex(Math.log(2), 0);
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});
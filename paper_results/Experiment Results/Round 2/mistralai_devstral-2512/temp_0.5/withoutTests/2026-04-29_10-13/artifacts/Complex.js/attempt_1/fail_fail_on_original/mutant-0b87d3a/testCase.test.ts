import { Complex } from "./complex.js";

describe("Complex.acsc", () => {
  it("should correctly handle non-zero complex numbers", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.1469, 4);
    expect(result.im).toBeCloseTo(-0.2203, 4);
  });
});
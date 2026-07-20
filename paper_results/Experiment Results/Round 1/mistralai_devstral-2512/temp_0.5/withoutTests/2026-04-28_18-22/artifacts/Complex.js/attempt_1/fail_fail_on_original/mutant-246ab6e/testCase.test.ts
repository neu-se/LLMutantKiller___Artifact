import { Complex } from "./complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for a specific value", () => {
    const z = new Complex(1, 0);
    const result = z.cosh();
    expect(result.re).toBeCloseTo((Math.exp(1) + Math.exp(-1)) * 0.5, 10);
    expect(result.im).toBe(0);
  });
});